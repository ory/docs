package session

import (
	"context"
)

func GetIdentitySessions(ctx context.Context, identityId string, pageNumber int64, perPage int64) (err error) {
	// highlight-start
	_, _, err = ory.IdentityApi.ListIdentitySessions(ContextWithToken(ctx), identityId).
		Page(pageNumber). // Optional  -  page number
		PerPage(perPage). // Optional - number of sessions per page
		Active(true).     // Optional - used to filter result for active or inactive sessions; not setting this returns all sessions
		Execute()
	// highlight-end
	return err
}
