async function login(req, res) {
  try {
    // ... login code ...
  } catch (err) {
    if (err.response?.status === 400) {
      // Validation errors (wrong password, etc.)
      const errorMessages = err.response.data.ui.messages || []
      res.render("login", {
        flow: err.response.data,
        error: errorMessages.map((msg) => msg.text).join(", "),
      })
    } else if (err.response?.status === 410) {
      // Flow expired
      res.redirect("/login") // Create a new flow
    } else if (err.response?.status === 401) {
      // Unauthorized
      res.redirect("/login?error=invalid_credentials")
    } else {
      // Server error
      console.error("Unexpected error:", err)
      res
        .status(500)
        .render("error", { message: "An unexpected error occurred" })
    }
  }
}
