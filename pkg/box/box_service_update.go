package box

import (
	"context"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/utils"
	"github.com/joho/godotenv"
)

type UpdateCommand struct {
	ID   string            `json:"id"`
	Name string            `json:"name"`
	Env  map[string]string `json:"env"`
}

func (s *Service) Update(ctx context.Context, cmd UpdateCommand) error {
	box, err := s.Read(ctx, cmd.ID)
	if err != nil {
		return err
	}

	boxDir := s.config.BoxDir(cmd.ID)

	if cmd.Name != "" {
		config := BoxConfig{
			Name:     cmd.Name,
			Template: box.Template,
		}
		boxFile := filepath.Join(boxDir, "box.yml")
		utils.YmlWrite(boxFile, &config)
	}

	if cmd.Env != nil {
		envFile := filepath.Join(boxDir, ".env")
		if err := godotenv.Write(cmd.Env, envFile); err != nil {
			return err
		}
	}

	return nil
}
