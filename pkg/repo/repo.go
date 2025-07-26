package repo

import (
	"os"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/banyutekno/kotakin/pkg/utils"
)

type Repo struct {
	ID         string `json:"id"`
	Name       string `json:"name"`
	URL        string `json:"url,omitempty"`
	Maintainer string `json:"maintainer,omitempty"`
}

func FromDir(repoDir string) (*Repo, error) {
	id := filepath.Base(repoDir)
	repo := &Repo{
		ID:   id,
		Name: id,
	}

	_, err := os.Stat(repoDir)
	if os.IsNotExist(err) {
		return nil, &domain.NotFoundError{
			Message: "repo not found",
			Cause:   err,
		}
	}

	repoFile := filepath.Join(repoDir, "repository.yml")
	utils.YmlRead(repoFile, repo)

	return repo, nil
}
