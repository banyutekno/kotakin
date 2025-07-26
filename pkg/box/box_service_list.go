package box

import (
	"context"
	"os"

	"github.com/banyutekno/kotakin/pkg/docker"
)

func (s *Service) List(ctx context.Context) ([]*Box, error) {
	boxes := []*Box{}

	rootDir := s.config.BoxDir("")
	entries, err := os.ReadDir(rootDir)
	if err != nil {
		return nil, err
	}

	for _, entry := range entries {
		box, err := s.Read(ctx, entry.Name())
		if err != nil {
			return nil, err
		}
		boxes = append(boxes, box)
	}

	boxes, err = s.populateUnmanagedBoxes(ctx, boxes)
	if err != nil {
		return nil, err
	}

	return boxes, nil

}

func (s *Service) populateUnmanagedBoxes(ctx context.Context, boxes []*Box) ([]*Box, error) {
	containers, err := docker.ContainerList(ctx)
	if err != nil {
		return nil, err
	}

	for _, container := range containers {
		id := container.Names[0][1:]

		composeProject := container.Labels["com.docker.compose.project"]
		if composeProject != "" {
			id = composeProject
		}

		box := findBoxByID(boxes, id)
		if box == nil {
			box, err := s.Read(ctx, id)
			if err != nil {
				return nil, err
			}
			boxes = append(boxes, box)
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
