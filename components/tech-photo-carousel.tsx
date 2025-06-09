"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const images = [
  "/amor1.png", "/amor2.png", "/amor4.png", "/amor5.png",
  "/amor6.png", "/amor7.png", "/amor8.png", "/amor9.png",
  "/amor10.png", "/amor11.png", "/amor12.png", "/amor13.png",
  "/amor14.png", "/amor15.png", "/amor16.png", "/amor17.png",
];

const captions = [
  "Amortim, obrigado por sempre estar ao meu lado, por vibrar comigo nas conquistas e me apoiar nas dúvidas.",
  "Você é meu ponto de equilíbrio e meu motivo de sorriso no meio da correria.",
  "Essas fotos são só um pedacinho da nossa história — flashes de momentos que marcaram a nossa caminhada.",
  "Fizeram a gente rir, chorar, crescer e amar mais ainda.",
  "E o mais bonito é saber que isso tudo é só o começo.",
  "Ainda quero viver tantas coisas com você...",
  "Lugares novos, sonhos antigos, planos inesperados — tudo isso com sua mão na minha.",
  "Obrigado por me fazer sentir que não estou sozinho nessa jornada.",
  "Te amo mais do que consigo escrever.",
  "Por isso, deixo essas imagens falarem um pouco por mim.",
];

export function TechPhotoCarousel() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(0);
  const [captionProgress, setCaptionProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(true);

  // Troca automática de imagem
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Troca automática de legenda (independente da imagem)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaptionIndex((prev) => (prev + 1) % captions.length);
      setCaptionProgress(0);
    }, 7000); // legenda troca a cada 7s
    return () => clearInterval(interval);
  }, []);

  // Efeito de digitação da legenda
  useEffect(() => {
    const caption = captions[currentCaptionIndex];
    if (!caption) return;

    const interval = setInterval(() => {
      setCaptionProgress((prev) => {
        if (prev < caption.length) return prev + 1;
        clearInterval(interval);
        return caption.length;
      });
    }, 40);

    return () => clearInterval(interval);
  }, [currentCaptionIndex]);

  const goTo = (index: number) => {
    setCurrentImageIndex(index);
  };

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

        {/* Imagem */}
        <div className="relative aspect-square rounded-lg overflow-hidden bg-black border border-cyan-500/20">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="w-full h-full relative"
            >
              <Image
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={`Foto ${currentImageIndex + 1}`}
                fill
                className="object-cover"
              />

              {isScanning && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                  animate={{ y: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              )}

              {/* HUD */}
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-2 left-2 text-cyan-400 font-mono text-xs bg-black/50 px-2 py-1 rounded">
                  IMG_{String(currentImageIndex + 1).padStart(3, "0")}.jpg
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

          {/* Legenda com efeito karaokê */}
          <div className="absolute bottom-8 w-full text-center">
            <p className="text-yellow-300 font-mono text-lg sm:text-3xl md:text-4xl px-6 drop-shadow-lg leading-snug">
              <span className="text-green-400">
                {captions[currentCaptionIndex]?.slice(0, captionProgress)}
              </span>
              <span className="text-white/30">
                {captions[currentCaptionIndex]?.slice(captionProgress)}
              </span>
            </p>
          </div>

          {/* Navegação */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 bg-black/50 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
              onClick={() =>
                goTo(currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1)
              }
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="mr-2 bg-black/50 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
              onClick={() => goTo((currentImageIndex + 1) % images.length)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Rodapé */}
        <div className="mt-4 flex justify-between items-center">
          <div className="flex space-x-1">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex ? "bg-cyan-400" : "bg-gray-600"
                }`}
                onClick={() => goTo(index)}
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
  );
}
