package session

import (
	"context"
	"github.com/ory/client-go"
)

func RefreshSession(ctx context.Context, sessionId string) (session *client.Session, err error) {
	// highlight-start
	session, _, err = ory.IdentityApi.ExtendSession(ContextWithToken(ctx), sessionId).
		Execute()
	// highlight-end

	if err != nil {
		return nil, err
	}

	return session, err
}
