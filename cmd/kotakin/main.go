package main

import (
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/banyutekno/kotakin/internal/server"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	server.ServeApi(r)

	root := "./public"
	server.ServeFiles(r, root)

	http.ListenAndServe(":3000", r)
}
