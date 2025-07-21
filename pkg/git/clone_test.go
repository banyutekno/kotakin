package git

import (
	"log"
	"path/filepath"
	"testing"
)

func TestCloneWithSshUrl(t *testing.T) {
	tmpDir := t.TempDir()
	// tmpDir, _ := os.MkdirTemp("", "gotest")
	// defer os.RemoveAll(tmpDir)
	log.Println("tmpDir=", tmpDir)

	repoURL := "git@github.com:Poeschl-HomeAssistant-Addons/repository.git"
	repoPath := filepath.Join(tmpDir, "foo")
	Clone(repoURL, repoPath)
}

func TestCloneWithHttpsUrl(t *testing.T) {
	tmpDir := t.TempDir()
	// tmpDir, _ := os.MkdirTemp("", "gotest")
	// defer os.RemoveAll(tmpDir)
	log.Println("tmpDir=", tmpDir)

	repoURL := "https://github.com/Poeschl-HomeAssistant-Addons/repository.git"
	repoPath := filepath.Join(tmpDir, "bar")
	Clone(repoURL, repoPath)
}
