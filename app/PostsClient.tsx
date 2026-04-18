"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Search, FlaskConical, BookOpen, UserCheck, ArrowRight, Cpu, Globe, Zap } from "lucide-react";
import CommandPalette from "@/components/CommandPalette";

/* --- CONFIGURATION: YOUR AI AGENTS --- */
const AI_AGENTS = [
  {
    id: "researcher-1",
    name: "Neuro-Synthesizer",
    description: "An agent that connects neuroscience papers to AI architecture in real-time.",
    tech: ["GPT-4o", "LangChain", "VectorDB"],
    link: "/lab/neuro-synthesizer",
    color: "#00f2ff",
    icon: <Cpu size={20} />,
  },
  {
    id: "coder-1",
    name: "LogicArchitect",
    description: "Automates the creation of complex system design diagrams from raw text.",
    tech: ["Claude 3.5", "Python", "Mermaid.js"],
    link: "/lab/logic-architect",
    color: "#bc13fe",
    icon: <Globe size={20} />,
  },
  {
    id: "writer-1",
    name: "Thought-Mapper",
    description: "Transforms raw scientific notes into structured, high-conversion blog posts.",
    tech: ["GPT-4", "Custom Prompting"],
    link: "/lab/thought-mapper",
    color: "#39ff14",
    icon: <Zap size={20} />,
  },
];

/* NAVBAR COMPONENT */
function Navbar() {
  return (
    <div style={styles.navContainer}>
      <div style={styles.navInner}>
        <div style={styles.logo}>
          SCIENCE <span style={{ color: "#888" }}>THOUGHTS</span>
        </div>
        <div style={styles.navLinks}>
          <Link href="/" style={styles.navLink}>Home</Link>
          <Link href="#lab" style={styles.navLink}>The Lab</Link>
          <Link href="#blog" style={styles.navLink}>Think Tank</Link>
          <Link href="/hire" style={styles.hireBtn}>Work With Me</Link>
        </div>
      </div>
    </div>
  );
}

