package docker

import (
	"context"

	"github.com/docker/docker/api/types/container"
)

func ContainerStart(ctx context.Context, id string) error {
	cli, err := Client()
	if err != nil {
		return err
	}

	if err := cli.ContainerStart(ctx, id, container.StartOptions{}); err != nil {
		return err
	}

	return nil
}
