package model

type CoordinatesRequest struct {
	Coordinates struct {
		Latitude  float64 `json:"latitude" binding:"required"`
		Longitude float64 `json:"longitude" binding:"required"`
	} `json:"coordinates" binding:"required"`
	UserID    string `json:"user_id" binding:"required"`
	UniqueID  string `json:"unique_id" binding:"required"`
	Fleet     string `json:"fleet" binding:"required"`
	FleetType string `json:"fleet_type"`
}

type CoordinatesResponse struct {
	Message string `json:"message"`
	Status  bool   `json:"status"`
}
