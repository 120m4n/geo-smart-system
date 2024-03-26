package tile38

import (
	"encoding/json"
	"strconv"

	"github.com/go-redis/redis"
	"github.com/tidwall/gjson"
)

type Data struct {
	Command string   `json:"command"`
	Object  []Object `json:"data"`
}

type FenceData struct {
	Object []FenceObject `json:"data"`
}

func FromScan(client *redis.Client, name string) (Data, error) {
	var tile38Data Data
	var err error
	tile38Data.Command = name
	v, err := client.Do("SCAN", name).Result()
	if err == nil {
		data, err := json.Marshal(v)
		if err == nil {
			jsonConverted := `{"data":` + string(data) + `}`
			lengthData := gjson.Get(jsonConverted, "data.1.#")
			if lengthData.Int() != 0 {
				var x int64 = 0
				for x = 0; x < lengthData.Int(); x++ {
					name := "data.1." + strconv.FormatInt(int64(x), 10)
					idName := name + ".0"
					contentName := name + ".1"
					arrName := name + ".2"
					id := gjson.Get(jsonConverted, idName)
					content := gjson.Get(jsonConverted, contentName)
					arr := gjson.Get(jsonConverted, arrName)
					fields := make([]string, len(arr.Array()))
					for i, v := range arr.Array() {
						fields[i] = v.String()
					}

					var tile38Object Object
					var tile38SubObject SubObject
					err = json.Unmarshal([]byte(content.String()), &tile38SubObject)
					if err == nil {
						tile38Object.Id = id.String()
						tile38Object.Object = tile38SubObject
						tile38Object.Fields = fields
						tile38Data.Object = append(tile38Data.Object, tile38Object)
					}
				}
			}
		}
	}
	return tile38Data, err
}

func (tile38Data Data) ToJsonString() (string, error) {
	var err error
	data, err := json.Marshal(tile38Data)
	return string(data), err
}

func HooksFromScan(client *redis.Client, name string) (FenceData, error) {
	var tile38FenceData FenceData
	var err error
	v, err := client.Do("SCAN", name).Result()
	if err == nil {
		data, err := json.Marshal(v)
		if err == nil {
			jsonConverted := `{"data":` + string(data) + `}`
			lengthData := gjson.Get(jsonConverted, "data.1.#")
			if lengthData.Int() != 0 {
				var x int64 = 0
				for x = 0; x < lengthData.Int(); x++ {
					name := "data.1." + strconv.FormatInt(int64(x), 10)
					idName := name + ".0"
					contentName := name + ".1"
					id := gjson.Get(jsonConverted, idName)
					content := gjson.Get(jsonConverted, contentName)
					var tile38FenceObject FenceObject
					tile38FenceObject.Id = id.String()
					tile38FenceObject.Object = content.String()
					tile38FenceData.Object = append(tile38FenceData.Object, tile38FenceObject)
				}
			}
		}
	}
	return tile38FenceData, err
}
