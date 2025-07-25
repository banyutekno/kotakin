package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/box"
	"github.com/banyutekno/kotakin/pkg/template"
	"github.com/go-chi/chi/v5"
)

func serveApiBox(r chi.Router, boxService *box.Service, templateService *template.Service) {
	r.Get("/box", func(w http.ResponseWriter, r *http.Request) {
		boxes, err := boxService.List()
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, boxes)
	})

	r.Post("/box", func(w http.ResponseWriter, r *http.Request) {
		var cmd box.CreateCommand
		if err := parseBody(r, &cmd); err != nil {
			respondErr(w, err)
			return
		}

		if _, err := templateService.Read(cmd.Template); err != nil {
			respondErr(w, err)
			return
		}

		if _, err := boxService.Create(cmd); err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 201, nil)
	})
}
