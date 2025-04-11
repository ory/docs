const handleSubmitLogin = async (flowId, formData) => {
  try {
    // Submit the login data
    const { data } = await ory.submitSelfServiceLoginFlow(flowId, formData)
    // Success - redirect to return_to or dashboard
    window.location.href = data.return_to || "/dashboard"
  } catch (err) {
    if (err.response?.status === 400) {
      // Validation errors (wrong password, etc.)
      // Update the flow with the error data
      setFlow(err.response.data)
      setError(err.response.data.ui.messages?.map((msg) => msg.text).join(", "))
    } else if (err.response?.status === 410) {
      // Flow expired - create a new one
      window.location.href = "/login"
    } else if (err.response?.status === 401) {
      // Unauthorized
      setError("Invalid username or password")
    } else {
      // Server error
      console.error("Unexpected error:", err)
      setError("An unexpected error occurred")
    }
  }
}
