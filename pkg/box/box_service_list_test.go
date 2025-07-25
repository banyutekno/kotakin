package box

import (
	"fmt"
	"testing"

	"github.com/banyutekno/kotakin/pkg/config"
)

func TestServiceList(t *testing.T) {
	boxService := NewService(&config.Config{})
	boxes, err := boxService.List()
	if err != nil {
		panic(err)
	}

	for _, box := range boxes {
		fmt.Println(box.ID, box.Kind)
		for _, c := range box.Containers {
			fmt.Println(" ", c)
		}
	}
}
