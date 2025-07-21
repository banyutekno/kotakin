package server

import (
	"bytes"
	"encoding/json"
	"net/http"
)

type MessageResponse struct {
	Message string `json:"message"`
}

func respondJson(w http.ResponseWriter, status int, data interface{}) {
	if data == nil {
		data = &MessageResponse{"success"}
	}

	if err, ok := data.(error); ok {
		data = map[string]string{
			"message": err.Error(),
		}
	}

	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(data); err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	w.Write(buf.Bytes())
}
