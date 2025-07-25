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

type State string

type Box struct {
	ID      string `json:"id"`
	Kind    Kind   `json:"kind"`
	Managed bool   `json:"managed"`
	State   State  `json:"state"`
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
		ID:    id,
		Kind:  KindCompose,
		State: "unknown",
	}

	return box, nil
}
