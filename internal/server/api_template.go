package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/template"
	"github.com/go-chi/chi/v5"
)

func serveApiTemplate(r chi.Router, templateService *template.Service) {
	r.Get("/template", func(w http.ResponseWriter, r *http.Request) {
		templates, err := templateService.List()
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, templates)
	})

	r.Get("/template/{repo}/{name}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "repo") + "/" + chi.URLParam(r, "name")
		template, err := templateService.Read(id)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, template)
	})
}
