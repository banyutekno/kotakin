package box

import (
	"fmt"
	"testing"
)

func TestGetBoxes(t *testing.T) {
	boxes := GetBoxes()
	for _, box := range boxes {
		fmt.Println(box.Name, box.Kind)
		for _, c := range box.Containers {
			fmt.Println(" ", c)
		}
	}
}
