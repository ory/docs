---
id: jwks
title: Cryptographic key management and JSON Web Key Sets (JWKS)
sidebar_label: Cryptographic key management
---

Cryptographic keys play a vital role in securing the transmission of sensitive information. In the context of Ory OAuth2 and
OpenID Connect, cryptographic keys are used to sign and verify ID tokens and JWT access tokens.

The two most commonly used cryptographic keys in Ory are RS256 and ES256. RS256 is an asymmetric cryptographic algorithm that
generates a public key and a private key. The private key is used to sign the token, while the public key is used to verify its
signature. ES256, on the other hand, is a variant of the elliptic curve algorithm, which is more efficient than RSA.

## JSON Web Keys

JSON Web Keys (JWKs) are a JSON data structure that represents a cryptographic key, as specified in IETF RFC7517.

| Item                    | Description                                             |
| ----------------------- | ------------------------------------------------------- |
| JSON Web Key (JWK)      | A JSON object that represents a cryptographic key.      |
| JSON Web Key Set (JWKS) | A JSON object that represents a set of JSON Web Key(s). |

JWKs are used to represent public and private keys in a standard format that is widely supported across all languages. Here is an
example of a JWKS with both private and public keys included:

```
{
    "keys": [
        {
            "p": "8cs6LVWfWM3_TOQZdNWG09sqq8qGbuSejp3rcvDedVh_NAO9D5byE7cpdM2_4_enh1wXoUzzpL0MSHFLAAErJywKLUgyGmjdmJdA7IFuOV4lPNydcSuyyHm4pXVSc_ZtB0MfVPdAh1TO5zyjkk5IbIC8IYOICI1dxu8namdP5MM",
            "kty": "RSA",
            "q": "uK9v3Hp3X_FESMl3Tbv1ZF-7-oAwdpSq_hMnzb0CCVJ1nVK7cs4RtYhZoVLDlPg98oe35HGjemdrk_WVduUH3H2wbbK0bE9v_yG-WPor4GPhxmmw8e7KV0qkOK3y2x8gC0P2IlY7PpuxfOIHl-z9PFaddfXxQaNOym_naiK1jnc",
            "d": "cGVslzyvoWR487B2gXnrg3MPFFFpyD4a7epTKFa7baGd_5oBxHDgZrZcYW6wrlHNuN_ZDXucNneZeg7m5ZLUG6Uz9cYh7aBmOXiAU3Ag7ImFEVMSIKUHSGq83eKsLS8hiowEx9LeinGHr8gEHYJ9JqYV8yZOuc0_V3MQuZnCi6Xg_WmYRN8eMBV8jPKIILQX10ifrgkVSF3xXi11jN1fUiC17xCRyUArWM7c22CfONhxIXp4inGzJjoNMU7BhLJnpdgBpm9RCmNESRP2U0Yhd659upFv9NFFWmSILTwFkdYW5puaVfkHBIZV7_g5OJV7DsE2Cti5jv3SLk4CyCj68Q",
            "e": "AQAB",
            "use": "sig",
            "kid": "ory-example",
            "qi": "4Ji4_LTZURiRJBp72ULUbEIukrXwigrGKqIMKA7M2fYB6PlZ5RjxNsdGrTttaMzKyHdDPQWY01fBNzWvaZCNndUu-PsjDj2tO0a-EfRys4onIeV0srSfk7QXlH-u-gCqYulEvMDXSDrzjW8HBq4n3Z94GeZxa5kE0XD13qf89NU",
            "dp": "ofZKivFuonKiD2Q_NQaOoLyPEbHAaOmU190qSLzVlm7oDfRvINEwaEppZ4cmgVJzknT6kx5TmcbUQnY5EdC2ki-qxXg1r4EM5lhysbllFuJcOS9h-tuVjzoRmCtFRs4LbDDm_Of9_mitizEQNEFhu-RjoGNVrLzc0xOBKIH5fzc",
            "alg": "RS256",
            "dq": "H71OzSZi46M0KAovrbVSu_hT9v4W1hpAtL-YBJyp_-4i9nGkc1uE4ZzYQohVwoFTLB409VauULf7XgdDs5Yy3qrfKksfBMo2JjOnYeVEqyCfSZkaZsmyDoRuaqtCZHQZ7rW0VDxbnCvnud2ijnKVJsx_7SjiWHR3cwT-UVg7uYs",
            "n": "rm_FZLcTUKdiCnv5zc5284DBQ2RO0f-VLpD4CcJ6Y3Po0zYoMiniOCdmTn1I5klau6BfVQWpDfdqV-G-HhRhLpdDy30Zs-t1veN-YxXgBOnF6neqww5tivwtJ--SS5S2m4UyiNxqlWy4-1FttpCKwu-Dm8d2Q7ppUal6wQojGOnCje8P499a0x9JjMZbh0DcUke2mn_ScmVTV8IEC7caMyo3D_HVdaMuNDN2N2O-7fRUJTVn8pgsjUfw1xP8tB-8-k6rK07X9yi_-oUyXqaqj8IhCPNMOc1UaQbrY3vvdMarQQrykkyXDPp6IL4vA3dw8q46BJvfLRsOCa1g-uaApQ"
        }
    ]
}
```

:::note

If you are interested in experimenting with a JWK generator, try the [mkjwk](https://mkjwk.org/) generator. Use the service for
experimentation only. Don't use it to generate keys for the production environment.

:::

### Public key only

Here is an example of a JWKS including only the public key:

```
{
    "kty": "RSA",
    "e": "AQAB",
    "use": "sig",
    "kid": "ory-example",
    "alg": "RS256",
    "n": "rm_FZLcTUKdiCnv5zc5284DBQ2RO0f-VLpD4CcJ6Y3Po0zYoMiniOCdmTn1I5klau6BfVQWpDfdqV-G-HhRhLpdDy30Zs-t1veN-YxXgBOnF6neqww5tivwtJ--SS5S2m4UyiNxqlWy4-1FttpCKwu-Dm8d2Q7ppUal6wQojGOnCje8P499a0x9JjMZbh0DcUke2mn_ScmVTV8IEC7caMyo3D_HVdaMuNDN2N2O-7fRUJTVn8pgsjUfw1xP8tB-8-k6rK07X9yi_-oUyXqaqj8IhCPNMOc1UaQbrY3vvdMarQQrykkyXDPp6IL4vA3dw8q46BJvfLRsOCa1g-uaApQ"
}
```

## Default cryptographic keys in Ory

By default, Ory OAuth2 and OpenID Connect generates two cryptographic keys for each Ory Network project: one for ID Tokens and one
for JWT Access Tokens. The keys are stored securely and encrypted at rest using AES256-GCM and the system secret.

## How to rotate cryptographic keys

It is recommended to rotate cryptographic keys regularly to ensure maximum security. To rotate cryptographic keys in Ory, you can
use the JSON Web Keys API, which provides endpoints for generating and managing JWKs.

### Rotate OpenID Connect ID token keys

```
ory create jwks \
  --alg RS256 \
  hydra.openid.id-token
```

### Rotate OAuth 2.0 access token JWT keys

```
ory create jwks \
  --alg RS256 \
  hydra.jwt.access-token
```

## The role of `/.well-known/jwks.json`

The `/.well-known/jwks.json` file is a standard endpoint that contains the public keys for verifying ID tokens and JWT access
tokens. Ory OAuth2 and OpenID Connect exposes this endpoint by default for each Ory Network project at:

```
https://$PROJECT_SLUG.projects.oryapis.com/.well-known/jwks.json
```
