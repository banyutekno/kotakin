package template

import (
	"os"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/banyutekno/kotakin/pkg/utils"
)

type EnvConfig struct {
	Name        string
	Label       string
	Description string
	Default     string
}

type Template struct {
	ID         string      `json:"id"`
	Repo       string      `json:"repo"`
	Slug       string      `json:"slug"`
	Name       string      `json:"name"`
	EnvConfigs []EnvConfig `json:"env_configs"`
}

func (t *Template) PrepareEnv(env map[string]string) map[string]string {
	if env == nil {
		env = map[string]string{}
	}

	for _, envConfig := range t.EnvConfigs {
		if _, ok := env[envConfig.Name]; !ok {
			env[envConfig.Name] = envConfig.Default
		}
	}
	return env
}

type TemplateConfig struct {
	Name       string
	EnvConfigs []EnvConfig `yaml:"env_configs"`
}

func FromDir(templateDir string) (*Template, error) {
	_, err := os.Stat(templateDir)
	if os.IsNotExist(err) {
		return nil, &domain.NotFoundError{
			Message: "template not found",
			Cause:   err,
		}
	}

	var config TemplateConfig
	configFile := filepath.Join(templateDir, "template.yml")
	utils.YmlRead(configFile, &config)

	repo := filepath.Base(filepath.Dir(templateDir))
	slug := filepath.Base(templateDir)

	template := &Template{
		ID:         repo + "/" + slug,
		Repo:       repo,
		Slug:       slug,
		Name:       config.Name,
		EnvConfigs: config.EnvConfigs,
	}

	repoFile := filepath.Join(templateDir, "template.yml")
	utils.YmlRead(repoFile, template)

	return template, nil
}
