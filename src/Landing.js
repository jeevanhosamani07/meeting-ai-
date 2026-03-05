import "./Landing.css"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-container">

      {/* Navbar */}
      <nav className="navbar">
        <h2 className="logo">MeetingAI</h2>
        <div>
          <button className="nav-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <motion.div
  className="hero-text"
  initial={{ opacity: 0, y: 40 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
  >
          <h1>
            Turn Meetings into <span>Actionable Insights</span>
          </h1>

          <p>
            AI-powered meeting intelligence that converts transcripts into
            summaries, key decisions, and action items in seconds.
          </p>

          <div className="hero-buttons">
            <button
              className="primary-btn"
              onClick={() => navigate("/login")}
            >
              Get Started Free
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/dashboard")}
            >
              View Demo
            </button>
          </div>
        </motion.div>

        <motion.div
  className="hero-preview"
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, delay: 0.3 }}
>
          <h3>AI Output</h3>
          <p><strong>Summary:</strong> Discussed product launch timeline and responsibilities.</p>
          <p><strong>Action Items:</strong></p>
          <ul>
            <li>Finalize release date</li>
            <li>Prepare marketing plan</li>
            <li>Schedule next meeting</li>
          </ul>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Why MeetingAI?</h2>

        <div className="feature-grid">
          <div className="feature-card">
            <h3>AI Summaries</h3>
            <p>Convert long meetings into short, clear summaries instantly.</p>
          </div>

          <div className="feature-card">
            <h3>Action Items</h3>
            <p>Automatically extract tasks and responsibilities.</p>
          </div>

          <div className="feature-card">
            <h3>Save Time</h3>
            <p>Reduce manual note-taking and focus on important work.</p>
          </div>

          <div className="feature-card">
            <h3>Secure Login</h3>
            <p>Email & Google authentication powered by Supabase.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2026 MeetingAI — Built with GenAI</p>
      </footer>

    </div>
  )
}

export default Landing