package box

import (
	"context"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/utils"
	"github.com/joho/godotenv"
)

type CreateCommand struct {
	Name     string            `json:"name"`
	Template string            `json:"template"`
	Env      map[string]string `json:"env"`
}

func (s *Service) Create(ctx context.Context, cmd CreateCommand) (string, error) {
	id, err := s.findNextIDByNameAndTemplate(ctx, cmd.Name, cmd.Template)
	if err != nil {
		return "", err
	}

	templateDir := s.config.TemplateDir(cmd.Template)
	boxDir := s.config.BoxDir(id)

	if err := utils.EnsureDir(boxDir); err != nil {
		return "", err
	}

	if err := utils.CopyDir(templateDir, boxDir); err != nil {
		return "", err
	}

	config := BoxConfig{
		Name:     cmd.Name,
		Template: cmd.Template,
	}
	boxFile := filepath.Join(boxDir, "box.yml")
	utils.YmlWrite(boxFile, &config)

	// TODO: validate and set default env

	envFile := filepath.Join(boxDir, ".env")
	if err := godotenv.Write(cmd.Env, envFile); err != nil {
		return "", err
	}

	return id, nil
}

func (s *Service) findNextIDByNameAndTemplate(ctx context.Context, name string, template string) (string, error) {
	if id, err := s.nextID(ctx, name); err == nil {
		return id, nil
	}

	id, err := s.nextID(ctx, filepath.Base(template))
	return id, err
}
