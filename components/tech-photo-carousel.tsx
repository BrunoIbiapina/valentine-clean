"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export function TechPhotoCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isScanning, setIsScanning] = useState(true)

  const images = [
    "/amor1.png",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-4 shadow-2xl shadow-cyan-500/20">
        {/* Header */}
        <div className="flex justify-between items-center mb-4 pb-2 border-b border-cyan-500/20">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-cyan-400 font-mono text-sm">HOLOGRAM_VIEWER.exe</div>
          <Button variant="ghost" size="icon" className="text-cyan-400 hover:bg-cyan-500/20">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Image Display */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-black border border-cyan-500/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              <Image
                src={images[currentIndex] || "/placeholder.svg"}
                alt={`Memória ${currentIndex + 1}`}
                fill
                className="object-cover"
              />

              {/* Scanning Effect */}
              {isScanning && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                />
              )}

              {/* HUD Overlay */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-2 text-cyan-400 font-mono text-xs bg-black/50 px-2 py-1 rounded">
                  IMG_{String(currentIndex + 1).padStart(3, "0")}.jpg
                </div>
                <div className="absolute top-2 right-2 text-green-400 font-mono text-xs bg-black/50 px-2 py-1 rounded">
                  ● REC
                </div>
                <div className="absolute bottom-2 left-2 text-cyan-400 font-mono text-xs bg-black/50 px-2 py-1 rounded">
                  RESOLUÇÃO: 4K | QUALIDADE: PERFEITA
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 bg-black/50 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
              onClick={() => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 bg-black/50 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Controls */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex ? "bg-cyan-400" : "bg-gray-600"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-cyan-400 hover:bg-cyan-500/20 font-mono text-xs"
            onClick={() => setIsScanning(!isScanning)}
          >
            {isScanning ? "PARAR SCAN" : "INICIAR SCAN"}
          </Button>
        </div>
      </div>
    </div>
  )
}
