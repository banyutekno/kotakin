package repo

import (
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/config"
	"github.com/banyutekno/kotakin/pkg/utils"
)

type RepoService struct {
	config *config.Config
}

func (s *RepoService) repoDir(id string) (string, error) {
	repoDir := filepath.Join(s.config.DataDir, "repos")
	if err := utils.EnsureDir(repoDir); err != nil {
		return "", err
	}

	if id != "" {
		repoDir = filepath.Join(repoDir, id)
	}

	return repoDir, nil
}

func NewRepoService(config *config.Config) *RepoService {
	return &RepoService{
		config: config,
	}
}
