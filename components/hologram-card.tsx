"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"

interface HologramCardProps {
  title: string
  children: ReactNode
}

export function HologramCard({ title, children }: HologramCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300"></div>

      <div className="relative bg-black/80 backdrop-blur border border-cyan-500/30 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300">
        {/* Hologram effect lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent animate-pulse"></div>
        </div>

        <div className="relative z-10">
          <h3 className="text-cyan-400 font-mono text-sm font-semibold mb-4 tracking-wider">{title}</h3>
          <div className="text-white">{children}</div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-cyan-400/50"></div>
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-cyan-400/50"></div>
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-cyan-400/50"></div>
      </div>
    </motion.div>
  )
}
