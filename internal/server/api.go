package server

import (
	"github.com/banyutekno/kotakin/pkg/box"
	"github.com/banyutekno/kotakin/pkg/config"
	"github.com/banyutekno/kotakin/pkg/repo"
	"github.com/banyutekno/kotakin/pkg/template"
	"github.com/go-chi/chi/v5"
)

func ServeApi(r chi.Router, config *config.Config) {
	repoService := repo.NewService(config)
	templateService := template.NewService(config)
	boxService := box.NewService(config)

	r.Route("/api", func(r chi.Router) {
		serveApiConfig(r, config)
		serveApiBox(r, boxService, templateService)
		serveApiRepo(r, repoService)
		serveApiTemplate(r, templateService)
	})
}
