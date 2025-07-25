package git

import (
	"path/filepath"
	"testing"
)

func TestCloneWithSshUrl(t *testing.T) {
	tmpDir := t.TempDir()

	repoURL := "git@github.com:Poeschl-HomeAssistant-Addons/repository.git"
	repoPath := filepath.Join(tmpDir, "foo")
	Clone(repoURL, repoPath)
}

func TestCloneWithHttpsUrl(t *testing.T) {
	tmpDir := t.TempDir()

	repoURL := "https://github.com/Poeschl-HomeAssistant-Addons/repository.git"
	repoPath := filepath.Join(tmpDir, "bar")
	Clone(repoURL, repoPath)
}
