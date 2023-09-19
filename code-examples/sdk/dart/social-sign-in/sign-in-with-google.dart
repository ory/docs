import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:one_of/one_of.dart';
import 'package:ory_client/ory_client.dart';

class SignInWithGoogleButton extends StatelessWidget {
  final String flowId;
  final OryClient ory;

  // highlight-start
  final GoogleSignIn _googleSignIn = GoogleSignIn(
    scopes: [
      'email',
      // Add additional scopes, if you require that data in your Jsonnet mapping
    ],
  );
  // highlight-end

  SignInWithGoogleButton({super.key, required this.flowId, required this.ory});

  // highlight-start
  void handleGoogleSignIn(GoogleSignInAccount? value) {
    value?.authentication.then((value) {
      var idToken = value.idToken;
      if (idToken == null) {
        // If we end up here, but there is no ID token, something went wrong
        print("No idToken found");
        return;
      }

      // Create the payload for the updateRegistrationFlow endpoint with the idToken from Google
      var body = UpdateRegistrationFlowWithOidcMethod(
        (b) => b
          ..idToken = idToken
          ..method = 'oidc'
          ..provider = 'google',
      );

      // Submit the updateRegistrationFlow endpoint with the payload
      ory.getFrontendApi().updateRegistrationFlow(
            flow: flowId,
            updateRegistrationFlowBody: UpdateRegistrationFlowBody(
                (b) => b..oneOf = OneOf.fromValue1(value: body)),
          );
    });
  }
  // highlight-end

  @override
  Widget build(BuildContext context) {
    return TextButton(
      child: const Text("Sign in with Google"),
      onPressed: () => {_googleSignIn.signIn().then(handleGoogleSignIn)},
    );
  }
}
