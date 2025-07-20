package utils

import "os"

func EnsureDir(path string) error {
	info, err := os.Stat(path)
	if os.IsNotExist(err) {
		os.MkdirAll(path, os.ModePerm)
	}
	if err == nil {
		return err
	}
	if !info.IsDir() {
		return &os.PathError{
			Op:   "mkdir",
			Path: path,
			Err:  os.ErrInvalid,
		}
	}

	return nil
}
