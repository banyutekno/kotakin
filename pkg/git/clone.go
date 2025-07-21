package git

import (
	"fmt"
	"os"
	"os/user"
	"path/filepath"
	"strings"

	"github.com/go-git/go-git/v5"
	"golang.org/x/crypto/ssh"

	gitssh "github.com/go-git/go-git/v5/plumbing/transport/ssh"
)

func Clone(repoURL, targetDir string) error {
	if strings.Contains(repoURL, "://") {
		return cloneHTTP(repoURL, targetDir)
	}

	return cloneSSH(repoURL, targetDir)
}

func cloneHTTP(repoURL, targetDir string) error {
	_, err := git.PlainClone(targetDir, false, &git.CloneOptions{
		URL:      repoURL,
		Progress: os.Stdout,
		Depth:    1,
	})
	if err != nil {
		return err
	}
	return nil
}

func cloneSSH(repoURL, targetDir string) error {
	auth, err := getDefaultSSHAuth()
	if err != nil {
		return err
	}

	_, err = git.PlainClone(targetDir, false, &git.CloneOptions{
		URL:      repoURL,
		Auth:     auth,
		Progress: os.Stdout,
		Depth:    1,
	})
	if err != nil {
		return fmt.Errorf("ssh clone failed: %w", err)
	}
	return nil
}

func getDefaultSSHAuth() (*gitssh.PublicKeys, error) {
	privateKeyPath, err := findSSHKey()
	if err != nil {
		return nil, fmt.Errorf("invalid ssh key: %w", err)
	}
	key, err := os.ReadFile(privateKeyPath)
	if err != nil {
		return nil, fmt.Errorf("read ssh key: %w", err)
	}

	signer, err := ssh.ParsePrivateKey(key)
	if err != nil {
		return nil, fmt.Errorf("parse ssh key: %w", err)
	}

	auth := &gitssh.PublicKeys{
		User:   "git",
		Signer: signer,
		HostKeyCallbackHelper: gitssh.HostKeyCallbackHelper{
			HostKeyCallback: ssh.InsecureIgnoreHostKey(),
		},
	}

	return auth, nil
}

func findSSHKey() (string, error) {
	usr, err := user.Current()
	if err != nil {
		return "", fmt.Errorf("get current user: %w", err)
	}
	sshDir := filepath.Join(usr.HomeDir, ".ssh")

	candidates := []string{
		"id_ed25519",
		"id_ecdsa",
		"id_rsa",
		"id_dsa",
	}

	for _, name := range candidates {
		path := filepath.Join(sshDir, name)
		if _, err := os.Stat(path); err == nil {
			return path, nil
		}
	}

	return "", fmt.Errorf("no known private key found in %s", sshDir)
}
