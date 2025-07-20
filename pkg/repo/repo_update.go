package repo

func (s *RepoService) Update(id string) error {
	repo, err := s.Read(id)
	if err != nil {
		return err
	}

	if repo.URL == "" {
		return nil
	}

	// FIXME: do update
	// repoDir, err := s.repoDir(id)
	// if err != nil {
	// 	return err
	// }

	return nil
}
