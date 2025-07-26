package docker

import (
	"context"

	"github.com/docker/docker/api/types/container"
)

func ContainerList(ctx context.Context) ([]container.Summary, error) {
	cli, err := Client()
	if err != nil {
		return nil, err
	}

	return cli.ContainerList(ctx, container.ListOptions{
		All: true,
	})
}
