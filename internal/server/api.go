package server

import (
	"log"
	"net/http"

	"github.com/banyutekno/kotakin/pkg/box"
	"github.com/banyutekno/kotakin/pkg/config"
	"github.com/banyutekno/kotakin/pkg/repo"
	"github.com/go-chi/chi/v5"
)

func ServeApi(r chi.Router, config *config.Config) {
	repoService := repo.NewRepoService(config)

	r.Route("/api", func(r chi.Router) {
		r.Get("/config", func(w http.ResponseWriter, r *http.Request) {
			respondJson(w, 200, config)
		})

		r.Get("/box", func(w http.ResponseWriter, r *http.Request) {
			boxes := box.GetBoxes()
			respondJson(w, 200, boxes)
		})

		r.Get("/repo", func(w http.ResponseWriter, r *http.Request) {
			repos, err := repoService.List()
			if err != nil {
				respondErr(w, err)
				return
			}

			respondJson(w, 200, repos)
		})

		r.Post("/repo", func(w http.ResponseWriter, r *http.Request) {
			// FIXME: repoService.Create()
		})

		r.Get("/repo/{id}", func(w http.ResponseWriter, r *http.Request) {
			id := chi.URLParam(r, "id")
			log.Println("id", id)

			repo, err := repoService.Read(id)
			if err != nil {
				respondErr(w, err)
				return
			}

			respondJson(w, 200, repo)
		})

		r.Patch("/repo/{id}", func(w http.ResponseWriter, r *http.Request) {
			// FIXME: repoService.Update()
		})

		r.Delete("/repo/{id}", func(w http.ResponseWriter, r *http.Request) {
			// FIXME: repoService.Delete()
		})
	})
}
