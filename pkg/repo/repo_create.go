package repo

import (
	"os"

	"github.com/banyutekno/kotakin/pkg/domain"
)

func (s *RepoService) Create(url string) error {
	id := resolveRepoIDByURL(url)
	repoDir, err := s.repoDir(id)
	if err != nil {
		return err
	}

	_, err = os.Stat(repoDir)
	if os.IsNotExist(err) {
		return domain.NewDomainError(domain.ErrBadRequest, "repo already exists", err)
	}
	if err != nil {
		return err
	}

	// FIXME: do create

	return nil
}

func resolveRepoIDByURL(url string) string {
	// FIXME: fix this
	return url
}
