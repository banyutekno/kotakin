package box

import (
	"context"

	"github.com/banyutekno/kotakin/pkg/docker"
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
	containers, err := docker.ComposeContainerList(ctx, b.ID)
	if err != nil {
		return err
	}

	for _, container := range containers {
		err := docker.ContainerStop(ctx, container.ID)
		if err != nil {
			return err
		}
	}

	return nil
}

func (b *Box) stopContainer(ctx context.Context) error {
	if err := docker.ContainerStop(ctx, b.ID); err != nil {
		return err
	}

	return nil
}
