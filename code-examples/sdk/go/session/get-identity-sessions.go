package session

import (
	"context"
	"github.com/ory/client-go"
)

func GetIdentitySessions(ctx context.Context, identityId string, pageNumber int64, perPage int64) (sessions []client.Session, err error) {
	// highlight-start
	sessions, _, err = ory.IdentityApi.ListIdentitySessions(ContextWithToken(ctx), identityId).
		Page(pageNumber). // Optional  -  page number
		PerPage(perPage). // Optional - number of sessions per page
		Active(true).     // Optional - used to filter result for active or inactive sessions; not setting this returns all sessions
		Execute()
	// highlight-end

	if err != nil {
		return nil, err
	}

	return sessions, err
}
