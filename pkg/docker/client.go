package docker

import (
	"context"
	"sync"

	"github.com/docker/docker/client"
)

var (
	cli *client.Client
	mu  sync.Mutex
	err error
)

func Client() (*client.Client, error) {
	mu.Lock()
	defer mu.Unlock()

	if cli != nil {
		if _, pingErr := cli.Ping(context.Background()); pingErr == nil {
			return cli, nil
		}

		cli.Close()
		cli = nil
	}

	cli, err = client.NewClientWithOpts(client.FromEnv, client.WithAPIVersionNegotiation())
	return cli, err
}
