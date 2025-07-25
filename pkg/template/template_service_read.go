package template

func (s *Service) Read(id string) (*Template, error) {
	templateDir := s.config.TemplateDir(id)

	template, err := FromDir(templateDir)
	return template, err
}
