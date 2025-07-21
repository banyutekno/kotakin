package repo

func (s *RepoService) Read(id string) (*Repo, error) {
	repoDir, err := s.repoDir(id)
	if err != nil {
		return nil, err
	}

	repo, err := FromDir(repoDir)
	if err != nil {
		return nil, err
	}

	return repo, nil
}
