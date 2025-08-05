package template

import (
	"os"
	"path/filepath"
	"strings"

	"github.com/banyutekno/kotakin/pkg/utils"
)

func (s *Service) List() ([]*Template, error) {
	rootDir := s.config.TemplateDir("")
	if err := utils.EnsureDir(rootDir); err != nil {
		return nil, err
	}

	repoFiles, err := os.ReadDir(rootDir)
	if err != nil {
		return nil, err
	}

	templates := []*Template{}

	for _, repoFile := range repoFiles {
		if !repoFile.IsDir() {
			continue
		}

		if strings.HasPrefix(repoFile.Name(), ".") {
			continue
		}

		repoDir := filepath.Join(rootDir, repoFile.Name())
		templateFiles, err := os.ReadDir(repoDir)
		if err != nil {
			return nil, err
		}

		for _, templateFile := range templateFiles {
			if !templateFile.IsDir() {
				continue
			}

			if strings.HasPrefix(templateFile.Name(), ".") {
				continue
			}

			templateDir := filepath.Join(repoDir, templateFile.Name())
			template, err := FromDir(templateDir)
			if err != nil {
				return nil, err
			}
			templates = append(templates, template)
		}
	}

	return templates, nil

}
