package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/box"
	"github.com/banyutekno/kotakin/pkg/template"
	"github.com/go-chi/chi/v5"
)

func serveApiBox(r chi.Router, boxService *box.Service, templateService *template.Service) {
	r.Get("/box", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		boxes, err := boxService.List(ctx)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, boxes)
	})

	r.Post("/box", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()

		var cmd box.CreateCommand
		if err := parseBody(r, &cmd); err != nil {
			respondErr(w, err)
			return
		}

		template, err := templateService.Read(cmd.Template)
		if err != nil {
			respondErr(w, err)
			return
		}

		cmd.Env = template.PrepareEnv(cmd.Env)

		if _, err := boxService.Create(ctx, cmd); err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 201, nil)
	})

	r.Get("/box/{id}", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		id := chi.URLParam(r, "id")

		box, err := boxService.Read(ctx, id)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, box)
	})

	r.Patch("/box/{id}", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		id := chi.URLParam(r, "id")

		var cmd box.UpdateCommand
		if err := parseBody(r, &cmd); err != nil {
			respondErr(w, err)
			return
		}
		cmd.ID = id

		err := boxService.Update(ctx, cmd)
		if err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, nil)
	})

	r.Post("/box/{id}/start", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		id := chi.URLParam(r, "id")

		box, err := boxService.Read(ctx, id)
		if err != nil {
			respondErr(w, err)
			return
		}

		if err := box.Start(ctx); err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, nil)
	})

	r.Post("/box/{id}/stop", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		id := chi.URLParam(r, "id")

		box, err := boxService.Read(ctx, id)
		if err != nil {
			respondErr(w, err)
			return
		}

		if err := box.Stop(ctx); err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, nil)
	})

	r.Delete("/box/{id}", func(w http.ResponseWriter, r *http.Request) {
		ctx := r.Context()
		id := chi.URLParam(r, "id")

		if err := boxService.Delete(ctx, id); err != nil {
			respondErr(w, err)
			return
		}

		respondJson(w, 200, nil)
	})
}
