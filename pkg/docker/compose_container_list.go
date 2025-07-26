package docker

import (
	"context"

	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
)

func ComposeContainerList(ctx context.Context, id string) ([]container.Summary, error) {
	cli, err := Client()
	if err != nil {
		return nil, err
	}

	filterArgs := filters.NewArgs()
	filterArgs.Add("label", "com.docker.compose.project="+id)
	return cli.ContainerList(ctx, container.ListOptions{
		All:     true,
		Filters: filterArgs,
	})
}
