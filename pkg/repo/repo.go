package repo

import (
	"os"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/domain"
	"gopkg.in/yaml.v3"
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
	data, err := os.ReadFile(repoFile)
	if err != nil {
		return repo, nil
	}

	_ = yaml.Unmarshal(data, repo)
	return repo, nil
}
