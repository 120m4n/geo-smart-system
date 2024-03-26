package main

import (
	"fmt"
	"io"
	"log"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/go-redis/redis"
	"github.com/nats-io/nats.go"
	"github.com/supanadit/geo-smart-system/model/tile38"
	"github.com/supanadit/geo-smart-system/server"
	"github.com/supanadit/geo-smart-system/system"
)

func main() {
	// Create Connection with Tile 38
	client := redis.NewClient(&redis.Options{
		Addr: system.GetTile38ConnectionAddress(),
	})
	// Create a new NATS client
	// Connect to NATS server
	url := "nats://localhost:4222"
	nc, err := nats.Connect(url)
	if err != nil {
		log.Fatalf("Error connecting to NATS: %v", err)
	}
	defer nc.Close()
	// Create Gin Engine
	r := gin.Default()
	r.Use(cors.Default())

	// Initialize new streaming server
	stream := server.NewServer()

	// We are streaming current tile38 keys to clients in the interval 10 seconds
	go func() {
		for {
			time.Sleep(time.Second * 1)
			data, err := tile38.FromScan(client, "avatar")
			if err != nil {
				log.Printf("Error getting data: %v", err)
				return
			}
			if len(data.Object) > 0 {
				dataStr, err := data.ToJsonString()
				if err != nil {
					log.Printf("Error converting data to JSON: %v", err)
					return
				}
				stream.Message <- dataStr
			}
		}
	}()

	// Add event-streaming headers
	r.GET("/sse", server.HeadersMiddleware(), stream.ServeHTTP(), func(c *gin.Context) {
		v, ok := c.Get("clientChan")
		if !ok {
			return
		}
		clientChan, ok := v.(server.ClientChan)
		if !ok {
			return
		}
		c.Stream(func(w io.Writer) bool {
			// Stream message to client from message channel
			if msg, ok := <-clientChan; ok {
				c.SSEvent("message", msg)
				return true
			}
			return false
		})
	})

	// Call Router
	system.Router(r, client, stream, nc)
	// Run Server
	_ = r.Run(fmt.Sprintf(":%s", system.ServerPort))

}
