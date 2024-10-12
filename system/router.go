package system

import (
	"encoding/json"
	"errors"
	"fmt"
	"log"
	"net/http"
	"strings"
	"time"

	// "github.com/gin-contrib/sse"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/gorilla/websocket"
	"github.com/nats-io/nats.go"
	"github.com/rs/xid"
	"github.com/supanadit/geo-smart-system/model"
	"github.com/supanadit/geo-smart-system/model/tile38"
	"github.com/supanadit/geo-smart-system/server"
)

func Router(r *gin.Engine, client *redis.Client, event *server.Event, nc *nats.Conn) {
	r.GET("/id/get/unique", func(c *gin.Context) {
		id := xid.New()
		c.JSON(200, gin.H{"id": id.String()})
	})

	r.POST("/point/set", func(c *gin.Context) {
		var location model.Location
		err := c.BindJSON(&location)
		client.Do("SET", location.Type, location.Id, "EX", 30, "POINT", location.Lat, location.Lng)
		var status map[string]interface{}
		var httpStatus int
		if err != nil {
			status = gin.H{"status": "Unknown Error"}
			httpStatus = http.StatusInternalServerError
		} else {
			status = gin.H{"status": "Ok"}
			httpStatus = http.StatusOK
		}
		c.Writer.Header().Set("Content-Type", "application/json")
		c.JSON(httpStatus, status)
	})

	r.POST("/coordinates", func(c *gin.Context) {
		var request model.CoordinatesRequest
		if err := c.ShouldBindJSON(&request); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error(), "status": false})
			return
		}

		doc := model.Document{
			UniqueId:     request.UniqueID,
			UserId:       request.UserID,
			Fleet:        request.Fleet,
			Location:     model.MongoLocation{Type: "Point", Coordinates: []float64{request.Coordinates.Longitude, request.Coordinates.Latitude}},
			OriginIp:     c.ClientIP(),
			LastModified: time.Now().Unix(),
		}

		docJson, err := json.Marshal(doc)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error(), "status": false})
			return
		}

		nc.Publish("coordinates", docJson)

		client.Do("SET", "avatar", request.UniqueID, "FIELD", "user_id", request.UserID, "FIELD", "fleet", request.Fleet, "EX", 30, "POINT", request.Coordinates.Latitude, request.Coordinates.Longitude)
		c.JSON(http.StatusOK, model.CoordinatesResponse{
			Message: "Coordinates Inserted",
			Status:  true,
		})
	})

	r.POST("/point/unset", func(c *gin.Context) {
		var location model.Location
		err := c.BindJSON(&location)
		client.Do("DEL", location.Type, location.Id)
		var status map[string]interface{}
		var httpStatus int
		if err != nil {
			status = gin.H{"status": "Unknown Error"}
			httpStatus = http.StatusInternalServerError
		} else {
			status = gin.H{"status": "Ok"}
			httpStatus = http.StatusOK
		}
		c.Writer.Header().Set("Content-Type", "application/json")
		c.JSON(httpStatus, status)
	})

	r.GET("/point/get", func(c *gin.Context) {
		t := c.DefaultQuery("type", "user")
		data, _ := tile38.FromScan(client, t)
		c.JSON(http.StatusOK, data)
	})

	r.GET("/geofences/get", func(c *gin.Context) {
		data, _ := tile38.HooksFromScan(client, "HOOKS")
		c.JSON(http.StatusOK, data)
	})

	r.POST("/detection/set", func(c *gin.Context) {
		var detection model.Detection
		if err := c.ShouldBindJSON(&detection); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		hookID := detection.DetectionId
		hookURL := GetTile38HookURL(hookID)
		trigger := strings.Join(detection.TriggerType, ",")
		var status map[string]interface{}
		var httpStatus int
		if trigger == "" {
			status = gin.H{"status": "Please include trigger type such as 'enter','cross','exit','inside' or 'outside'"}
			httpStatus = http.StatusBadRequest
		} else {
			circle := GenerarGeoJSONCirculo(detection.Longitude, detection.Latitude, detection.Radius)
			circleJSON, err := json.Marshal(circle)
			if err != nil {
				c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
				return
			}
			client.Do("DEL", "HOOKS", hookID)
			client.Do("SET", "HOOKS", hookID, "OBJECT", string(circleJSON))
			client.Do("DELHOOK", hookID)
			client.Do("SETHOOK", hookID, hookURL, "WITHIN", detection.Type, "FENCE", "DETECT", trigger, "GET", "HOOKS", hookID)

			status = gin.H{"status": "Ok", "hook": hookID}
			httpStatus = http.StatusOK
		}
		c.Writer.Header().Set("Content-Type", "application/json")
		c.JSON(httpStatus, status)
	})

	r.POST("/codeplus/set", func(c *gin.Context) {
		var codePlus model.CodePlusRequest
		if err := c.ShouldBindJSON(&codePlus); err != nil {
			respondWithError(c, http.StatusBadRequest, err)
			return
		}

		hookID := codePlus.CodePlus
		hookURL := GetTile38HookURL(hookID)
		trigger := strings.Join(codePlus.TriggerType, ",")

		if trigger == "" {
			respondWithError(c, http.StatusBadRequest, errors.New("please include trigger type such as 'enter','cross','exit','inside' or 'outside'"))
			return
		}

		// Convert the CodePlus code to a polygon-type GeoJSON
		polygon, err := CodePlusToPolygon(codePlus.CodePlus)
		if err != nil {
			respondWithError(c, http.StatusBadRequest, err)
			return
		}

		// Marshal the polygon to a JSON string
		polygonJSON, err := json.Marshal(polygon)
		if err != nil {
			respondWithError(c, http.StatusBadRequest, err)
			return
		}
		client.Do("DEL", "HOOKS", hookID)
		client.Do("SET", "HOOKS", hookID, "OBJECT", string(polygonJSON))
		client.Do("DELHOOK", hookID)
		client.Do("SETHOOK", hookID, hookURL, "WITHIN", codePlus.Type, "FENCE", "DETECT", trigger, "GET", "HOOKS", hookID)

		c.Writer.Header().Set("Content-Type", "application/json")
		c.JSON(http.StatusOK, gin.H{"status": "Ok", "hook": hookID})
	})

	r.POST("/geofence/set", func(c *gin.Context) {
		var geofence model.Geofence
		if err := c.ShouldBindJSON(&geofence); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		hookID := geofence.FenceId
		hookURL := GetTile38HookURL(hookID)
		trigger := strings.Join(geofence.TriggerType, ",")
		var status map[string]interface{}
		var httpStatus int
		if trigger == "" {
			status = gin.H{"status": "Please include trigger type such as 'enter','cross','exit','inside' or 'outside'"}
			httpStatus = http.StatusBadRequest
		} else {
			client.Do("DEL", "HOOKS", geofence.FenceId)
			client.Do("SET", "HOOKS", geofence.FenceId, "OBJECT", geofence.GeojsonStr)
			client.Do("DELHOOK", hookID)
			client.Do("SETHOOK", hookID, hookURL, "WITHIN", geofence.Type, "FENCE", "DETECT", trigger, "GET", "HOOKS", geofence.FenceId)
			// if err != nil {
			// 	status = gin.H{"status": "Unknown Error"}
			// 	httpStatus = http.StatusInternalServerError
			// } else {
			status = gin.H{"status": "Ok", "hook": hookID}
			httpStatus = http.StatusOK
			// }
		}
		c.Writer.Header().Set("Content-Type", "application/json")
		c.JSON(httpStatus, status)
	})

	// r.GET("/detection/call", func(c *gin.Context) {
	// 	hookID := c.Query("hook")
	// 	if hookID == "" {
	// 		c.JSON(http.StatusBadRequest, gin.H{"status": "Wrong Request"})
	// 	} else {
	// 		client.Do("DELHOOK", hookID)
	// 		c.JSON(http.StatusOK, gin.H{"status": "OK"})
	// 	}
	// })

	r.POST("/detection/call", func(c *gin.Context) {
		var request model.HookRequest
		hookID := c.Query("hook")
		if hookID == "" {
			c.JSON(http.StatusBadRequest, gin.H{"status": "Wrong Request"})
		} else {
			if err := c.ShouldBindJSON(&request); err != nil {
				c.JSON(http.StatusBadRequest, gin.H{
					"error": err.Error(),
				})
				return
			}

			requestJson, err := json.Marshal(request)
			if err != nil {
				log.Print("Failed to convert request to JSON")
				return
			}
			// log.Print(string(requestJson))
			// Broadcast requestJson to all clients
			event.Message <- string(requestJson)

			c.JSON(http.StatusOK, gin.H{"status": "OK"})
		}
	})

	r.GET("/ws", func(c *gin.Context) {
		websocketHandler(c.Writer, c.Request)
	})

	r.Static("/public", "./public")
	r.Static("/assets", "./assets")
}

var websocketUpgrade = websocket.Upgrader{
	ReadBufferSize:  1024,
	WriteBufferSize: 1024,
	CheckOrigin: func(r *http.Request) bool {
		return true
	},
}

func websocketHandler(w http.ResponseWriter, r *http.Request) {
	conn, err := websocketUpgrade.Upgrade(w, r, nil)
	if err != nil {
		log.Println(err)
		return
	}

	for {
		t, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		fmt.Printf("Received : %s \n", msg)
		_ = conn.WriteMessage(t, []byte("OK"))
	}
}

func respondWithError(c *gin.Context, httpStatus int, err error) {
	c.JSON(httpStatus, gin.H{"error": err.Error()})
	c.Abort() // Prevent any pending handlers from being called
}
