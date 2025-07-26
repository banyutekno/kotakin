package box

import (
	"context"
	"path/filepath"
	"strings"

	"github.com/banyutekno/kotakin/pkg/docker"
	"github.com/banyutekno/kotakin/pkg/domain"
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

	box.composeConfig = ComposeConfig{
		WorkingDir: boxDir,
		ConfigFiles: []string{
			filepath.Join(boxDir, "compose.yml"),
		},
	}

	containers, err := docker.ComposeContainerList(ctx, id)
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
	container, err := docker.Container(ctx, id)
	if err == nil {
		box := &Box{
			ID:    id,
			Kind:  KindContainer,
			State: State(container.State),
		}

		return box, nil
	}

	return nil, &domain.NotFoundError{Message: "box not found"}
}

func findUnmanagedComposeBox(ctx context.Context, id string) (*Box, error) {
	containers, err := docker.ComposeContainerList(ctx, id)
	if err != nil {
		return nil, err
	}
	if len(containers) == 0 {
		return nil, &domain.NotFoundError{Message: "box not found"}
	}

	c := containers[0]

	configFiles := strings.Split(c.Labels["com.docker.compose.project.config_files"], ",")
	workingDir := c.Labels["com.docker.compose.project.working_dir"]

	box := &Box{
		ID:    id,
		Kind:  KindCompose,
		State: State(c.State),
		composeConfig: ComposeConfig{
			WorkingDir:  workingDir,
			ConfigFiles: configFiles,
		},
	}

	return box, nil
}
