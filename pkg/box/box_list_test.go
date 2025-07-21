package box

import (
	"fmt"
	"testing"
)

func TestBoxList(t *testing.T) {
	boxService := NewBoxService()
	boxes, err := boxService.List()
	if err != nil {
		panic(err)
	}

	for _, box := range boxes {
		fmt.Println(box.Name, box.Kind)
		for _, c := range box.Containers {
			fmt.Println(" ", c)
		}
	}
}
