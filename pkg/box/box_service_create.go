package box

import (
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/utils"
	"github.com/joho/godotenv"
)

type CreateCommand struct {
	Name     string            `json:"name"`
	Template string            `json:"template"`
	Env      map[string]string `json:"env"`
}

func (s *Service) Create(cmd CreateCommand) (string, error) {
	id, err := s.nextID(cmd.Name)
	if err != nil {
		id, err = s.nextID(filepath.Base(cmd.Template))
		if err != nil {
			return "", err
		}
	}

	templateDir := s.config.TemplateDir(cmd.Template)
	boxDir := s.config.BoxDir(id)

	if err := utils.EnsureDir(boxDir); err != nil {
		return "", err
	}

	if err := utils.CopyDir(templateDir, boxDir); err != nil {
		return "", err
	}

	envFile := filepath.Join(boxDir, ".env")
	if err := godotenv.Write(cmd.Env, envFile); err != nil {
		return "", err
	}

	return id, nil
}
