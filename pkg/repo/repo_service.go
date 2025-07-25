package repo

import (
	"net/url"
	"regexp"
	"strings"

	"github.com/banyutekno/kotakin/pkg/config"
)

type Service struct {
	config *config.Config
}

func (s *Service) resolveID(repoURL string) string {
	repoURL = strings.TrimSpace(repoURL)

	repoURL = strings.TrimPrefix(repoURL, "git@")
	if strings.Contains(repoURL, "://") {
		u, err := url.Parse(repoURL)
		if err == nil && u.Scheme != "" {
			repoURL = u.Host + u.Path
		}
	}

	repoURL = strings.TrimSuffix(repoURL, ".git")
	repoURL = strings.TrimSuffix(repoURL, "/")

	re := regexp.MustCompile(`[:/]+`)
	id := re.ReplaceAllString(repoURL, "__")
	return id
}

func NewService(config *config.Config) *Service {
	return &Service{
		config: config,
	}
}
