package domain

import "errors"

type ValidationError struct {
	Message string
	Cause   error
}

func (e *ValidationError) Error() string {
	return e.Message
}

func (e *ValidationError) Unwrap() error {
	return e.Cause
}

func IsValidationError(err error) bool {
	var domainErr *ValidationError
	return errors.As(err, &domainErr)
}
