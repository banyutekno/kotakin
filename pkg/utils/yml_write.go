package utils

import (
	"os"

	"gopkg.in/yaml.v3"
)

func YmlWrite(file string, data any) error {
	f, err := os.Create(file)
	if err != nil {
		return err
	}
	defer f.Close()

	encoder := yaml.NewEncoder(f)
	encoder.SetIndent(2)
	if err := encoder.Encode(data); err != nil {
		return err
	}

	return nil
}
