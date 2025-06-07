"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface Heart {
  id: number
  x: number
  size: number
  duration: number
  delay: number
}

export function HeartAnimation() {
  const [hearts, setHearts] = useState<Heart[]>([])

  useEffect(() => {
    // Criar corações iniciais
    const initialHearts = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // posição horizontal em porcentagem
      size: Math.random() * 20 + 10, // tamanho entre 10px e 30px
      duration: Math.random() * 10 + 10, // duração entre 10s e 20s
      delay: Math.random() * 5, // atraso inicial entre 0s e 5s
    }))

    setHearts(initialHearts)

    // Adicionar novos corações periodicamente
    const interval = setInterval(() => {
      setHearts((prevHearts) => [
        ...prevHearts,
        {
          id: Date.now(),
          x: Math.random() * 100,
          size: Math.random() * 20 + 10,
          duration: Math.random() * 10 + 10,
          delay: 0,
        },
      ])
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="absolute bottom-0 text-red-500"
          style={{ left: `${heart.x}%` }}
          initial={{ y: "100vh", opacity: 0 }}
          animate={{
            y: "-100vh",
            opacity: [0, 1, 1, 0],
            x: [0, Math.random() * 100 - 50],
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "linear",
            times: [0, 0.1, 0.9, 1],
          }}
        >
          <svg
            width={heart.size}
            height={heart.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
