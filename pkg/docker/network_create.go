package docker

import (
	"context"
	"strings"

	"github.com/docker/docker/api/types/network"
)

func NetworkCreate(ctx context.Context, name string) error {
	cli, err := Client()
	if err != nil {
		return err
	}

	options := network.CreateOptions{
		Driver:     "bridge",
		Attachable: true,
	}

	_, err = cli.NetworkCreate(ctx, name, options)
	if err != nil && !strings.Contains(err.Error(), "already exists") {
		return err
	}

	return nil
}
