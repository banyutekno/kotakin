package server

import (
	"github.com/banyutekno/kotakin/pkg/box"
	"github.com/banyutekno/kotakin/pkg/config"
	"github.com/banyutekno/kotakin/pkg/repo"
	"github.com/go-chi/chi/v5"
)

func ServeApi(r chi.Router, config *config.Config) {
	repoService := repo.NewRepoService(config)
	boxService := box.NewBoxService()

	r.Route("/api", func(r chi.Router) {
		serveApiConfig(r, config)
		serveApiBox(r, boxService)
		serveApiRepo(r, repoService)
	})
}
