package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/box"
	"github.com/go-chi/chi/v5"
)

func ServeApi(r *chi.Mux) {
	r.Route("/api", func(r chi.Router) {
		r.Get("/box", func(w http.ResponseWriter, r *http.Request) {
			boxes := box.GetBoxes()
			jsonResponse(w, boxes)
		})
	})
}
