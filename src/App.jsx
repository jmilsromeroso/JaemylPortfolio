import { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';

// ── Configuration Data ────────────────────────────────
const NAV_LINKS = ["Home", "Objective", "Information", "Project", "Contact"];

const SKILLS = [
  { label: "Language", detail: "Python, HTML, CSS" },
  { label: "Networking", detail: "LAN / WAN" },
  { label: "Data Analytics", detail: "Python" },
  { label: "Operating System & Hardware", detail: "Windows, Linux; troubleshoot & install" },
  { label: "Communication", detail: "Written, Verbal, Active Listening, Presentation" },
  { label: "Problem Solving", detail: "Analyzing issues, logical decision-making" },
  { label: "Collaborative", detail: "Working effectively with others, conflict resolution" },
  { label: "Time Management", detail: "Prioritizing tasks, meeting deadlines" },
  { label: "Adaptability & Flexibility", detail: "Adjusting to new tech and changing priorities" },
];

const EXPERIENCE = [
  {
    role: "IT Intern (Technical Support & Systems Administration)",
    company: "Liberty Investigation and Security Agency Inc.",
    year: "January 2026 – April 2026",
    desc: "Managed workstation maintenance, troubleshooting technical issues, and assisted in systems administration tasks.",
  },
  {
    role: "Student Assistant(S.A)",
    company: "Global Reciprocal Colleges",
    year: "January 2021 – April 2025",
    desc: "I provided administrative and student support by assisting faculty with the organization and auditing of student files, facilitating access to academic resources, and managing the library's circulation processes for book check-outs and returns. Additionally, I oversaw front-desk operations, including the precise monitoring and record-keeping of daily and weekly attendance logs.",
  },
  {
    role: "Marketing Volunteer",
    company: "Actec Caloocan",
    year: "2019 – 2020",
    desc: "As an IT Intern, I executed telemarketing and outreach campaigns to recruit prospective students, conducted school visitations to encourage Grade 11 enrollment, and performed comprehensive audits of student documentary records to ensure accuracy and compliance.",
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Science in Information Technology",
    school: "Global Reciprocal Colleges",
    year: "2021 – 2026",
    desc: "Focused on software development, Cisco networking infrastructure, and UI/UX design principles.",
  },
  {
    degree: "Senior High School – ICT Strand",
    school: "ACTEC Caloocan",
    year: "2019 – 2020",
    desc: "Specialized in Information and Communications Technology fundamentals.",
  },
];

const PROJECTS = [
  {
    title: "RCE Website",
    desc: "A comprehensive college portal website built with modern web technologies.",
    tags: ["HTML", "CSS", "JavaScript"],
    color: "#3b4fd8",
    image: "img/Screenshot 2026-04-26 162527.png",
    link: "https://rce-webpage.vercel.app" 
  },
  {
    title: "Liberty Website",
    desc: "Redesigned version with improved UI/UX and responsive layout.",
    tags: ["React", "Node.js", "CSS"],
    color: "#1a237e",
    image: "img/Screenshot 2026-04-27 112343.png",
    link: "https://libertysecurityph.com/"
  },
];

const TABS = [
  { key: "skills", label: "Skills" },
  { key: "experience", label: "Experience" },
  { key: "education", label: "Education" },
];

// ── Hooks ──────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ── Components ─────────────────────────────────────────
function Navbar({ active, setActive }) {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (link) => {
    setActive(link);
    setIsOpen(false);
  };

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(10,10,30,0.97)" : "rgba(10,10,30,0.85)",
      backdropFilter: "blur(18px)",
      borderBottom: scrolled ? "1px solid rgba(80,100,255,0.18)" : "1px solid transparent",
      transition: "all 0.35s ease",
      padding: "0 clamp(1rem,5vw,3rem)",
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 62 }}>
        <a href="#home" onClick={() => setActive("Home")} style={{ textDecoration: "none" }}>
          <span style={{ fontFamily: "'Orbitron', sans-serif", fontWeight: 800, fontSize: "1.15rem", color: "#fff", letterSpacing: 2 }}>
            JR<span style={{ color: "#5c6ff5" }}>.</span>
          </span>
        </a>

        {/* Mobile Toggle Button */}
        <div className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} style={{ cursor: 'pointer', color: '#fff', fontSize: '1.5rem', display: 'none' }}>
          <i className={isOpen ? "fas fa-times" : "fas fa-bars"}></i>
        </div>

        <div style={{ display: "flex", gap: "2rem", alignItems: "center" }} className={`nav-links ${isOpen ? "open" : ""}`}>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`}
              onClick={() => handleClick(link)}
              style={{
                fontFamily: "'Syne', sans-serif", fontSize: "0.85rem", fontWeight: 600,
                letterSpacing: 1.5, textTransform: "uppercase",
                color: active === link ? "#8b9fff" : "rgba(255,255,255,0.65)",
                textDecoration: "none", transition: "color 0.25s",
                borderBottom: active === link ? "2px solid #5c6ff5" : "2px solid transparent",
                paddingBottom: 2,
              }}>
              {link}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  const profileImageUrl = "img/Image_jmil.png";

  const heroSocialIcon = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "45px",
    height: "45px",
    borderRadius: "8px",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.2rem",
    background: "rgba(0,0,0,0.2)",
    transition: "0.3s ease"
  };

  return (
    <section id="home" style={{
      minHeight: "100vh", background: "linear-gradient(135deg, #08081e 0%, #0d0d2b 40%, #111135 70%, #0a0a20 100%)",
      display: "flex", alignItems: "center", position: "relative", overflow: "hidden",
      paddingTop: 80, paddingBottom: 40
    }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(91,111,245,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(91,111,245,0.06) 1px, transparent 1px)", backgroundSize: "60px 60px", pointerEvents: "none" }} />
      <div className="hero-container" style={{ maxWidth: 1200, margin: "0 auto", padding: "0 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%", position: "relative", zIndex: 1 }}>
        <div style={{ flex: 1, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(30px)", transition: "all 0.8s cubic-bezier(.22,.68,0,1.2)" }}>
          <p style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", color: "#fff", marginBottom: "0.5rem", fontWeight: 700 }}>Hello, I'm</p>
          <h1 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: "clamp(2.5rem,8vw,6rem)", fontWeight: 900, color: "#fff", margin: "0 0 0.5rem", lineHeight: 1 }}>Jaemyl Romeroso</h1>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.1rem,2.5vw,1.8rem)", color: "#fff", fontWeight: 700, margin: "0 0 1.5rem" }}>Developer & UI | UX Designer</h2>
          
          <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.7)", maxWidth: "450px", lineHeight: "1.6", marginBottom: "2rem", fontSize: "1rem" }}>
            Innovator at heart, transforming complex ideas into intuitive digital realities with a modern tech stack.
          </p>

          <a href="#contact" className="hire-btn" style={{ 
            display: "inline-block", 
            fontFamily: "'Syne', sans-serif", 
            fontWeight: 700, 
            padding: "1rem 2.5rem", 
            background: "#1c1f6e", 
            color: "#fff", 
            textDecoration: "none", 
            borderRadius: "12px", 
            border: "1px solid #3b4fd8",
            marginBottom: "2.5rem",
            transition: "0.3s ease" 
          }}>HIRE ME NOW!</a>

          <div style={{ display: "flex", gap: "1rem" }}>
            <a href="https://www.facebook.com/LimjPitikTV" target="_blank" rel="noopener noreferrer" style={heroSocialIcon}><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer" style={heroSocialIcon}><i className="fab fa-instagram"></i></a>
            <a href="https://www.linkedin.com/in/jaemyl-racso-romeroso-94470834b/" target="_blank" rel="noopener noreferrer" style={heroSocialIcon}><i className="fab fa-linkedin"></i></a>
          </div>
        </div>
        <div className="hero-image" style={{ opacity: loaded ? 1 : 0, transition: "all 0.9s ease 0.2s" }}>
          <div style={{ width: "clamp(220px,25vw,340px)", height: "clamp(280px,32vw,430px)", borderRadius: "50% 50% 50% 50% / 60% 60% 40% 40%", backgroundImage: `url(${profileImageUrl})`, backgroundSize: "cover", backgroundColor: "#1c1f6e", boxShadow: "0 30px 80px rgba(60,80,220,0.35)" }} />
        </div>
      </div>
    </section>
  );
}

function Objective() {
  const [ref, inView] = useInView();
  return (
    <section id="objective" ref={ref} style={{ background: "#0e0e28", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,4rem)" }}>
      <div style={{ maxWidth: 900, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
        <p style={{ fontFamily: "'Orbitron', sans-serif", color: "#5c6ff5", fontSize: "0.7rem", letterSpacing: 5, textTransform: "uppercase", marginBottom: "0.75rem" }}>Purpose</p>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "#fff", marginBottom: "2rem" }}>OBJECTIVE</h2>
        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.65)", fontSize: "clamp(1rem,1.8vw,1.15rem)", lineHeight: 1.9, maxWidth: 780 }}>
          I'm a hardworking individual looking for a challenging position where I can showcase my skills and contribute to the growth of the organization. I would like to enhance my technical and soft skills by taking up challenging assignments and expanding my knowledge.
        </p>
      </div>
    </section>
  );
}

function Information() {
  const [tab, setTab] = useState("skills");
  const [ref, inView] = useInView();

  return (
    <section id="information" ref={ref} style={{ background: "#0a0a1e", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,4rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "3rem" }} className="info-grid">
          <div style={{ background: "#1c1f6e", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(60,80,220,0.2)", height: "fit-content" }}>
            <img src="img/Image_jmil.png" alt="Detail" style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ background: "#5c6ff5", borderRadius: "8px 8px 0 0", padding: "1rem 1.5rem" }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", fontSize: "1.3rem", margin: 0 }}>Information</h2>
            </div>
            <div style={{ background: "#13133a", borderRadius: "0 0 12px 12px", padding: "1.5rem" }}>
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                {TABS.map(t => (
                  <button key={t.key} onClick={() => setTab(t.key)} style={{
                    fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.8rem", padding: "0.5rem 1.1rem", border: "none", borderRadius: 4, cursor: "pointer",
                    background: tab === t.key ? "#5c6ff5" : "rgba(92,111,245,0.12)", color: tab === t.key ? "#fff" : "rgba(255,255,255,0.5)", transition: "all 0.25s",
                  }}>
                    {t.label}
                  </button>
                ))}
              </div>
              <div style={{ animation: "fadeIn 0.4s ease" }}>
                {tab === "skills" && (
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {SKILLS.map((s, i) => (
                      <li key={i} style={{ display: "flex", gap: "0.75rem", marginBottom: "0.9rem" }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#5c6ff5", marginTop: 7, flexShrink: 0 }} />
                        <div>
                          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "#fff", fontSize: "0.85rem" }}>{s.label}: </span>
                          <span style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.55)", fontSize: "0.85rem" }}>{s.detail}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
                {tab === "experience" && (
                  <div>
                    {EXPERIENCE.map((exp, i) => (
                      <div key={i} style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "2px solid #5c6ff5" }}>
                        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", margin: "0 0 0.2rem", fontSize: "0.9rem" }}>{exp.role}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8b9fff", margin: "0 0 0.4rem", fontSize: "0.82rem" }}>{exp.company} · {exp.year}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "0.82rem", lineHeight: 1.6 }}>{exp.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
                {tab === "education" && (
                  <div>
                    {EDUCATION.map((edu, i) => (
                      <div key={i} style={{ marginBottom: "1.5rem", paddingLeft: "1rem", borderLeft: "2px solid rgba(92,111,245,0.5)" }}>
                        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", margin: "0 0 0.2rem", fontSize: "0.9rem" }}>{edu.degree}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#8b9fff", margin: "0 0 0.4rem", fontSize: "0.82rem" }}>{edu.school} · {edu.year}</p>
                        <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "0.82rem", lineHeight: 1.6 }}>{edu.desc}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const [ref, inView] = useInView();
  
  return (
    <section id="project" ref={ref} style={{ background: "#0d0d26", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,4rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p style={{ fontFamily: "'Orbitron', sans-serif", color: "#5c6ff5", fontSize: "0.7rem", letterSpacing: 5, textTransform: "uppercase", marginBottom: "0.5rem" }}>Portfolio</p>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 800, color: "#fff", margin: 0 }}>PROJECTS</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
          {PROJECTS.map((p, i) => (
            <a key={i} href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ borderRadius: 16, overflow: "hidden", background: "#13133a", boxShadow: "0 10px 40px rgba(0,0,0,0.4)", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer", height: "100%" }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 60px rgba(60,80,220,0.3)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 10px 40px rgba(0,0,0,0.4)"; }}>
                <div style={{ height: 200, background: p.color, position: "relative", overflow: "hidden" }}>
                  <img src={p.image} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: "1.2rem 1.5rem" }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", margin: "0 0 0.5rem", fontSize: "1rem" }}>{p.title}</h3>
                  <p style={{ fontFamily: "'DM Sans', sans-serif", color: "rgba(255,255,255,0.5)", margin: 0, fontSize: "0.85rem", lineHeight: 1.6 }}>{p.desc}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [ref, inView] = useInView();
  const formRef = useRef();
  const [status, setStatus] = useState("idle"); 
  const [formData, setFormData] = useState({ from_name: "", from_email: "", contact_number: "", message: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");

    emailjs.send(
      "service_c6eorns",
      "template_238hl3h",
      {
        from_name: formData.from_name,
        from_email: formData.from_email,
        contact_number: formData.contact_number,
        message: formData.message,
        name: formData.from_name,
        email: formData.from_email,
        contact: formData.contact_number,
      },
      "glLkwlsKB41KqEJNE"
    )
    .then(() => {
      setStatus("success");
      setFormData({ from_name: "", from_email: "", contact_number: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    });
  };

  const inputStyle = {
    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(92,111,245,0.3)",
    padding: "1rem", color: "#fff", borderRadius: 8, fontFamily: "'DM Sans', sans-serif", outline: "none",
    width: "100%", marginBottom: "1rem", boxSizing: "border-box"
  };

  const cvButtonStyle = {
    display: "inline-block",
    marginTop: "1.5rem",
    padding: "0.8rem 2rem",
    background: "transparent",
    color: "#fff",
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "0.85rem",
    textDecoration: "none",
    borderRadius: "8px",
    border: "2px solid #5c6ff5",
    transition: "all 0.3s ease",
    textAlign: "center",
    letterSpacing: "1px"
  };

  return (
    <section id="contact" ref={ref} style={{ background: "#090917", padding: "clamp(4rem,8vw,7rem) clamp(1.5rem,6vw,4rem)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", opacity: inView ? 1 : 0, transform: inView ? "none" : "translateY(40px)", transition: "all 0.8s ease" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.5fr", gap: "4rem" }} className="contact-grid">
          <div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", fontSize: "2rem", marginBottom: "2rem" }}>CONTACT</h2>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff", marginBottom: "0.8rem" }}>Email: jmilromeroso@gmail.com</p>
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "#fff", marginBottom: "0.8rem" }}>Contact: 09150681652</p>
            
            <a href="https://drive.google.com/file/d/1RzKhUfuxsJRxwlUiMUBCdB_IHW_HUxn0/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={cvButtonStyle}>
              VIEW CV
            </a>
          </div>

          <div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#fff", marginBottom: "1.5rem", fontSize: "1.3rem" }}>Message Me!</h3>
            <form ref={formRef} onSubmit={handleSubmit}>
              <input type="text"  name="from_name" value={formData.from_name} onChange={handleChange} placeholder="NAME :" required style={inputStyle} />
              <input type="email" name="from_email" value={formData.from_email} onChange={handleChange} placeholder="EMAIL :" required style={inputStyle} />
              <input type="text"  name="contact_number" value={formData.contact_number} onChange={handleChange} placeholder="CONTACT :" style={inputStyle} />
              <textarea name="message" value={formData.message} onChange={handleChange} placeholder="MESSAGE :" required rows={5}
                style={{ ...inputStyle, marginBottom: "1.5rem", resize: "vertical" }}
              />

              <button type="submit" disabled={status === "sending"}
                style={{
                  fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.85rem",
                  letterSpacing: 2, textTransform: "uppercase",
                  padding: "0.9rem 2.5rem", border: "none", borderRadius: 8,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  transition: "all 0.3s", width: "auto",
                  background: status === "success" ? "#22c55e" : status === "error" ? "#ef4444" : "#5c6ff5",
                  color: "#fff",
                }}>
                {status === "sending" ? "Sending..." : status === "success" ? "✓ Message Sent!" : status === "error" ? "✗ Failed — Try Again" : "SEND MESSAGE"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const footerStyle = {
    background: "#121212",
    color: "#fff",
    padding: "3rem 2rem 1.5rem",
    fontFamily: "'DM Sans', sans-serif",
    borderTop: "1px solid rgba(255,255,255,0.1)"
  };

  const containerStyle = {
    maxWidth: "1100px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "2.5rem",
    marginBottom: "3rem"
  };

  const columnTitleStyle = {
    fontFamily: "'Syne', sans-serif",
    fontWeight: 700,
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
    display: "block"
  };

  const linkStyle = {
    display: "block",
    color: "rgba(255,255,255,0.6)",
    textDecoration: "none",
    marginBottom: "0.8rem",
    fontSize: "0.9rem",
    transition: "color 0.3s ease"
  };

  const socialIconStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.05)",
    color: "#fff",
    textDecoration: "none",
    fontSize: "1.1rem",
    transition: "all 0.3s ease",
    border: "1px solid rgba(92,111,245,0.2)"
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div>
          <a href="#home" style={{ textDecoration: "none" }}>
            <span style={{ 
              fontFamily: "'Orbitron', sans-serif", 
              fontWeight: 800, 
              fontSize: "1.6rem", 
              display: "block", 
              marginBottom: "1.5rem",
              color: "#fff"
            }}>
              JR<span style={{ color: "#5c6ff5" }}>.</span>
            </span>
          </a>
          <div style={{ display: "flex", gap: "0.8rem" }}>
            <a href="https://www.facebook.com/LimjPitikTV" target="_blank" rel="noopener noreferrer" style={socialIconStyle} aria-label="Facebook">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.instagram.com/?hl=en" target="_blank" rel="noopener noreferrer" style={socialIconStyle} aria-label="Instagram">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.linkedin.com/feed/" style={socialIconStyle} aria-label="Linkedin">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div>
          <span style={columnTitleStyle}>View</span>
          {NAV_LINKS.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} style={linkStyle}>{link}</a>
          ))}
        </div>

        <div>
          <span style={columnTitleStyle}>Contact</span>
          <p style={linkStyle}>Email : jmilromeroso@gmail.com</p>
          <p style={linkStyle}>Contact : 09150681652</p>
        </div>
      </div>

      <div style={{ 
        textAlign: "center", 
        borderTop: "1px solid rgba(255,255,255,0.05)", 
        paddingTop: "1.5rem",
        fontSize: "0.85rem",
        color: "rgba(255,255,255,0.4)"
      }}>
        © Jaemyl Romeroso Portfolio!
      </div>
    </footer>
  );
}

export default function App() {
  const [active, setActive] = useState("Home");

  return (
    <>
      <link 
        rel="stylesheet" 
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" 
      />
      
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=Syne:wght@400;600;700;800&family=DM+Sans:wght@400;500;600&display=swap');
        
        body { margin: 0; background: #08081e; overflow-x: hidden; }
        html { scroll-behavior: smooth; }
        
        .hire-btn:hover {
          background: #3b4fd8 !important;
          transform: translateY(-3px);
          box-shadow: 0 10px 20px rgba(59, 79, 216, 0.3);
        }

        .cv-btn:hover {
          background: #5c6ff5 !important;
          box-shadow: 0 5px 15px rgba(92, 111, 245, 0.4);
          transform: translateY(-2px);
        }

        section#home a:hover {
          background: #fff !important;
          color: #08081e !important;
          border-color: #fff !important;
        }

        .fab:hover { color: #5c6ff5; }
        footer a:hover { color: #8b9fff !important; }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        
        /* RESPONSIVE ADDITIONS */
        @media (max-width: 768px) {
          .mobile-toggle { display: block !important; }
          
          .nav-links {
            position: fixed;
            top: 62px;
            left: 0;
            right: 0;
            background: rgba(10, 10, 30, 0.98);
            flex-direction: column;
            padding: 2rem;
            gap: 1.5rem !important;
            transform: translateY(-150%);
            transition: transform 0.4s ease;
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(92, 111, 245, 0.2);
          }

          .nav-links.open {
            transform: translateY(0);
          }

          .hero-container {
            flex-direction: column-reverse;
            text-align: center;
            gap: 2rem;
          }

          .hero-image {
            margin-bottom: 1rem;
          }

          .hero-image div {
            width: 220px !important;
            height: 280px !important;
            margin: 0 auto;
          }

          .hero-socials {
            justify-content: center;
          }

          .info-grid, .contact-grid { 
            grid-template-columns: 1fr !important; 
            gap: 2rem !important;
          }

          h1 { margin-bottom: 1rem !important; }
          
          p {
            max-width: 100% !important;
          }

          .hire-btn {
            width: 100%;
            box-sizing: border-box;
          }

          .contact-grid > div:first-child {
            text-align: center;
          }
        }
      `}</style>
      
      <Navbar active={active} setActive={setActive} />
      <main>
        <Hero />
        <Objective />
        <Information />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}