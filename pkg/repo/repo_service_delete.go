package repo

import "os"

func (s *Service) Delete(id string) error {
	_, err := s.Read(id)
	if err != nil {
		return err
	}

	repoDir := s.config.RepoDir(id)

	err = os.RemoveAll(repoDir)
	if err != nil {
		return err
	}

	return nil
}
