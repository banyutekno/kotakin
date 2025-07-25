package box

import (
	"context"

	"github.com/banyutekno/kotakin/pkg/docker"
	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/docker/docker/api/types/container"
)

func (b *Box) Stop(ctx context.Context) error {
	if b.Kind == "container" {
		return b.stopContainer(ctx)
	}

	if b.Kind == "compose" {
		return b.stopCompose(ctx)
	}

	return nil
}

func (b *Box) stopCompose(ctx context.Context) error {
	if !b.Managed {
		return &domain.BusinessRuleError{Message: "unmanaged box"}
	}

	err := docker.ComposeDown(ctx, b.composeWorkingDir, b.composeConfigFiles)
	if err != nil {
		return err
	}

	return nil
}

func (b *Box) stopContainer(ctx context.Context) error {
	cli, err := docker.Client()
	if err != nil {
		return err
	}

	if err := cli.ContainerStop(ctx, b.ID, container.StopOptions{}); err != nil {
		return err
	}

	return nil
}
