package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/repo"
	"github.com/go-chi/chi/v5"
)

func serveApiRepo(r chi.Router, repoService *repo.Service) {
	r.Get("/repo", func(w http.ResponseWriter, r *http.Request) {
		repos, err := repoService.List()
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, repos)
	})

	r.Post("/repo", func(w http.ResponseWriter, r *http.Request) {
		var cmd repo.CreateCommand
		if err := parseBody(r, &cmd); err != nil {
			respondErr(w, err)
			return
		}

		_, err := repoService.Create(cmd)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 201, nil)
	})

	r.Get("/repo/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")

		repo, err := repoService.Read(id)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, repo)
	})

	r.Post("/repo/{id}/update", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")

		err := repoService.Update(id)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, nil)
	})

	r.Delete("/repo/{id}", func(w http.ResponseWriter, r *http.Request) {
		id := chi.URLParam(r, "id")

		err := repoService.Delete(id)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, nil)
	})
}
