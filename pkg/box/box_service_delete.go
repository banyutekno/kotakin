package box

import (
	"context"
	"os"

	"github.com/banyutekno/kotakin/pkg/domain"
)

func (s *Service) Delete(ctx context.Context, id string) error {
	box, err := s.Read(ctx, id)
	if err != nil {
		return err
	}

	if !box.Managed() {
		return &domain.BusinessRuleError{Message: "unmanaged box"}
	}

	if box.State == "running" {
		return &domain.BusinessRuleError{Message: "still running"}
	}

	boxDir := s.config.BoxDir(id)

	err = os.RemoveAll(boxDir)
	if err != nil {
		return err
	}

	return nil
}
