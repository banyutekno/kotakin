package docker

import (
	"context"

	"github.com/docker/docker/api/types/container"
)

func ContainerStop(ctx context.Context, id string) error {
	cli, err := Client()
	if err != nil {
		return err
	}

	if err := cli.ContainerStop(ctx, id, container.StopOptions{}); err != nil {
		return err
	}

	return nil
}
