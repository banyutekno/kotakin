package repo

import "github.com/banyutekno/kotakin/pkg/git"

func (s *Service) Update(id string) error {
	repo, err := s.Read(id)
	if err != nil {
		return err
	}

	if repo.URL == "" {
		return nil
	}

	repoDir := s.config.RepoDir(id)

	if err := git.Pull(repoDir); err != nil {
		return err
	}

	return nil
}
