package main

import (
	"fmt"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"

	"github.com/banyutekno/kotakin/internal/server"
	"github.com/banyutekno/kotakin/pkg/config"
)

func main() {
	dataDir := resolveDataDir()
	conf, err := config.WithDataDir(dataDir)
	if err != nil {
		handleError(err)
		return
	}

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	server.ServeApi(r, conf)

	root := "./public"
	server.ServeFiles(r, root, conf.RepoDir(""))

	log.Println("Server started at http://localhost:3000")
	http.ListenAndServe(":3000", r)
}

func resolveDataDir() string {
	dataDir := os.Getenv("DATA_DIR")
	if dataDir != "" {
		return dataDir
	}

	home := os.Getenv("HOME") // Linux / macOS
	if home == "" {
		home = os.Getenv("USERPROFILE") // Windows
	}

	return filepath.Join(home, ".kotakin")
}

func handleError(err error) {
	fmt.Fprintln(os.Stderr, "Error:", err)
	os.Exit(1)
}
