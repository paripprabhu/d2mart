"use client";

import { useState } from "react";
import { Database, RefreshCw } from "lucide-react";

export default function SeedBanner() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function seed() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/seed", { method: "POST" });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
        setTimeout(() => window.location.reload(), 800);
      } else {
        setError(data.error || "Seed failed");
      }
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3">
        <span className="text-2xl">✅</span>
        <p className="text-green-700 font-semibold">Database seeded! Reloading…</p>
      </div>
    );
  }

  return (
    <div className="bg-orange-50 border border-orange-200 rounded-xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
      <Database size={32} className="text-[#FC8019] shrink-0" />
      <div className="flex-1">
        <p className="font-bold text-[#3d4152]">Database is empty</p>
        <p className="text-sm text-[#93959f] mt-0.5">
          Click the button to seed 9 demo restaurants with full menus.
        </p>
        {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
      </div>
      <button
        onClick={seed}
        disabled={loading}
        className="flex items-center gap-2 bg-[#FC8019] text-white px-5 py-2.5 rounded-lg font-bold text-sm hover:bg-orange-600 transition disabled:opacity-60 shrink-0"
      >
        <RefreshCw size={15} className={loading ? "animate-spin" : ""} />
        {loading ? "Seeding…" : "Seed Database"}
      </button>
    </div>
  );
}
