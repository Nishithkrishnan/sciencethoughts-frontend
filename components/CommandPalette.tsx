"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Terminal, FlaskConical, BookOpen, UserCheck } from "lucide-react";
import Link from "next/link";

const MENU_ITEMS = [
  { name: "The Lab", icon: <FlaskConical size={18} />, link: "/#lab", desc: "Explore AI Agents" },
  { name: "Think Tank", icon: <BookOpen size={18} />, link: "/#blog", desc: "Read Science Essays" },
  { name: "Hire Me", icon: <UserCheck size={18} />, link: "/hire", desc: "Business Inquiries" },
  { name: "Resume", icon: <Terminal size={18} />, link: "/resume", desc: "Technical Experience" },
];

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const filtered = MENU_ITEMS.filter(i => i.name.toLowerCase().includes(query.toLowerCase()));

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={styles.overlay} onClick={() => setIsOpen(false)}>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            style={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={styles.searchBox}>
              <Search size={20} style={{ color: "#666" }} />
              <input 
                autoFocus 
                placeholder="Search commands... (Cmd+K)" 
                style={styles.input}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div style={styles.list}>
              {filtered.map((item) => (
                <Link key={item.name} href={item.link} onClick={() => setIsOpen(false)} style={styles.item}>
                  <div style={styles.itemLeft}>
                    <span style={styles.icon}>{item.icon}</span>
                    <div>
                      <div style={styles.itemName}>{item.name}</div>
                      <div style={styles.itemDesc}>{item.desc}</div>
                    </div>
                  </div>
                  <div style={styles.kbd}>Enter</div>
                </Link>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

const styles: any = {
  overlay: { 
    position: "fixed", 
    inset: 0, 
    background: "rgba(0,0,0,0.8)", 
    backdropFilter: "blur(8px)", 
    zIndex: 9999, 
    display: "flex", 
    justifyContent: "center", 
    alignItems: "flex-start", 
    paddingTop: "100px" 
  },
  modal: { 
    background: "#111", 
    border: "1px solid #333", 
    width: "500px", 
    borderRadius: "16px", 
    overflow: "hidden", 
    boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" 
  },
  searchBox: { 
    display: "flex", 
    alignItems: "center", 
    padding: "15px", 
    gap: "12px", 
    borderBottom: "1px solid #222", 
    background: "#0a0a0a" 
  },
  input: { 
    background: "transparent", 
    border: "none", 
    color: "#fff", 
    fontSize: "16px", 
    outline: "none", 
    width: "100%" 
  },
  list: { 
    padding: "10px" 
  },
  item: { 
    display: "flex", 
    justifyContent: "space-between", 
    alignItems: "center", 
    padding: "12px", 
    borderRadius: "8px", 
    textDecoration: "none", 
    color: "#ccc", 
    transition: "0.2s", 
    cursor: "pointer" 
  },
  itemLeft: { 
    display: "flex", 
    alignItems: "center", 
    gap: "12px" 
  },
  icon: { 
    color: "#00f2ff", 
    display: "flex" 
  },
  itemName: { 
    fontSize: "15px", 
    fontWeight: "600", 
    color: "#fff" 
  },
  itemDesc: { 
    fontSize: "12px", 
    color: "#666" 
  },
  kbd: { 
    fontSize: "11px", 
    background: "#222", 
    color: "#888", 
    padding: "4px 8px", 
    borderRadius: "4px", 
    border: "1px solid #333" 
  }
};