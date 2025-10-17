package main

import (
	"cuacaApp/backend/controllers"
	"cuacaApp/backend/utils"
	"fmt"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/spf13/viper"
)

func main() {
	utils.InitViper()
	port := viper.GetString("PORT")


	r:= gin.Default()

	r.Use(cors.Default())

	r.GET("/weather", controllers.Weather)

	fmt.Println("Server is running on port: ", port)
	r.Run(":"+ port)

}
