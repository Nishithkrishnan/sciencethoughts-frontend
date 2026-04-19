"use client";

import Link from "next/link";
import { useEffect, useState, use } from "react";
import ReadingProgress from "@/components/ReadingProgress"; // Make sure this file exists!

export default function PostPage({ params }: any) {
  // Unwrap params for Next.js 15+
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  
  const [post, setPost] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // UPDATED: Using the blog subdomain instead of the main domain
    fetch(`https://blog.sciencethoughts.com/wp-json/wp/v2/posts/${id}?_embed`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch post data");
        return res.json();
      })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Post fetch error:", err);
        setError("This insight is currently unavailable. Please try again later.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={styles.loading}>Loading Insight...</div>;
  if (error) return <div style={styles.error}>{error} <br /><Link href="/" style={styles.backLink}>Return to Lab</Link></div>;
  if (!post) return <div style={styles.loading}>Post not found.</div>;

  const featuredImage = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;

  return (
    <main style={styles.main}>
      <ReadingProgress />
      
      <nav style={styles.nav}>
        <Link href="/" style={styles.backBtn}>← Back to Lab</Link>
      </nav>

      <article style={styles.articleWrapper}>
        <header style={styles.header}>
          <div style={styles.categoryBadge}>Think Tank / Analysis</div>
          <h1 
            style={styles.title} 
            dangerouslySetInnerHTML={{ __html: post.title.rendered }} 
          />
          <div style={styles.meta}>
            <img src={`https://ui-avatars.com/api/?name=Science+Thoughts&background=00f2ff&color=000`} style={styles.avatar} />
            <div style={styles.metaText}>
              <strong>Science Thoughts</strong>
              <span>{new Date(post.date).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <div style={styles.readTime}>5 min read</div>
          </div>
        </header>

        {featuredImage && (
          <div style={styles.heroImageContainer}>
            <img src={featuredImage} alt="Featured" style={styles.heroImage} />
          </div>
        )}

        <div style={styles.contentContainer}>
          <div 
            className="wp-content" 
            dangerouslySetInnerHTML={{ __html: post.content.rendered }} 
          />
        </div>

        <div style={styles.footerCta}>
          <h3>Interested in the tech behind this?</h3>
          <p>I build AI agents that automate the research and logic discussed in this article.</p>
          <Link href="/" style={styles.ctaBtn}>Explore the AI Lab</Link>
        </div>
      </article>
    </main>
  );
}

const styles: any = {
  main: {
    background: "#050505",
    color: "#fff",
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
  },
  nav: {
    padding: "30px 20px",
    maxWidth: "740px",
    margin: "0 auto",
  },
  backBtn: {
    color: "#888",
    textDecoration: "none",
    fontSize: "14px",
    transition: "0.3s",
    fontWeight: "500",
  },
  articleWrapper: {
    maxWidth: "740px",
    margin: "0 auto",
    padding: "0 20px",
  },
  header: {
    textAlign: "left",
    marginBottom: "40px",
  },
  categoryBadge: {
    color: "#00f2ff",
    fontSize: "13px",
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: "1.5px",
    marginBottom: "15px",
  },
  title: {
    fontSize: "48px",
    fontWeight: "800",
    lineHeight: "1.1",
    marginBottom: "25px",
    letterSpacing: "-1.5px",
    color: "#fff",
  },
  meta: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    color: "#888",
    fontSize: "14px",
  },
  avatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
  },
  metaText: {
    display: "flex",
    flexDirection: "column",
    lineHeight: "1.4",
  },
  readTime: {
    marginLeft: "auto",
    color: "#555",
  },
  heroImageContainer: {
    width: "100%",
    marginBottom: "40px",
  },
  heroImage: {
    width: "100%",
    maxHeight: "450px",
    objectFit: "cover",
    borderRadius: "24px",
    border: "1px solid #222",
  },
  contentContainer: {
    marginTop: "20px",
  },
  footerCta: {
    marginTop: "80px",
    padding: "50px 30px",
    background: "linear-gradient(145deg, #0a0a0a, #000)",
    border: "1px solid #1a1a1a",
    borderRadius: "30px",
    textAlign: "center",
    marginBottom: "100px",
  },
  ctaBtn: {
    display: "inline-block",
    marginTop: "25px",
    padding: "14px 28px",
    background: "linear-gradient(90deg, #00f2ff, #bc13fe)",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "12px",
    fontWeight: "600",
  },
  loading: {
    background: "#000",
    color: "#fff",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "18px",
    letterSpacing: "1px",
  },
  error: {
    background: "#000",
    color: "#ff4d4d",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    fontSize: "18px",
    padding: "20px",
  },
  backLink: {
    marginTop: "20px",
    color: "#00f2ff",
    textDecoration: "none",
    fontWeight: "600",
  }
};
