package session

import (
	"context"
)

func GetSession(ctx context.Context, sessionId string, expanOptions []string) (err error) {
	// highlight-start
	_, _, err = ory.IdentityApi.GetSession(ContextWithToken(ctx), sessionId).
		Expand(expanOptions).
		Execute()
	// highlight-end
	return err
}
