package controllers

import (
	"cuacaApp/backend/models"
	"encoding/json"
	"io/ioutil"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func Weather(c *gin.Context) {
	// c.JSON(http.StatusOK, gin.H{
	// 	"message":"aku laku",
	// })
	var weatherData models.WeatherResponse
	city := c.Query("city")

	if city == ""{
		c.JSON(http.StatusBadRequest, gin.H{"error":"City parameter is required"})
	}

	

	apiKey := viper.GetString("API_KEY")

	url := "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=metric"

	resp, err:= http.Get(url); 

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message":"Failed to Fecth weather data"})
		return
	}
	defer resp.Body.Close()



	body,err := ioutil.ReadAll(resp.Body)
	if err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"message":"failed to read response body"})
		return
	}


	if resp.StatusCode != http.StatusOK {
		c.JSON(resp.StatusCode, gin.H{"message":"City not Found"})
		return
	}

	if err:= json.Unmarshal(body, &weatherData); err != nil{
		c.JSON(http.StatusInternalServerError, gin.H{"message":"Failed to parse weather data"})
		return
	}

	c.JSON(http.StatusOK, weatherData)
}