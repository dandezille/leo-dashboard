package main

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func get_activities(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func post_activities(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func get_activities_new(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func get_activity_edit(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func patch_activity(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func put_activity(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func delete_activity(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func get_weather(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func get_weather_full(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func get_root(c *gin.Context) {
	c.String(http.StatusOK, "Hello")
}

func main() {
	r := gin.Default()

	r.GET("/activities", get_activities)
	r.POST("/activities", post_activities)
	r.GET("/activities/new", get_activities_new)
	r.GET("/activities/:id/edit", get_activity_edit)
	r.PATCH("/activities/:id", patch_activity)
	r.PUT("/activities/:id", put_activity)
	r.DELETE("/activities/:id", delete_activity)

	r.GET("/weather", get_weather)
	r.GET("/weather/full", get_weather_full)

	r.GET("/", get_root)

	r.Run()
}
