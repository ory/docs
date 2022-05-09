package main

import (
	"net/http"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestUnauthenticated(t *testing.T) {
	resp, err := http.Get("http://127.0.0.1:8080/ws")
	assert.NoError(t, err)
	assert.Equal(t, http.StatusUnauthorized, resp.StatusCode)
}
