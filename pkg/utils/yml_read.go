package utils

import (
	"os"

	"gopkg.in/yaml.v3"
)

func YmlRead(file string, data any) {
	if content, err := os.ReadFile(file); err == nil {
		yaml.Unmarshal(content, data)
	}
}
