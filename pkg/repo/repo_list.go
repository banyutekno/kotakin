package repo

import (
	"os"
)

func (s *RepoService) List() ([]*Repo, error) {
	rootDir, err := s.repoDir("")
	if err != nil {
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
