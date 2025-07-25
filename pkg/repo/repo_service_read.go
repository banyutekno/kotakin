package repo

func (s *Service) Read(id string) (*Repo, error) {
	repoDir := s.config.RepoDir(id)

	repo, err := FromDir(repoDir)
	if err != nil {
		return nil, err
	}

	return repo, nil
}
