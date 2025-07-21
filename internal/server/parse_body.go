package server

import (
	"encoding/json"
	"net/http"

	"github.com/banyutekno/kotakin/pkg/domain"
)

func parseBody(r *http.Request, body interface{}) error {
	err := json.NewDecoder(r.Body).Decode(body)
	if err != nil {
		return &domain.ValidationError{
			Message: "invalid body",
			Cause:   err,
		}
	}
	return nil
}
