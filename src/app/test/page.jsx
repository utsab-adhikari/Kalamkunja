"use client";
import { motion } from "framer-motion";

const machines = [
  { name: "Projects", color: "from-green-400 to-teal-500" },
  { name: "AI Pod", color: "from-cyan-400 to-blue-500" },
  { name: "Open Source", color: "from-pink-400 to-purple-500" },
  { name: "Blog", color: "from-yellow-400 to-orange-500" },
  { name: "Resume", color: "from-red-400 to-pink-500" },
];

export default function Home() {
  return (
    <div className="bg-[#0f1115] min-h-screen text-white flex flex-col items-center justify-center p-8">
      
      {/* Intro Animation */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-4xl font-mono text-green-400 mb-12"
      >
        Entering Utsab’s Developer Lab...
      </motion.h1>

      {/* Machines Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {machines.map((machine, index) => (
          <motion.div
            key={machine.name}
            whileHover={{ scale: 1.05 }}
            className={`bg-gradient-to-br ${machine.color} rounded-xl p-6 shadow-lg cursor-pointer`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h2 className="text-2xl font-bold">{machine.name}</h2>
            <p className="mt-2 text-sm opacity-80">
              Explore {machine.name} section of the lab.
            </p>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <footer className="mt-12 text-xs opacity-50">
        © {new Date().getFullYear()} Utsab Adhikari — Developer’s Lab
      </footer>
    </div>
  );
}
