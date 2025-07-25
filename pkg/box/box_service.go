package box

import (
	"regexp"
	"strconv"
	"strings"

	"github.com/banyutekno/kotakin/pkg/config"
	"github.com/banyutekno/kotakin/pkg/domain"
)

type Service struct {
	config *config.Config
}

func (s *Service) nextID(base string) (string, error) {
	err := &domain.NotFoundError{
		Message: "box next id not found",
	}

	if base == "" {
		return "", err
	}

	base = strings.ToLower(base)
	reNonAlnum := regexp.MustCompile(`[^a-z0-9]+`)
	base = reNonAlnum.ReplaceAllString(base, "-")
	base = strings.Trim(base, "-")

	if _, err := s.Read(base); err != nil {
		return base, nil
	}

	for i := range 10 {
		id := base + "-" + strconv.Itoa(i+1)
		if _, err := s.Read(id); err != nil {
			return id, nil
		}
	}

	return "", err
}

func NewService(config *config.Config) *Service {
	return &Service{
		config: config,
	}
}
