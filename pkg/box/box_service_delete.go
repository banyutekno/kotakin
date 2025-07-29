package box

import (
	"context"
	"os"

	"github.com/banyutekno/kotakin/pkg/docker"
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

	if err := docker.ComposeDown(ctx, box.composeConfig.WorkingDir, box.composeConfig.ConfigFiles); err != nil {
		return err
	}

	if err = os.RemoveAll(box.composeConfig.WorkingDir); err != nil {
		return err
	}

	return nil
}
