package repo

import (
	"net/url"
	"path/filepath"
	"regexp"
	"strings"

	"github.com/banyutekno/kotakin/pkg/config"
	"github.com/banyutekno/kotakin/pkg/utils"
)

type RepoService struct {
	config *config.Config
}

func (s *RepoService) repoDir(id string) (string, error) {
	repoDir := filepath.Join(s.config.DataDir, "repos")
	if err := utils.EnsureDir(repoDir); err != nil {
		return "", err
	}

	if id != "" {
		repoDir = filepath.Join(repoDir, id)
	}

	return repoDir, nil
}

func (s *RepoService) resolveRepoIDByURL(repoURL string) string {
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

func NewRepoService(config *config.Config) *RepoService {
	return &RepoService{
		config: config,
	}
}
