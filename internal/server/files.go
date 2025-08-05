package server

import (
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
)

func ServeFiles(r chi.Router, root string, repoDir string) {
	fs := http.FileServer(http.Dir(root))
	repoAssetsFs := http.StripPrefix("/repo-assets/", http.FileServer(http.Dir(repoDir)))

	r.Get("/repo-assets/*", func(w http.ResponseWriter, r *http.Request) {
		repoAssetsFs.ServeHTTP(w, r)
	})

	r.Get("/*", func(w http.ResponseWriter, r *http.Request) {
		if _, err := os.Stat(root + r.RequestURI); os.IsNotExist(err) {
			http.StripPrefix(r.RequestURI, fs).ServeHTTP(w, r)
		} else {
			fs.ServeHTTP(w, r)
		}
	})
}
