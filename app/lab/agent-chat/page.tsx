"use client";
import { useChat } from "ai/react";
import { motion } from "framer-motion";
import { Send, Bot, User, Sparkles, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AgentChat({ searchParams }: any) {
  // Get the agent type from the URL (e.g., /lab/agent-chat?type=researcher)
  const agentType = searchParams?.type || "researcher";

  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: "/api/agent",
    body: { agentType },
  });

  return (
    <main style={styles.main}>
      <nav style={styles.nav}>
        <Link href="/lab" style={styles.backBtn}>← Back to Lab</Link>
        <div style={styles.agentBadge}>
          <Sparkles size={16} color="#00f2ff" /> {agentType.toUpperCase()} MODE
        </div>
      </nav>

      <div style={styles.chatContainer}>
        <div style={styles.messagesArea}>
          {messages.length === 0 && (
            <div style={styles.emptyState}>
              <Bot size={48} color="#333" />
              <p>The {agentType} agent is online. Ask me anything about science or AI.</p>
            </div>
          )}
          
          {messages.map((m) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }} 
              animate={{ opacity: 1, y: 0 }}
              key={m.id} 
              style={m.role === "user" ? styles.userRow : styles.aiRow}
            >
              <div style={m.role === "user" ? styles.userBubble : styles.aiBubble}>
                <div style={styles.icon}>{m.role === "user" ? <User size={14}/> : <Bot size={14}/>}</div>
                <div style={styles.text}>{m.content}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <form onSubmit={handleSubmit} style={styles.inputForm}>
          <input
            value={input}
            onChange={handleInputChange}
            placeholder={`Message the ${agentType}...`}
            style={styles.input}
          />
          <button type="submit" disabled={isLoading} style={styles.sendBtn}>
            {isLoading ? "..." : <Send size={18} />}
          </button>
        </form>
      </div>
    </main>
  );
}

const styles: any = {
  main: { background: "#050505", color: "#fff", minHeight: "100vh", fontFamily: "Inter, sans-serif" },
  nav: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px", maxWidth: "800px", margin: "0 auto" },
  backBtn: { color: "#888", textDecoration: "none", fontSize: "14px", transition: "0.3s" },
  agentBadge: { background: "#111", border: "1px solid #333", padding: "5px 12px", borderRadius: "20px", fontSize: "12px", fontWeight: "700", display: "flex", alignItems: "center", gap: "6px", color: "#ccc" },
  chatContainer: { maxWidth: "800px", margin: "0 auto", height: "calc(100vh - 100px)", display: "flex", flexDirection: "column", padding: "0 20px 40px" },
  messagesArea: { flex: 1, overflowY: "auto", padding: "20px 0", display: "flex", flexDirection: "column", gap: "20px" },
  emptyState: { textAlign: "center", marginTop: "100px", color: "#444" },
  userRow: { display: "flex", justifyContent: "flex-end" },
  aiRow: { display: "flex", justifyContent: "flex-start" },
  userBubble: { background: "#00f2ff", color: "#000", padding: "12px 16px", borderRadius: "18px 18px 2px 18px", maxWidth: "80%", display: "flex", gap: "10px" },
  aiBubble: { background: "#1a1a1a", color: "#fff", padding: "12px 16px", borderRadius: "18px 18px 18px 2px", maxWidth: "80%", border: "1px solid #333", display: "flex", gap: "10px" },
  icon: { display: "flex", alignItems: "center", opacity: 0.6 },
  text: { fontSize: "15px", lineHeight: "1.5" },
  inputForm: { display: "flex", gap: "10px", padding: "20px 0", borderTop: "1px solid #222" },
  input: { flex: 1, background: "#111", border: "1px solid #333", borderRadius: "12px", padding: "14px", color: "#fff", outline: "none" },
  sendBtn: { background: "#fff", color: "#000", border: "none", width: "50px", height: "50px", borderRadius: "12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }
};