// Copyright © 2022 Ory Corp
// SPDX-License-Identifier: Apache-2.0

import { Configuration, OAuth2Api } from "@ory/client"

const ory = new OAuth2Api(
  new Configuration({
    basePath: `https://${process.env.ORY_PROJECT_SLUG}.projects.oryapis.com`,
    accessToken: process.env.ORY_API_KEY,
  }),
)

export async function createTrustRelation(accessToken: string) {
  // highlight-start
  const { data } = await ory.trustOAuth2JwtGrantIssuer({
    trustOAuth2JwtGrantIssuer: {
      // The "allow_any_subject" indicates that the issuer is allowed to have any principal as the subject of the JWT.
      allow_any_subject: true,

      // The "subject" identifies the principal that is the subject of the JWT. It must be unset if `allow_any_subject` is true.
      subject: "some-subject-id",

      // The "expires_at" indicates, when grant will expire, so we will reject assertion from "issuer" targeting "subject".
      expires_at: "2021-04-23T18:25:43.511Z",

      // The "issuer" identifies the principal that issued the JWT assertion (same as "iss" claim in JWT).
      issuer: "https://example.org",

      // The public key with which the JWT's signature can be verified (example)
      jwk: {
        alg: "RS256",
        use: "sig",
        kty: "RSA",
        e: "AQAB",
        kid: "d8e91f55-67e0-4e56-a066-6a5f0c2efdf7",
        n: "nzyis1ZjfNB0bBgKFMSvvkTtwlvBsaJq7S5wA-kzeVOVpVWwkWdVha4s38XM_pa_yr47av7-z3VTmvDRyAHcaT92whREFpLv9cj5lTeJSibyr_Mrm_YtjCZVWgaOYIhwrXwKLqPr_11inWsAkfIytvHWTxZYEcXLgAXFuUuaS3uF9gEiNQwzGTU1v0FqkqTBr4B8nW3HCN47XUu0t8Y0e-lf4s4OxQawWD79J9_5d3Ry0vbV3Am1FtGJiJvOwRsIfVChDpYStTcHTCMqtvWbV6L11BWkpzGXSW4Hv43qa-GSYOD2QU68Mb59oSk2OB-BtOLpJofmbGEGgvmwyCI9Mw",
      },

      // The "scope" contains list of scope values (as described in Section 3.3 of OAuth 2.0 [RFC6749])
      scope: ["read"],
    },
  })
  // highlight-end
}
