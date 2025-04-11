const { Configuration, FrontendApi } = require("@ory/client")

// Initialize the SDK
const ory = new FrontendApi(
  new Configuration({
    basePath: "https://$PROJECT_SLUG.projects.oryapis.com",
    baseOptions: {
      withCredentials: true,
    },
  }),
)

// Create a new login flow
async function createLoginFlow(req, res) {
  try {
    // Initialize the login flow
    const { data: flow } = await ory.createBrowserLoginFlow({
      returnTo: "/dashboard", // Optional return URL after successful login
      refresh: false, // Set to true to refresh an existing login session
    })

    // Render the form or return the flow data
    res.render("login", { flow })
  } catch (err) {
    console.error("Error creating login flow:", err)
    res.status(500).json({ error: "Could not create login flow" })
  }
}

// Submit login data
async function submitLogin(req, res) {
  const flowId = req.body.flow // The flow ID from the form

  try {
    // Submit the form data
    const { data } = await ory.submitSelfServiceLoginFlow(flowId, {
      method: "password",
      identifier: req.body.identifier, // Username or email
      password: req.body.password,
    })

    // Successful login, redirect user
    res.redirect(data.return_to || "/dashboard")
  } catch (err) {
    // Handle errors
    console.error("Login error:", err.response?.data)

    // Update the flow with the error and render the form again
    res.render("login", {
      flow: err.response?.data,
      error: err.response?.data?.ui.messages,
    })
  }
}
