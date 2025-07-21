package git

import (
	"log"
	"testing"
)

func TestPullWithSshUrl(t *testing.T) {
	repoPath := "/home/reekoheek/Workspaces/bts/kotakin_data/repos/ssh"
	log.Println("repoPath=", repoPath)

	err := Pull(repoPath)
	if err != nil {
		t.Error(err)
	}
}

func TestPullWithHttpsUrl(t *testing.T) {
	repoPath := "/home/reekoheek/Workspaces/bts/kotakin_data/repos/https"
	log.Println("repoPath=", repoPath)

	err := Pull(repoPath)
	if err != nil {
		t.Error(err)
	}
}

func TestPullWithError(t *testing.T) {
	repoPath := "/home/reekoheek/Workspaces/bts/kotakin_data/repos/foo"
	log.Println("repoPath=", repoPath)

	err := Pull(repoPath)
	if err == nil {
		t.Errorf("must be return error")
	}
}
