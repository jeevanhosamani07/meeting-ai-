import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { supabase } from "./supabaseClient"
import "./Login.css"

function Login() {
  const navigate = useNavigate()

  // Check if user is already logged in
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [message, setMessage] = useState("")
  useEffect(() => {
  const checkUser = async () => {
    const { data } = await supabase.auth.getSession()

    if (data.session) {
      navigate("/dashboard")
    }
  }

  checkUser()
}, [navigate])

  // Signup
  const handleSignup = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) setMessage(error.message)
    else setMessage("Signup successful! Check your email.")
  }

  // Login
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setMessage(error.message)
    else setMessage("Login successful!")
  }

  // Forgot password
  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) setMessage(error.message)
    else setMessage("Password reset email sent")
  }

  // Google OAuth Login
  const handleGoogleLogin = async () => {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  })

  if (error) {
    setMessage(error.message)
  }
}

return (
  <div className="container">
    <div className="login-card">
      <h2>Meeting Intelligence</h2>
      <p className="subtitle">
        Turn meetings into summaries & action items using AI
      </p>

      <input
        type="email"
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter your password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <div className="button-group">
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>
        <button className="signup-btn" onClick={handleSignup}>
          Sign Up
        </button>
      </div>
      <button className="google-btn" onClick={handleGoogleLogin}>
  <img
    className="google-icon"
    src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
    alt="google"
  />
  Continue with Google
</button>

      <button className="forgot-btn" onClick={handleForgotPassword}>
        Forgot Password?
      </button>

      <p className="message">{message}</p>
    </div>
  </div>
)
}

export default Login