package config

import (
	"fmt"
	"os"
	"path/filepath"
)

type Config struct {
	DataDir string `json:"data_dir"`
}

func FromEnv() (*Config, error) {
	dataDir := os.Getenv("DATA_DIR")
	if dataDir == "" {
		return nil, fmt.Errorf("invalid config data dir")
	}

	dataDir, err := filepath.Abs(dataDir)
	if err != nil {
		panic(err)
	}

	config := &Config{
		DataDir: dataDir,
	}
	return config, nil
}
