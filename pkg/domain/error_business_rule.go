package domain

import "errors"

type BusinessRuleError struct {
	Message string
	Cause   error
}

func (e *BusinessRuleError) Error() string {
	return e.Message
}

func (e *BusinessRuleError) Unwrap() error {
	return e.Cause
}

func IsBusinessRuleError(err error) bool {
	var domainErr *BusinessRuleError
	return errors.As(err, &domainErr)
}
