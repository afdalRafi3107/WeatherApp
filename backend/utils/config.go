package utils

import (
	"log"

	"github.com/spf13/viper"
)

func InitViper() {
	viper.SetConfigFile(".env")
	viper.SetConfigType("env")
	viper.AddConfigPath(".")

	err := viper.ReadInConfig()

	if err != nil{
		log.Println("Error cannot find .env file")
	}
}