export default function PostsClient({ posts }: any) {
  const [search, setSearch] = useState("");

  const filteredPosts = posts.filter((post: any) =>
    post.title.rendered.toLowerCase().includes(search.toLowerCase())
  );

  const featured = posts[0];

  // FIXED: Explicitly typing the animation as Variants to pass Vercel's strict type check
  const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  return (
    <main style={styles.main}>
      <CommandPalette />
      <Navbar />

      {/* HERO SECTION */}
      <section style={styles.hero}>
        <motion.div 
          initial="hidden" 
          animate="visible" 
          variants={fadeInUp} 
          style={styles.heroContent}
        >
          <h1 style={styles.heroTitle}>
            Architecting the <span style={styles.gradientText}>Intelligence</span> of Tomorrow
          </h1>
          <p style={styles.heroSubtitle}>
            A hybrid space where science meets AI. I build autonomous agents 
            that bridge the gap between human thought and machine execution.
          </p>
          <div style={styles.heroCtaContainer}>
            <a href="#lab" style={styles.primaryBtn}>
              Explore the Lab <ArrowRight size={18} style={{ marginLeft: "8px" }} />
            </a>
            <div style={styles.searchWrapper}>
              <Search size={18} style={styles.searchIcon} />
              <input
                type="text"
                placeholder="Search the Think Tank..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
          </div>
        </motion.div>
      </section>

      {/* THE LAB - AI Agent Showcase */}
      <section id="lab" style={styles.section}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp} 
          style={styles.sectionHeader}
        >
          <div style={styles.headerIcon}><FlaskConical color="#00f2ff" /></div>
          <h2 style={styles.sectionTitle}>The Experimental Lab</h2>
          <p style={styles.sectionDesc}>Interactive AI agents designed for complex cognitive tasks.</p>
        </motion.div>
        
        <div style={styles.agentGrid}>
          {AI_AGENTS.map((agent, index) => (
            <motion.div 
              key={agent.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={agent.link} style={styles.agentCardLink}>
                <div style={{...styles.agentCard, borderLeft: `4px solid ${agent.color}`}}>
                  <div style={styles.agentTop}>
                    <div style={{...styles.agentIcon, color: agent.color}}>{agent.icon}</div>
                    <div style={styles.agentBadge}>{agent.tech[0]}</div>
                  </div>
                  <h3 style={styles.agentName}>{agent.name}</h3>
                  <p style={styles.agentDesc}>{agent.description}</p>
                  <div style={styles.techStack}>
                    {agent.tech.map(t => <span key={t} style={styles.techTag}>{t}</span>)}
                  </div>
                  <div style={styles.launchBtn}>Launch Agent <ArrowRight size={14} /></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* THE THINK TANK - Your Blog */}
      <section id="blog" style={styles.section}>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          variants={fadeInUp} 
          style={styles.sectionHeader}
        >
          <div style={styles.headerIcon}><BookOpen color="#bc13fe" /></div>
          <h2 style={styles.sectionTitle}>The Think Tank</h2>
          <p style={styles.sectionDesc}>Deep dives into mind, matter, and the future of tech.</p>
        </motion.div>

        {featured && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            style={{ marginBottom: "40px" }}
          >
            <Link href={`/posts/${featured.id}`} style={styles.featuredLink}>
              <div style={styles.featuredCard}>
                <span style={styles.featuredLabel}>Featured Insight</span>
                <h2 style={styles.featuredTitle} dangerouslySetInnerHTML={{ __html: featured.title.rendered }} />
                <div style={styles.featuredExcerpt} dangerouslySetInnerHTML={{ __html: featured.excerpt.rendered }} />
              </div>
            </Link>
          </motion.div>
        )}

        <div style={styles.postGrid}>
          {filteredPosts.map((post: any, index) => {
            const image = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
            return (
              <motion.div 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Link href={`/posts/${post.id}`} style={styles.postCardLink}>
                  <div style={styles.postCard}>
                    {image && <img src={image} style={styles.postImage} />}
                    <div style={styles.postContent}>
                      <h3 style={styles.postTitle} dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                      <div style={styles.postExcerpt} dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

/* --- STYLES OBJECT --- */
const styles: any = {
  main: {
    background: "#050505",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    scrollBehavior: "smooth",
  },
  navContainer: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    backdropFilter: "blur(12px)",
    background: "rgba(0,0,0,0.8)",
    borderBottom: "1px solid #1a1a1a",
  },
  navInner: {
    maxWidth: "1200px",
    margin: "auto",
    padding: "15px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: { fontWeight: "700", fontSize: "20px", letterSpacing: "1px" },
  navLinks: { display: "flex", gap: "30px", alignItems: "center" },
  navLink: { color: "#aaa", textDecoration: "none", fontSize: "14px", transition: "0.3s", cursor: "pointer" },
  hireBtn: {
    background: "#fff",
    color: "#000",
    padding: "8px 16px",
    borderRadius: "20px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: "600",
    transition: "0.3s",
  },
  hero: {
    padding: "140px 20px 100px",
    textAlign: "center",
    background: "radial-gradient(circle at 50% -20%, rgba(0,242,255,0.1), transparent 50%)",
  },
  heroContent: { maxWidth: "900px", margin: "auto" },
  heroTitle: { fontSize: "64px", fontWeight: "800", letterSpacing: "-2px", lineHeight: "1.1", marginBottom: "25px" },
  gradientText: {
    background: "linear-gradient(90deg, #00f2ff, #bc13fe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },
  heroSubtitle: { fontSize: "22px", color: "#888", lineHeight: "1.6", marginBottom: "45px", fontWeight: "400" },
  heroCtaContainer: { display: "flex", justifyContent: "center", gap: "20px", alignItems: "center", flexWrap: "wrap" },
  primaryBtn: {
    display: "flex",
    alignItems: "center",
    background: "linear-gradient(90deg, #00f2ff, #bc13fe)",
    color: "#fff",
    padding: "16px 32px",
    borderRadius: "12px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "18px",
    transition: "0.3s",
  },
  searchWrapper: { position: "relative", display: "flex", alignItems: "center" },
  searchIcon: { position: "absolute", left: "14px", color: "#555", zIndex: 1 },
  searchInput: {
    padding: "16px 16px 16px 45px",
    width: "320px",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "12px",
    color: "#fff",
    outline: "none",
    fontSize: "16px",
    transition: "0.3s",
  },
  section: { maxWidth: "1200px", margin: "0 auto", padding: "100px 20px" },
  sectionHeader: { textAlign: "center", marginBottom: "60px" },
  headerIcon: { display: "flex", justifyContent: "center", marginBottom: "10px" },
  sectionTitle: { fontSize: "42px", fontWeight: "800", marginBottom: "15px", letterSpacing: "-1px" },
  sectionDesc: { color: "#777", fontSize: "20px" },
  
  agentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
  },
  agentCardLink: { textDecoration: "none", color: "inherit" },
  agentCard: {
    background: "#0a0a0a",
    border: "1px solid #1a1a1a",
    borderRadius: "20px",
    padding: "30px",
    transition: "0.3s",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  agentTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
  agentIcon: { background: "rgba(0,0,0,0.3)", padding: "10px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" },
  agentBadge: { fontSize: "12px", color: "#888", fontWeight: "600", background: "#1a1a1a", padding: "4px 10px", borderRadius: "6px" },
  agentName: { fontSize: "24px", marginBottom: "12px", fontWeight: "700" },
  agentDesc: { color: "#aaa", fontSize: "16px", lineHeight: "1.6", marginBottom: "25px", flexGrow: 1 },
  techStack: { display: "flex", gap: "8px", marginBottom: "25px", flexWrap: "wrap" },
  techTag: { fontSize: "12px", background: "#111", color: "#ccc", padding: "5px 10px", borderRadius: "6px", border: "1px solid #333" },
  launchBtn: { fontSize: "15px", fontWeight: "600", color: "#fff", textAlign: "right", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "5px" },

  featuredLink: { textDecoration: "none", color: "inherit", display: "block" },
  featuredCard: {
    background: "linear-gradient(145deg, #0f0f0f, #050505)",
    border: "1px solid #222",
    borderRadius: "30px",
    padding: "50px",
    transition: "0.3s",
  },
  featuredLabel: { color: "#00f2ff", fontSize: "13px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "15px", display: "block" },
  featuredTitle: { fontSize: "38px", marginTop: "10px", marginBottom: "20px", fontWeight: "800", lineHeight: "1.2" },
  featuredExcerpt: { color: "#888", fontSize: "20px", lineHeight: "1.7" },
  postGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "35px",
  },
  postCardLink: { textDecoration: "none", color: "inherit" },
  postCard: {
    background: "#0a0a0a",
    borderRadius: "20px",
    overflow: "hidden",
    border: "1px solid #1a1a1a",
    transition: "0.3s",
  },
  postImage: { width: "100%", height: "220px", objectFit: "cover" },
  postContent: { padding: "25px" },
  postTitle: { fontSize: "20px", marginBottom: "12px", lineHeight: "1.4", fontWeight: "700" },
  postExcerpt: { color: "#777", fontSize: "15px", lineHeight: "1.6" },
};