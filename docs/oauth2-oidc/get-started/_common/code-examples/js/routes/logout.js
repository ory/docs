// Logout route
app.get("/logout", (req, res) => {
  // Clear session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err)
    }
    res.redirect("/")
  })
})
