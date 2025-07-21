package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/config"
	"github.com/go-chi/chi/v5"
)

func serveApiConfig(r chi.Router, config *config.Config) {
	r.Get("/config", func(w http.ResponseWriter, r *http.Request) {
		respondJson(w, 200, config)
	})
}
