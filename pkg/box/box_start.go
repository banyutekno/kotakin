package box

import (
	"context"

	"github.com/banyutekno/kotakin/pkg/docker"
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
	err := docker.ComposeUp(ctx, b.composeConfig.WorkingDir, b.composeConfig.ConfigFiles)
	if err != nil {
		return err
	}

	return nil
}

func (b *Box) startContainer(ctx context.Context) error {
	if err := docker.ContainerStart(ctx, b.ID); err != nil {
		return err
	}

	return nil
}
