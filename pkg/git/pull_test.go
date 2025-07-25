package git

import (
	"testing"
)

func TestPullWithSshUrl(t *testing.T) {
	repoPath := "/home/reekoheek/Workspaces/bts/kotakin_data/repos/ssh"

	err := Pull(repoPath)
	if err != nil {
		t.Error(err)
	}
}

func TestPullWithHttpsUrl(t *testing.T) {
	repoPath := "/home/reekoheek/Workspaces/bts/kotakin_data/repos/https"

	err := Pull(repoPath)
	if err != nil {
		t.Error(err)
	}
}

func TestPullWithError(t *testing.T) {
	repoPath := "/home/reekoheek/Workspaces/bts/kotakin_data/repos/foo"

	err := Pull(repoPath)
	if err == nil {
		t.Errorf("must be return error")
	}
}
