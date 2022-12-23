package session

import (
	"context"
)

func GetSessions(ctx context.Context, pageToken string, perPage int64) (err error) {
	// highlight-start
	_, _, err = ory.IdentityApi.ListSessions(ContextWithToken(ctx)).
		PageToken(pageToken). // Optional - token id
		PageSize(perPage).    // Optional - number of sessions per page
		Active(true).         // Optional - used to filter result for active or inactive sessions; not setting this returns all sessions
		Execute()
	// highlight-end
	return err
}
