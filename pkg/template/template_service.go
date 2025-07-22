package template

import (
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/config"
)

type Service struct {
	config *config.Config
}

func NewTemplateService(config *config.Config) *Service {
	return &Service{
		config: config,
	}
}

func (s *Service) templateDir(id string) string {
	templateDir := filepath.Join(s.config.DataDir, "repos")
	if id != "" {
		templateDir = filepath.Join(templateDir, id)
	}
	return templateDir
}
