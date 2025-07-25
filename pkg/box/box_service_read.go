package box

func (s *Service) Read(id string) (*Box, error) {
	boxDir := s.config.BoxDir(id)

	box, err := FromDir(boxDir)
	if err != nil {
		return nil, err
	}

	return box, nil
}
