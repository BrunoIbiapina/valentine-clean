"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Zap, Heart } from "lucide-react"

export default function HomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleInitialize = () => {
    setIsLoading(true)

    // Simular carregamento
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => router.push("/homenagem"), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-bg"></div>
      </div>

      {/* Neon Grid */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        {!isLoading ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
            <motion.div
              animate={{
                boxShadow: ["0 0 20px #00ffff", "0 0 40px #00ffff", "0 0 20px #00ffff"],
              }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="mb-8 mx-auto w-24 h-24 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center"
            >
              <Heart className="h-12 w-12 text-white" />
            </motion.div>

            <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              AMORTIM v2.0
            </h1>

            <div className="text-cyan-400 font-mono text-lg mb-8 max-w-2xl mx-auto">
              <div className="border border-cyan-500/30 rounded-lg p-6 bg-black/50 backdrop-blur">
                <p className="mb-2">&gt; Inicializando protocolo de amor...</p>
                <p className="mb-2">&gt; Carregando memórias especiais...</p>
                <p className="mb-2">&gt; Preparando homenagem personalizada...</p>
                <p className="text-green-400">&gt; Sistema pronto para execução</p>
              </div>
            </div>

            <Button
              onClick={handleInitialize}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg shadow-cyan-500/25 border border-cyan-400/50"
            >
              <Zap className="mr-2 h-5 w-5" />
              INICIALIZAR SISTEMA
            </Button>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
            <div className="mb-8">
              <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <p className="text-cyan-400 font-mono mt-4">Carregando... {Math.round(progress)}%</p>
            </div>

            <div className="text-cyan-400 font-mono text-sm">
              <p>&gt; Compilando sentimentos...</p>
              <p>&gt; Renderizando memórias...</p>
              <p>&gt; Sincronizando batimentos cardíacos...</p>
            </div>
          </motion.div>
        )}
      </div>

      <style jsx>{`
        .matrix-bg {
          background-image: 
            linear-gradient(90deg, transparent 98%, #00ffff22 100%),
            linear-gradient(transparent 98%, #00ffff22 100%);
          background-size: 20px 20px;
          width: 100%;
          height: 100%;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  )
}
