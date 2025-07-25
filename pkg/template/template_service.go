package template

import (
	"github.com/banyutekno/kotakin/pkg/config"
)

type Service struct {
	config *config.Config
}

func NewService(config *config.Config) *Service {
	return &Service{
		config: config,
	}
}
