"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [theme, setTheme] = useState("");
  const [mood, setMood] = useState("");
  const [perspective, setPerspective] = useState("1st person");
  const [context, setContext] = useState("");

  const [result, setResult] = useState("");
  const [credits, setCredits] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("credits");
    if (stored) setCredits(Number(stored));
    else localStorage.setItem("credits", "3");
  }, []);

  const useCredit = () => {
    if (credits <= 0) return false;

    const updated = credits - 1;
    setCredits(updated);
    localStorage.setItem("credits", String(updated));
    return true;
  };

  const generate = async () => {
    try {
      setLoading(true);

      const res = await fetch(`${window.location.origin}/api/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          theme,
          mood,
          perspective,
          context
        })
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to generate");
      }

      useCredit();
      setResult(data.lyrics);

    } catch (err: any) {
      console.error("FRONTEND ERROR:", err);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1>🎵 SongStarter AI</h1>
      <p>Turn your ideas into structured lyrics</p>

      <p><strong>Credits:</strong> {credits}</p>

      <input
        placeholder="Theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <input
        placeholder="Perspective"
        value={perspective}
        onChange={(e) => setPerspective(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <textarea
        placeholder="Context"
        value={context}
        onChange={(e) => setContext(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Song"}
      </button>

      <pre style={{ marginTop: 20, whiteSpace: "pre-wrap" }}>
        {result}
      </pre>
    </main>
  );
}