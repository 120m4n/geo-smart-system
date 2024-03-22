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
	Type        string   `json:"type"`
	Lat         string   `json:"lat"`
	Lng         string   `json:"lng"`
	TriggerType []string `json:"trigger"`
	Radius      string   `json:"radius"`
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