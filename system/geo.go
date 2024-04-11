package system

import (
	"github.com/paulmach/orb"
	"github.com/paulmach/orb/geojson"
	"github.com/paulmach/orb/project"
	"github.com/google/open-location-code/go"
	"math"
)

// Función para generar un objeto GeoJSON de un círculo
func GenerarGeoJSONCirculo(lon, lat, radio float64) *geojson.Feature {
	// Convertir las coordenadas WGS84 a UTM
	centro := orb.Point{lon, lat}
	centroUTM := project.WGS84.ToMercator(centro)

	// Definir el paso angular en grados
	pasoGrados := float64(10)

	// Inicializar el arreglo de puntos que formarán el polígono del círculo
	puntos := make([]orb.Point, 0)

	// Recorrer los 360 grados para calcular los puntos del círculo
	for angulo := 0.0; angulo < 360; angulo += pasoGrados {
		// Calcular la latitud y longitud del punto actual en coordenadas UTM
		x := centroUTM[0] + radio*math.Cos(angulo*math.Pi/180)
		y := centroUTM[1] + radio*math.Sin(angulo*math.Pi/180)

		// Crear un nuevo punto y agregarlo al arreglo
		punto := project.Mercator.ToWGS84(orb.Point{x, y})
		puntos = append(puntos, punto)
	}

	// Cerrar el polígono conectando el último punto con el primer punto
	puntos = append(puntos, puntos[0])

	// Crear el objeto GeoJSON de tipo polígono
	ring := orb.Ring(puntos)
	polygon := orb.Polygon{ring}
	feature := geojson.NewFeature(polygon)
	feature.Properties = map[string]interface{}{
		"radio": radio,
	}

	return feature
}


	


func CodePlusToPolygon(codePlus string) (*geojson.Feature, error) {
	// Decode the Plus Code into a latitude/longitude bounding box
	area, err := olc.Decode(codePlus)
	if err != nil {
		return nil, err
	}

	// Convert the bounding box into a GeoJSON polygon
	polygon := orb.Polygon{
		{
			{area.LngLo, area.LatLo}, // Lower left corner
			{area.LngLo, area.LatHi}, // Upper left corner
			{area.LngHi, area.LatHi}, // Upper right corner
			{area.LngHi, area.LatLo}, // Lower right corner
			{area.LngLo, area.LatLo}, // Close the polygon
		},
	}

	// Create a GeoJSON feature for the polygon
	feature := geojson.NewFeature(polygon)

	return feature, nil
}