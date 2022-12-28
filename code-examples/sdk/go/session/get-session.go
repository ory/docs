// hide-lines-start
package session

import (
	"context"
	"github.com/ory/client-go"
)

// hide-lines-end

func GetSession(ctx context.Context, sessionId string, expandOptions []string) (session *client.Session, err error) {
	// highlight-start
	session, _, err = ory.IdentityApi.GetSession(ContextWithToken(ctx), sessionId).
		Expand(expandOptions).
		Execute()
	// highlight-end

	if err != nil {
		return nil, err
	}

	return session, err
}
