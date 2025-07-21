package repo

import (
	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/banyutekno/kotakin/pkg/git"
)

func (s *RepoService) Create(repoURL string) (string, error) {
	id := s.resolveRepoIDByURL(repoURL)

	repo, _ := s.Read(id)
	if repo != nil {
		return "", &domain.BusinessRuleError{
			Message: "repo already exists",
		}
	}

	repoDir, err := s.repoDir(id)
	if err != nil {
		return "", err
	}

	git.Clone(repoURL, repoDir)

	return id, nil
}
