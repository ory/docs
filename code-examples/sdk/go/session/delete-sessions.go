package session

import (
	"context"
)

func DisableAndDeleteSessions(ctx context.Context, identityId string) (err error) {
	// highlight-start
	_, err = ory.IdentityApi.DeleteIdentitySessions(ContextWithToken(ctx), identityId).
		Execute()
	// highlight-end
	return err
}
