package server

import (
	"log"
	"net/http"

	"github.com/banyutekno/kotakin/pkg/domain"
)

func respondErr(w http.ResponseWriter, err error) {
	if domain.IsNotFoundError(err) {
		respondJson(w, 404, err)
		return
	}

	if domain.IsValidationError(err) {
		respondJson(w, 400, err)
		return
	}

	if domain.IsBusinessRuleError(err) {
		respondJson(w, 400, err)
		return
	}

	log.Printf("Caught err: %+v\n", err)
	respondJson(w, 500, err)
}
