package box

import (
	"os"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/banyutekno/kotakin/pkg/utils"
	"github.com/joho/godotenv"
)

type Kind string

const (
	KindContainer Kind = "container"
	KindCompose   Kind = "compose"
)

type State string

type ComposeConfig struct {
	WorkingDir  string
	ConfigFiles []string
}

type Box struct {
	ID            string            `json:"id"`
	Kind          Kind              `json:"kind"`
	State         State             `json:"state"`
	Name          string            `json:"name,omitempty"`
	Template      string            `json:"template,omitempty"`
	Env           map[string]string `json:"env,omitempty"`
	composeConfig ComposeConfig
}

func (b *Box) Managed() bool {
	return b.Template != ""
}

type BoxConfig struct {
	Name     string `yaml:"name,omitempty"`
	Template string `yaml:"template"`
}

func FromDir(boxDir string) (*Box, error) {
	_, err := os.Stat(boxDir)
	if os.IsNotExist(err) {
		return nil, &domain.NotFoundError{
			Message: "box not found",
			Cause:   err,
		}
	}

	id := filepath.Base(boxDir)

	config := BoxConfig{}
	boxFile := filepath.Join(boxDir, "box.yml")
	utils.YmlRead(boxFile, &config)

	box := &Box{
		ID:       id,
		Kind:     KindCompose,
		State:    "unknown",
		Name:     config.Name,
		Template: config.Template,
	}

	envFile := filepath.Join(boxDir, ".env")
	envMap, err := godotenv.Read(envFile)
	if err == nil {
		box.Env = envMap
	}

	return box, nil
}
