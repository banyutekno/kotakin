package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/box"
	"github.com/go-chi/chi/v5"
)

func serveApiBox(r chi.Router, boxService *box.BoxService) {
	r.Get("/box", func(w http.ResponseWriter, r *http.Request) {
		boxes, err := boxService.List()
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, boxes)
	})
}
