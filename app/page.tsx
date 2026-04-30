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
    const storedCredits = localStorage.getItem("credits");
    if (storedCredits) {
      setCredits(Number(storedCredits));
    } else {
      localStorage.setItem("credits", "3");
    }
  }, []);

  const useCredit = () => {
    if (credits <= 0) return false;

    const newCredits = credits - 1;
    setCredits(newCredits);
    localStorage.setItem("credits", String(newCredits));
    return true;
  };

  const generate = async () => {
    if (!useCredit()) {
      alert("No credits left");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ theme, mood, perspective, context }),
    });

    const data = await res.json();
    setResult(data.lyrics);
    setLoading(false);
  };

  return (
    <main style={{ padding: 40, maxWidth: 600, margin: "auto" }}>
      <h1 style={{ fontSize: "32px", fontWeight: "bold" }}>
        🎵 SongStarter AI
      </h1>
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