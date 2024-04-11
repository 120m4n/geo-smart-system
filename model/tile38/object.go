package tile38

type Object struct {
	Id     string    `json:"id"`
	Object SubObject `json:"object"`
	Fields []string  `json:"fields"`
}

type FenceObject struct {
	Id     string `json:"id"`
	Object string `json:"object"`
}
