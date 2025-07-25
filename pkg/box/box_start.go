package box

import (
	"context"

	"github.com/banyutekno/kotakin/pkg/docker"
	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/docker/docker/api/types/container"
)

func (b *Box) Start(ctx context.Context) error {
	if b.Kind == "container" {
		return b.startContainer(ctx)
	}

	if b.Kind == "compose" {
		return b.startCompose(ctx)
	}

	return nil
}

func (b *Box) startCompose(ctx context.Context) error {
	if !b.Managed {
		return &domain.BusinessRuleError{Message: "unmanaged box"}
	}

	err := docker.ComposeUp(ctx, b.composeWorkingDir, b.composeConfigFiles)
	if err != nil {
		return err
	}

	return nil
}

func (b *Box) startContainer(ctx context.Context) error {
	cli, err := docker.Client()
	if err != nil {
		return err
	}

	if err := cli.ContainerStart(ctx, b.ID, container.StartOptions{}); err != nil {
		return err
	}

	return nil
}
