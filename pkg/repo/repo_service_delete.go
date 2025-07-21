package repo

import "os"

func (s *RepoService) Delete(id string) error {
	_, err := s.Read(id)
	if err != nil {
		return err
	}

	repoDir, err := s.repoDir(id)
	if err != nil {
		return err
	}

	err = os.RemoveAll(repoDir)
	if err != nil {
		return err
	}

	return nil
}
