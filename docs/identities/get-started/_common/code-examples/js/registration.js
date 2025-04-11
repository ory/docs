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

// Create a new registration flow
async function createRegistrationFlow(req, res) {
  try {
    // Initialize the registration flow
    const { data: flow } = await ory.createBrowserRegistrationFlow({
      returnTo: "/welcome", // Optional return URL after successful registration
    })

    // Render the form or return the flow data
    res.render("registration", { flow })
  } catch (err) {
    console.error("Error creating registration flow:", err)
    res.status(500).json({ error: "Could not create registration flow" })
  }
}

// Submit registration data
async function submitRegistration(req, res) {
  const flowId = req.body.flow // The flow ID from the form

  try {
    // Submit the form data
    const { data } = await ory.submitSelfServiceRegistrationFlow(flowId, {
      method: "password",
      password: req.body.password,
      traits: {
        email: req.body.email,
        name: req.body.name,
      },
    })

    // Successful registration, redirect user
    res.redirect(data.return_to || "/welcome")
  } catch (err) {
    // Handle errors
    console.error("Registration error:", err.response?.data)

    // Update the flow with the error and render the form again
    res.render("registration", {
      flow: err.response?.data,
      error: err.response?.data?.ui.messages,
    })
  }
}
