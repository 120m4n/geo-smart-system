// In newpackage/event.go
package server

import (
	"log"

	"github.com/gin-gonic/gin"
)

type Event struct {
	Message       chan string
	NewClients    chan chan string
	ClosedClients chan chan string
	TotalClients  map[chan string]bool
}

type ClientChan chan string

func HeadersMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Content-Type", "text/event-stream")
		c.Writer.Header().Set("Cache-Control", "no-cache")
		c.Writer.Header().Set("Connection", "keep-alive")
		c.Writer.Header().Set("Transfer-Encoding", "chunked")
		c.Next()
	}
}

func NewServer() (event *Event) {
	event = &Event{
		Message:       make(chan string),
		NewClients:    make(chan chan string),
		ClosedClients: make(chan chan string),
		TotalClients:  make(map[chan string]bool),
	}
	go event.listen()
	return
}

func (stream *Event) listen() {
	for {
		select {
		case client := <-stream.NewClients:
			stream.TotalClients[client] = true
			log.Printf("Client added. %d registered clients", len(stream.TotalClients))

		case client := <-stream.ClosedClients:
			delete(stream.TotalClients, client)
			close(client)
			log.Printf("Removed client. %d registered clients", len(stream.TotalClients))

		case eventMsg := <-stream.Message:
			failedClients := make([]chan string, 0)
			for clientMessageChan := range stream.TotalClients {
				select {	
				case clientMessageChan <- eventMsg:
				default:
					failedClients = append(failedClients, clientMessageChan)
				}
			}
			// Remove failed clients
			for _, failedClient := range failedClients {
				delete(stream.TotalClients, failedClient)
				close(failedClient)
				log.Printf("Removed client. %d registered clients", len(stream.TotalClients))
			}
		}
	}
}

func (stream *Event) ServeHTTP() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientChan := make(ClientChan)
		stream.NewClients <- clientChan
		defer func() {
			stream.ClosedClients <- clientChan
		}()
		c.Set("clientChan", clientChan)
		c.Next()
	}
}
