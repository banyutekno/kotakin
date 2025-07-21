package domain

import "errors"

type NotFoundError struct {
	Message string
	Cause   error
}

func (e *NotFoundError) Error() string {
	return e.Message
}

func (e *NotFoundError) Unwrap() error {
	return e.Cause
}

func IsNotFoundError(err error) bool {
	var domainErr *NotFoundError
	return errors.As(err, &domainErr)
}
