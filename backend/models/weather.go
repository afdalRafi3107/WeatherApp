package models

type MainData struct {
	Temp     float64 `json:"temp"`
	TempMin  float64 `json:"temp_min"`
	TempMax  float64 `json:"temp_max"`
	Humidity int     `json:"humidity"`
}

type WeatherInfo struct {
	Main        string `json:"main"`
	Description string `json:"description"`
	Icon        string `json:"icon"`
}

type WindData struct {
	Speed float64 `json:"speed"`
}

type WeatherResponse struct {
	Name    string        `json:"name"`
	Main    MainData      `json:"main"`
	Weather []WeatherInfo `json:"weather"`
	Wind    WindData      `json:"wind"`
}