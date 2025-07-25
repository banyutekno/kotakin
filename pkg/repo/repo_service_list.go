package repo

import (
	"os"

	"github.com/banyutekno/kotakin/pkg/utils"
)

func (s *Service) List() ([]*Repo, error) {
	rootDir := s.config.RepoDir("")
	if err := utils.EnsureDir(rootDir); err != nil {
		return nil, err
	}

	entries, err := os.ReadDir(rootDir)
	if err != nil {
		return nil, err
	}

	repos := []*Repo{}

	for _, entry := range entries {
		repo, err := s.Read(entry.Name())
		if err != nil {
			return nil, err
		}
		repos = append(repos, repo)
	}

	return repos, nil
}
