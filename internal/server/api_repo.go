package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/repo"
	"github.com/go-chi/chi/v5"
)

type AddRepoBody struct {
	URL string
}

func serveApiRepo(r chi.Router, repoService *repo.RepoService) {
	r.Get("/repo", func(w http.ResponseWriter, r *http.Request) {
		repos, err := repoService.List()
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, repos)
	})

	r.Post("/repo", func(w http.ResponseWriter, r *http.Request) {
		var body AddRepoBody
		if err := parseBody(r, &body); err != nil {
			respondErr(w, err)
			return
		}

		_, err := repoService.Create(body.URL)
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
