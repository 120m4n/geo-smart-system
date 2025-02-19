package system

import (
	"fmt"
	"os"
)

var (
	Tile38Address = getEnv("TILE38_ADDRESS", "127.0.0.1")
	Tile38Port    = getEnv("TILE38_PORT", "9851")
	ServerAddress = getEnv("SERVER_ADDRESS", "127.0.0.1")
	ServerPort    = getEnv("SERVER_PORT", "3002")
	NatsAddress   = getEnv("NATS_ADDRESS", "127.0.0.1")
)

func getEnv(key, defaultValue string) string {
	value, exists := os.LookupEnv(key)
	if !exists {
		value = defaultValue
	}
	return value
}

func GetTile38ConnectionAddress() string {
	return fmt.Sprintf("%s:%s", Tile38Address, Tile38Port)
}

func GetServerAddress() string {
	return fmt.Sprintf("%s:%s", ServerAddress, ServerPort)
}

func GetTile38HookURL(hookID string) string {
	return fmt.Sprintf("http://%s/detection/call?hook=%s", GetServerAddress(), hookID)
}

func GetNatsConnectionAddress() string {
	return fmt.Sprintf("nats://%s:%s", NatsAddress, "4222")
}
