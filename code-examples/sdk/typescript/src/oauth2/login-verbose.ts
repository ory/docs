// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"
import { Request, Response } from "express"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

function authenticateUserCredentials(email: string, password: string): any {
  // Example method to authenticate users and fetch them from the DB.
}

// Please note that this is an example implementation.
// In a production app, please add proper error handling.
export async function handleLogin(request: Request, response: Response) {
  const challenge = request.query.login_challenge.toString()
  const { data: loginRequest } = await ory.getOAuth2LoginRequest({
    loginChallenge: challenge.toString(),
  })

  if (loginRequest.skip) {
    // User is already authenticated, don't show the login form and simply accept the login request.
    await ory
      .acceptOAuth2LoginRequest({
        loginChallenge: challenge,
        acceptOAuth2LoginRequest: {
          subject: loginRequest.subject,
        },
      })
      .then(({ data }) => response.redirect(data.redirect_to))
    return
  }

  // Show the login form if the form was not submitted.
  if (request.method === "GET") {
    response.render("login", {
      loginRequest,
    })
    return
  }

  // The user did not want to sign in with the given app.
  if (request.body.submit === "Deny access") {
    await ory
      .rejectOAuth2LoginRequest({
        loginChallenge: challenge,
        rejectOAuth2Request: {
          error: "access_denied",
          error_description: "The resource owner denied the request",
        },
      })
      .then(({ data }) => response.redirect(data.redirect_to))
  }

  const user = authenticateUserCredentials(
    request.body.email,
    request.body.password,
  )

  // Check login credentials (e.g. email + password) in your user database.
  if (user!) {
    response.render("login", { error: "invalid credentials", loginRequest })
    return
  }

  // User was authenticated successfully,
  return await ory
    .acceptOAuth2LoginRequest({
      loginChallenge: challenge,
      acceptOAuth2LoginRequest: {
        subject: user.id,
        remember: Boolean(request.body.remember),
        remember_for: 3600,
        context: {
          // You can add any context that you want to be available to the consent endpoint.
        },
      },
    })
    .then(({ data }) => response.redirect(data.redirect_to))
}
