package box

import (
	"os"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/domain"
	"gopkg.in/yaml.v3"
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

type EnvConfig struct {
	Name        string `json:"name"`
	Label       string `json:"label"`
	Description string `json:"description"`
	Default     string `json:"default"`
}

type Box struct {
	ID            string      `json:"id"`
	Kind          Kind        `json:"kind"`
	State         State       `json:"state"`
	Name          string      `json:"name,omitempty"`
	Template      string      `json:"template,omitempty"`
	EnvConfigs    []EnvConfig `json:"env_configs,omitempty"`
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
	boxFile := filepath.Join(boxDir, ".box.yml")
	if content, err := os.ReadFile(boxFile); err == nil {
		yaml.Unmarshal(content, &config)
	}

	box := &Box{
		ID:       id,
		Kind:     KindCompose,
		State:    "unknown",
		Name:     config.Name,
		Template: config.Template,
	}

	return box, nil
}
