package config

import (
	"log"
	"path/filepath"
)

type Config struct {
	DataDir string `json:"data_dir"`
	Network string `json:"network"`
}

func (c *Config) RepoDir(id string) string {
	dir := filepath.Join(c.DataDir, "repos")
	if id != "" {
		dir = filepath.Join(dir, id)
	}
	return dir
}

func (c *Config) TemplateDir(id string) string {
	dir := filepath.Join(c.DataDir, "repos")
	if id != "" {
		dir = filepath.Join(dir, id)
	}
	return dir
}

func (c *Config) BoxDir(id string) string {
	dir := filepath.Join(c.DataDir, "boxes")
	if id != "" {
		dir = filepath.Join(dir, id)
	}
	return dir
}

func WithDataDir(dataDir string) (*Config, error) {
	dataDir, err := filepath.Abs(dataDir)
	if err != nil {
		panic(err)
	}

	log.Printf("DATA_DIR=%s\n", dataDir)

	config := &Config{
		DataDir: dataDir,
		Network: "kotakin_net",
	}
	return config, nil
}
