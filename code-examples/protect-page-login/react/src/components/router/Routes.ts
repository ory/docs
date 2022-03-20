// ??? any ideas on how we can improve the duplicated routes

export const Routes = {
  root: "/",
  loggedIn: "logged-in",
  notFound: "*",
  auth: "/.ory",
  loginInitialize: "self-service/login/browser",
  login: "auth/login",
  registrationInitialize: "self-service/registration/browser",
  registration: "auth/registration",
  recoveryInitialize: "self-service/recovery/browser",
  recovery: "auth/recovery",
  verificationInitialize: "self-service/verification/browser",
  verification: "auth/verification",
  errorInitialize: "self-service/errors",
  error: "auth/error",
  settingsInitialize: "/self-service/settings/browser",
  settings: "auth/settings",
}
