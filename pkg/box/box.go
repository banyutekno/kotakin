package box

import (
	"os"
	"path/filepath"

	"github.com/banyutekno/kotakin/pkg/domain"
)

type Kind string

const (
	KindContainer Kind = "container"
	KindCompose   Kind = "compose"
)

type Box struct {
	ID         string       `json:"id"`
	Kind       Kind         `json:"kind"`
	Containers []*Container `json:"containers"`
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
	box := &Box{
		ID: id,
	}

	return box, nil
}
