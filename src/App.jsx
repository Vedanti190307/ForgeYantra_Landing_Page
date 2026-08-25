import { useState } from "react";
import "./App.css";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const roles = [
    {
      title: "Full Stack Development",
      category: "development",
      icon: "💻",
      description:
        "Build modern web applications using frontend and backend technologies."
    },
    {
      title: "Web Development",
      category: "development",
      icon: "🌐",
      description:
        "Create responsive and user-friendly websites with modern technologies."
    },
    {
      title: "Graphic Design",
      category: "design",
      icon: "🎨",
      description:
        "Design creative graphics, social media content and visual experiences."
    },
    {
      title: "UI/UX Design",
      category: "design",
      icon: "✨",
      description:
        "Design intuitive interfaces and engaging user experiences."
    },
    {
      title: "Data Analytics",
      category: "data",
      icon: "📊",
      description:
        "Analyze data and create meaningful insights and dashboards."
    },
    {
      title: "Digital Marketing",
      category: "marketing",
      icon: "📱",
      description:
        "Learn SEO, social media marketing and digital growth strategies."
    }
  ];

  const [filter, setFilter] = useState("all");

  const filteredRoles =
    filter === "all"
      ? roles
      : roles.filter((role) => role.category === filter);

  const handleApply = (role) => {
    setSelectedRole(role);
    document
      .getElementById("contact")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className={darkMode ? "app dark" : "app light"}>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="nav-container">

          <a href="#home" className="logo">
            Forge<span>Yantra</span>
          </a>

          <div className={`nav-links ${menuOpen ? "open" : ""}`}>
            <a href="#home" onClick={() => setMenuOpen(false)}>
              Home
            </a>

            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>

            <a href="#internships" onClick={() => setMenuOpen(false)}>
              Internships
            </a>

            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>

            <button
              className="nav-apply"
              onClick={() => {
                setMenuOpen(false);
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Apply Now
            </button>
          </div>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>

        </div>
      </nav>

      {/* HERO */}
      <header id="home" className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            🚀 Student Internship Program 2026
          </div>

          <h1>
            Build Your Future.
            <br />
            <span>Forge Your Career.</span>
          </h1>

          <p>
            Gain real-world experience, work on exciting projects,
            and learn from industry professionals through
            ForgeYantra internships.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() =>
                document
                  .getElementById("internships")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Explore Internships →
            </button>

            <button
              className="secondary-btn"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Learn More
            </button>

          </div>

          <div className="hero-stats">
            <div>
              <strong>500+</strong>
              <span>Students</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Internship Tracks</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Learning Focused</span>
            </div>
          </div>

        </div>

        <div className="hero-visual">

          <div className="floating-card card-one">
            💻
            <span>Build</span>
          </div>

          <div className="hero-circle">
            <div className="circle-inner">
              FY
            </div>
          </div>

          <div className="floating-card card-two">
            🚀
            <span>Grow</span>
          </div>

          <div className="floating-card card-three">
            ⭐
            <span>Learn</span>
          </div>

        </div>

      </header>

      {/* ABOUT */}
      <section id="about" className="section about-section">

        <div className="section-heading">
          <span>WHY FORGEYANTRA?</span>
          <h2>Turn Knowledge Into Experience</h2>
          <p>
            We help students bridge the gap between academic
            learning and real-world industry experience.
          </p>
        </div>

        <div className="feature-grid">

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Real Projects</h3>
            <p>
              Work on practical projects that help you
              understand how technology is used in industry.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">👨‍💻</div>
            <h3>Industry Skills</h3>
            <p>
              Develop technical and professional skills
              that companies actually look for.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🏆</div>
            <h3>Career Growth</h3>
            <p>
              Build your portfolio, strengthen your resume
              and become placement ready.
            </p>
          </div>

        </div>

      </section>

      {/* INTERNSHIPS */}
      <section id="internships" className="section internship-section">

        <div className="section-heading">
          <span>OPPORTUNITIES</span>
          <h2>Choose Your Internship Track</h2>
          <p>
            Explore our internship opportunities and find
            the right path for your career.
          </p>
        </div>

        <div className="filter-buttons">

          {["all", "development", "design", "data", "marketing"].map(
            (item) => (
              <button
                key={item}
                className={filter === item ? "active" : ""}
                onClick={() => setFilter(item)}
              >
                {item === "all"
                  ? "All"
                  : item.charAt(0).toUpperCase() + item.slice(1)}
              </button>
            )
          )}

        </div>

        <div className="role-grid">

          {filteredRoles.map((role) => (

            <div className="role-card" key={role.title}>

              <div className="role-icon">
                {role.icon}
              </div>

              <div className="role-tag">
                Internship
              </div>

              <h3>{role.title}</h3>

              <p>{role.description}</p>

              <button
                className="apply-role-btn"
                onClick={() => handleApply(role.title)}
              >
                Apply for this Role →
              </button>

            </div>

          ))}

        </div>

      </section>

      {/* CONTACT / APPLICATION */}
      <section id="contact" className="section contact-section">

        <div className="section-heading">
          <span>GET STARTED</span>
          <h2>Apply for an Internship</h2>
          <p>
            Take the first step toward building your career.
          </p>
        </div>

        {!submitted ? (

          <form className="application-form" onSubmit={handleSubmit}>

            <div className="form-row">

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </div>

            </div>

            <div className="form-row">

              <div className="form-group">
                <label>Phone Number *</label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Internship Track *</label>

                <select
                  value={selectedRole}
                  onChange={(e) =>
                    setSelectedRole(e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select an internship
                  </option>

                  {roles.map((role) => (
                    <option
                      value={role.title}
                      key={role.title}
                    >
                      {role.title}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            <div className="form-group">
              <label>Portfolio / GitHub URL</label>
              <input
                type="url"
                placeholder="https://github.com/username"
              />
            </div>

            <div className="form-group">
              <label>Why should we select you? *</label>

              <textarea
                rows="5"
                placeholder="Tell us briefly about yourself..."
                required
              ></textarea>
            </div>

            <button className="submit-btn" type="submit">
              Submit Application 🚀
            </button>

          </form>

        ) : (

          <div className="success-card">

            <div className="success-icon">
              ✓
            </div>

            <h2>Application Submitted!</h2>

            <p>
              Thank you for applying to ForgeYantra.
              Our team will get back to you soon.
            </p>

            <button
              className="secondary-btn"
              onClick={() => setSubmitted(false)}
            >
              Submit Another Application
            </button>

          </div>

        )}

      </section>

      {/* FOOTER */}
      <footer>

        <div className="footer-logo">
          Forge<span>Yantra</span>
        </div>

        <p>
          Empowering students. Building careers.
        </p>

        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#internships">Internships</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="copyright">
          © 2026 ForgeYantra. All rights reserved.
        </div>

      </footer>

      {/* BACK TO TOP */}
      <button
        className="back-top"
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          })
        }
      >
        ↑
      </button>

    </div>
  );
}

export default App;