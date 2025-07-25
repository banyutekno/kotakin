package box

import (
	"context"

	containertypes "github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
)

func (s *Service) List() ([]*Box, error) {
	cli, err := client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	if err != nil {
		return nil, err
	}

	containers, err := cli.ContainerList(context.Background(), containertypes.ListOptions{All: true})
	if err != nil {
		return nil, err
	}

	boxes := []*Box{}

	for _, container := range containers {
		id := container.Names[0][1:]
		kind := KindContainer

		composeProject := container.Labels["com.docker.compose.project"]
		if composeProject != "" {
			id = composeProject
			kind = KindCompose
		}

		box := findBoxByID(boxes, id)
		if box == nil {
			box := &Box{
				ID:   id,
				Kind: kind,
				Containers: []*Container{{
					ID:   container.ID,
					Name: container.Names[0][1:],
				}},
			}
			boxes = append(boxes, box)
		} else {
			box.Containers = append(box.Containers, &Container{
				ID:   container.ID,
				Name: container.Names[0][1:],
			})
		}
	}

	return boxes, nil

}

func findBoxByID(boxes []*Box, name string) *Box {
	for _, box := range boxes {
		if box.ID == name {
			return box
		}
	}

	return nil
}
