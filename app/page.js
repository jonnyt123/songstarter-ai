"use client";

import { useState, useEffect } from "react";
import { getCredits, useCredit } from "../lib/credits";

export default function Home() {
  const [theme, setTheme] = useState("");
  const [mood, setMood] = useState("");
  const [perspective, setPerspective] = useState("1st person");
  const [context, setContext] = useState("");

  const [result, setResult] = useState("");
  const [credits, setCredits] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setCredits(getCredits());
  }, []);

  const generate = async () => {
    if (!useCredit()) {
      alert("No credits left");
      return;
    }

    setCredits(getCredits());
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
    <div style={{ padding: 40 }}>
      <h1>AI Songwriter</h1>

      <p>Credits: {credits}</p>

      <input
        placeholder="Theme"
        value={theme}
        onChange={(e) => setTheme(e.target.value)}
      />

      <input
        placeholder="Mood"
        value={mood}
        onChange={(e) => setMood(e.target.value)}
      />

      <input
        placeholder="Perspective"
        value={perspective}
        onChange={(e) => setPerspective(e.target.value)}
      />

      <textarea
        placeholder="Context"
        value={context}
        onChange={(e) => setContext(e.target.value)}
      />

      <br />

      <button onClick={generate} disabled={loading}>
        {loading ? "Generating..." : "Generate Song"}
      </button>

      <pre style={{ marginTop: 20 }}>{result}</pre>
    </div>
  );
}