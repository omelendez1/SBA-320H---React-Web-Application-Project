import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl text-center"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">🏰 Welcome to Fantasy Name Forge</h1>
        <p className="text-lg md:text-xl mb-8">
          Craft epic names and rich backstories for your fantasy characters.
          Whether you're a writer, player, or worldbuilder — you're in the right realm.
        </p>

        <div className="flex flex-wrap gap-4 justify-center">
          <Button onClick={() => navigate("/generator")} size="lg">
            🧙 Generate a Name
          </Button>
          <Button onClick={() => navigate("/lore")} variant="secondary" size="lg">
            📖 Explore Class Lore
          </Button>
          <Button onClick={() => navigate("/saved")} variant="outline" size="lg">
            💾 View Saved Names
          </Button>
        </div>
      </motion.div>
    </div>
  );
}