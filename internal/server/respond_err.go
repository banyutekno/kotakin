package server

import (
	"net/http"

	"github.com/banyutekno/kotakin/pkg/domain"
)

func respondErr(w http.ResponseWriter, err error) {
	if !domain.IsDomainError(err) {
		respondJson(w, 500, err)
		return
	}

	domainErr := err.(*domain.DomainError)

	status := 500
	switch domainErr.Type {
	case domain.ErrBadRequest:
		status = 400
	case domain.ErrNotFound:
		status = 404
	}

	respondJson(w, status, domainErr)
}
