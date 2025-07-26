package docker

import (
	"context"
	"slices"

	"github.com/banyutekno/kotakin/pkg/domain"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
)

func Container(ctx context.Context, id string) (container.Summary, error) {
	filterArgs := filters.NewArgs()
	filterArgs.Add("name", id)
	containers, err := cli.ContainerList(ctx, container.ListOptions{
		All:     true,
		Filters: filterArgs,
	})
	if err != nil {
		return container.Summary{}, err
	}

	for _, c := range containers {
		if slices.Contains(c.Names, "/"+id) {
			return c, nil
		}
	}

	return container.Summary{}, &domain.NotFoundError{Message: "container not found"}
}
