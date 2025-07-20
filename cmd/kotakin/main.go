package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"

	"github.com/banyutekno/kotakin/internal/server"
	"github.com/banyutekno/kotakin/pkg/config"
)

func main() {
	godotenv.Load()
	conf, err := config.FromEnv()
	if err != nil {
		handleError(err)
		return
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	server.ServeApi(r, conf)

	root := "./public"
	server.ServeFiles(r, root)

	log.Println("Server started at http://localhost:3000")
	http.ListenAndServe(":3000", r)
}

func handleError(err error) {
	fmt.Fprintln(os.Stderr, "Error:", err)
	os.Exit(1)
}
