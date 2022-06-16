package main

import (
	"encoding/json"
	"io"
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUnauthenticated(t *testing.T) {
	resp, err := http.Get("http://127.0.0.1:8080/ws")
	assert.NoError(t, err)
	assert.Equal(t, http.StatusUnauthorized, resp.StatusCode)
}

func TestAuthenticated(t *testing.T) {
	resp, err := http.Get("http://127.0.0.1:4433/self-service/registration/browser")
	assert.NoError(t, err)

	loc := resp.Header.Get("Location")
	resp, err = http.Get(loc)
	assert.NoError(t, err)

	var responseData map[string]interface{}
	data, err := io.ReadAll(resp.Body)
	assert.NoError(t, err)
	err = json.Unmarshal(data, &responseData)
	assert.NoError(t, err)

}
