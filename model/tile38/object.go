package tile38

type Object struct {
	Id     string    `json:"id"`
	Object SubObject `json:"object"`
}

type FenceObject struct {
	Id     string    `json:"id"`
	Object string    `json:"object"`
}