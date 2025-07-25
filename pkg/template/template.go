package template

import (
	"os"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/domain"
	"gopkg.in/yaml.v3"
)

type Template struct {
	ID   string `json:"id"`
	Repo string `json:"repo"`
	Name string `json:"name"`
}

func FromDir(templateDir string) (*Template, error) {
	_, err := os.Stat(templateDir)
	if os.IsNotExist(err) {
		return nil, &domain.NotFoundError{
			Message: "template not found",
			Cause:   err,
		}
	}

	repo := filepath.Base(filepath.Dir(templateDir))
	name := filepath.Base(templateDir)
	template := &Template{
		ID:   repo + "/" + name,
		Repo: repo,
		Name: name,
	}

	repoFile := filepath.Join(templateDir, "template.yml")
	data, err := os.ReadFile(repoFile)
	if err != nil {
		return template, nil
	}

	_ = yaml.Unmarshal(data, repo)
	return template, nil
}
