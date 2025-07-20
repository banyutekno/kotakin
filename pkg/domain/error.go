package domain

import "errors"

type ErrorType string

const (
	ErrBadRequest ErrorType = "bad_request"
	ErrNotFound   ErrorType = "not_found"
)

type DomainError struct {
	Type    ErrorType
	Message string
	Cause   error
}

func (e *DomainError) Error() string {
	return e.Message
}

func (e *DomainError) Unwrap() error {
	return e.Cause
}

func NewDomainError(t ErrorType, msg string, cause error) *DomainError {
	return &DomainError{
		Type:    t,
		Message: msg,
		Cause:   cause,
	}
}

func IsDomainError(err error) bool {
	var domainErr *DomainError
	return errors.As(err, &domainErr)
}
