package docker

import (
	"context"
	"os"
	"os/exec"
)

func ComposeUp(ctx context.Context, dir string, configs []string) error {
	args := []string{"compose"}

	for _, config := range configs {
		args = append(args, "-f", config)
	}

	args = append(args, "up", "-d")

	cmd := exec.CommandContext(ctx, "docker", args...)
	cmd.Dir = dir
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	cmd.Stdin = os.Stdin

	if err := cmd.Run(); err != nil {
		return err
	}
	return nil
}
