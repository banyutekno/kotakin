package repo

import "github.com/banyutekno/kotakin/pkg/git"

func (s *RepoService) Update(id string) error {
	repo, err := s.Read(id)
	if err != nil {
		return err
	}

	if repo.URL == "" {
		return nil
	}

	repoDir, err := s.repoDir(id)
	if err != nil {
		return err
	}

	if err := git.Pull(repoDir); err != nil {
		return err
	}

	return nil
}
