package repo

import (
	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/banyutekno/kotakin/pkg/git"
	"github.com/banyutekno/kotakin/pkg/utils"
)

type CreateCommand struct {
	URL string
}

func (s *Service) Create(cmd CreateCommand) (string, error) {
	id := s.resolveID(cmd.URL)

	repo, _ := s.Read(id)
	if repo != nil {
		return "", &domain.BusinessRuleError{
			Message: "repo already exists",
		}
	}

	repoDir := s.config.RepoDir(id)
	if err := utils.EnsureDir(repoDir); err != nil {
		return "", err
	}

	git.Clone(cmd.URL, repoDir)

	return id, nil
}
