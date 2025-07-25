package box

import (
	"context"
	"slices"
	"strings"

	"github.com/banyutekno/kotakin/pkg/docker"
	"github.com/banyutekno/kotakin/pkg/domain"

	containertypes "github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/filters"
)

func (s *Service) Read(ctx context.Context, id string) (*Box, error) {
	rootDir := s.config.BoxDir("")
	boxDir := s.config.BoxDir(id)

	box, err := FromDir(boxDir)
	if err != nil {
		return findUnmanagedBox(ctx, id)
	}

	if !strings.HasPrefix(boxDir, rootDir+"/") {
		return nil, &domain.NotFoundError{Message: "box not found"}
	}

	box.Managed = true

	containers, err := findComposeContainers(ctx, id)
	if err == nil && len(containers) > 0 {
		box.State = State(containers[0].State)
	}

	return box, nil
}

func findUnmanagedBox(ctx context.Context, id string) (*Box, error) {
	box, err := findUnmanagedComposeBox(ctx, id)
	if err == nil {
		return box, nil
	}

	box, err = findUnmanagedContainerBox(ctx, id)
	return box, err
}

func findUnmanagedContainerBox(ctx context.Context, id string) (*Box, error) {
	cli, err := docker.Client()
	if err != nil {
		return nil, err
	}

	filterArgs := filters.NewArgs()
	filterArgs.Add("name", id)
	containers, err := cli.ContainerList(ctx, containertypes.ListOptions{
		All:     true,
		Filters: filterArgs,
	})
	if err != nil {
		return nil, err
	}

	for _, container := range containers {
		if slices.Contains(container.Names, "/"+id) {
			box := &Box{
				ID:      id,
				Kind:    KindContainer,
				Managed: false,
				State:   State(containers[0].State),
			}
			return box, nil
		}
	}

	return nil, &domain.NotFoundError{Message: "box not found"}
}

func findUnmanagedComposeBox(ctx context.Context, id string) (*Box, error) {
	containers, err := findComposeContainers(ctx, id)
	if err != nil {
		return nil, err
	}
	if len(containers) == 0 {
		return nil, &domain.NotFoundError{Message: "box not found"}
	}

	box := &Box{
		ID:      id,
		Kind:    KindCompose,
		Managed: false,
		State:   State(containers[0].State),
	}
	return box, nil
}

func findComposeContainers(ctx context.Context, id string) ([]containertypes.Summary, error) {
	cli, err := docker.Client()
	if err != nil {
		return nil, err
	}

	filterArgs := filters.NewArgs()
	filterArgs.Add("label", "com.docker.compose.project="+id)
	return cli.ContainerList(ctx, containertypes.ListOptions{
		All:     true,
		Filters: filterArgs,
	})
}
