package model

// Trigger Type
const (
	inside  string = "inside"  // when an object is inside the specified area
	outside string = "outside" // when an object is outside the specified area
	enter   string = "enter"   // when an object that was not previously in the fence has entered the area
	exit    string = "exit"    // when an object that was previously in the fence has exited the area
	cross   string = "cross"   // when an object that was not previously in the fence has entered and exited the area
)

type Detection struct {
	Type        string   `json:"type" binding:"required"`
	DetectionId string   `json:"detection_id" binding:"required"`
	Latitude    float64  `json:"latitude" binding:"required"`
	Longitude 	float64  `json:"longitude" binding:"required"`
	Radius      float64  `json:"radius" binding:"required"`
	TriggerType []string `json:"trigger" binding:"required"`
}


type Geofence struct {
	Type		string   `json:"type" binding:"required"`
	FenceId     string   `json:"fence_id" binding:"required"`
	TriggerType []string `json:"trigger" binding:"required"`
	GeojsonStr  string   `json:"geojson" binding:"required"`
}

type Object struct {
	Type        string    `json:"type"`
	Coordinates []float64 `json:"coordinates"`
}

type HookRequest struct {
	Command string  `json:"command"`
	Group   string  `json:"group"`
	Detect  string  `json:"detect"`
	Hook    string  `json:"hook"`
	Key     string  `json:"key"`
	Time    string  `json:"time"`
	ID      string  `json:"id"`
	Object  Object  `json:"object"`
}