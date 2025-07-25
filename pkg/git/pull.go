package git

import (
	"fmt"
	"os"
	"strings"

	"github.com/go-git/go-git/v5"
)

func Pull(repoPath string) error {
	repo, err := git.PlainOpen(repoPath)
	if err != nil {
		return fmt.Errorf("open repo: %w", err)
	}

	// Get remote URL
	remote, err := repo.Remote("origin")
	if err != nil {
		return fmt.Errorf("get remote: %w", err)
	}
	remoteURL := remote.Config().URLs[0]

	wt, err := repo.Worktree()
	if err != nil {
		return fmt.Errorf("get worktree: %w", err)
	}

	pullOptions := git.PullOptions{
		RemoteName: "origin",
		Progress:   os.Stdout,
	}

	if !strings.Contains(remoteURL, "://") {
		auth, err := getDefaultSSHAuth()
		if err != nil {
			return err
		}

		pullOptions.Auth = auth
	}

	err = wt.Pull(&pullOptions)
	if err != nil && err != git.NoErrAlreadyUpToDate {
		return fmt.Errorf("pull failed: %w", err)
	}

	return nil
}
