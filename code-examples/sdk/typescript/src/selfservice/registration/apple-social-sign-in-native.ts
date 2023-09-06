import * as AppleAuthentication from "expo-apple-authentication"
import * as Crypto from "expo-crypto"
import * as Random from "expo-random"

async function signInWithApple() {
  const nonce = Random.getRandomBytes(16).toString()

  const digest = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    nonce,
  )
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
    ],
    nonce: digest,
  })

  return orySdk.updateRegistrationFlow({
    flow: flow.id,
    updateRegistrationFlowBody: {
      provider: "apple",
      id_token: credential.identityToken,
      raw_id_token_nonce: nonce,
      traits: {
        name: {
          first: credential.fullName?.givenName || "given name", // When developing, these values might be empty
          last: credential.fullName?.familyName || "last name", // When developing, these values might be empty
        },
      },
    },
  })
}
