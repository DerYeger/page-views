package main

import (
	"errors"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	redis "github.com/go-redis/redis/v8"
)

var redisClient *redis.Client

func createRedisClient() {
  redisUrl := os.Getenv("REDIS_URL")
  if redisUrl == "" {
    panic("Missing REDIS_URL")
  }

  opts, err := redis.ParseURL(redisUrl)
  if err != nil {
    log.Panic(err)
  }
  redisClient = redis.NewClient(opts)
}

func StartServer(port int) {
  createRedisClient()

  router := gin.Default()

  router.Use(gin.Logger())
  router.Use(gin.Recovery())
  router.Use(cors.Default())

  router.GET("/api/views/*page", handleGetViews)
  router.POST("/api/views/*page", handlePostView)

  router.GET("/api/health", func(ctx *gin.Context) {
    ctx.Status(http.StatusOK)
  })

  log.Printf("Listening on %d\n", port)
	router.Run(fmt.Sprintf(":%d", port))
}

func handleGetViews(ctx *gin.Context) {
  page, err := normalizePage(ctx.Param("page"))
  if err != nil {
    ctx.AbortWithStatus(http.StatusBadRequest)
    return
  }

  views, err := redisClient.Get(ctx, page).Result()
  if err == redis.Nil {
    ctx.String(http.StatusOK, "0")
    return
  } else if err != nil {
    panic(err)
  }

  ctx.String(http.StatusOK, views)
}

func handlePostView(ctx *gin.Context) {
  page, err := normalizePage(ctx.Param("page"))
  if err != nil {
    ctx.AbortWithStatus(http.StatusBadRequest)
    return
  }

  if strings.HasPrefix(page, "localhost") || strings.HasPrefix(page, "0.0.0.0") || strings.HasPrefix(page, "127.0.0.1") {
    ctx.AbortWithStatus(http.StatusCreated)
    return
  }

  err = redisClient.Incr(ctx, page).Err()
  if err != nil {
    panic(err)
  }

  ctx.Status(http.StatusCreated)
}

func normalizePage(page string) (string, error) {
  if page[0] == '/' {
    page = page[1:]
  }
  if page == "" {
    return "", errors.New("page may not be empty")
  }
  return page, nil
}

func main() {
  port, err := strconv.Atoi(os.Getenv("PORT"))
  if err != nil {
    log.Println("Invalid or missing port. Defaulting to 8080.")
    port = 8080
  }
  StartServer(port)
}
