"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, RotateCcw } from "lucide-react";
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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [captionProgress, setCaptionProgress] = useState(0);
  const [isCaptionDone, setIsCaptionDone] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  // Roda o carrossel de imagens
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Efeito de digitação da legenda
  useEffect(() => {
    if (captionIndex >= captions.length) {
      setIsCaptionDone(true);
      return;
    }

    setCaptionProgress(0);
    setIsCaptionDone(false);

    const caption = captions[captionIndex];
    const interval = setInterval(() => {
      setCaptionProgress((prev) => {
        if (prev < caption.length) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => {
            if (captionIndex < captions.length - 1) {
              setCaptionIndex((prev) => prev + 1);
            } else {
              setIsCaptionDone(true);
            }
          }, 1500);
          return caption.length;
        }
      });
    }, 60);

    return () => clearInterval(interval);
  }, [captionIndex]);

  const restartCaptions = () => {
    setCaptionIndex(0);
    setCaptionProgress(0);
    setIsCaptionDone(false);
  };

  return (
    <div className="relative">
      <div className="bg-gradient-to-br from-gray-900 to-black border border-cyan-500/30 rounded-lg p-4 shadow-2xl shadow-cyan-500/20">
        {/* HEADER */}
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

        {/* FOTO */}
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
                src={images[currentIndex]}
                alt={`Foto ${currentIndex + 1}`}
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

          {/* BOTÕES DE NAVEGAÇÃO */}
          <div className="absolute inset-y-0 left-0 flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 bg-black/50 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30"
              onClick={() =>
                setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
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
              onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* LEGENDA */}
        <div className="mt-6 bg-black border border-cyan-400/30 rounded-xl px-6 py-4 shadow-inner shadow-cyan-500/10 text-center">
          {!isCaptionDone ? (
            <p className="text-xl font-mono text-yellow-300 leading-relaxed">
              <span className="text-green-400">
                {captions[captionIndex]?.slice(0, captionProgress)}
              </span>
              <span className="text-white/30">
                {captions[captionIndex]?.slice(captionProgress)}
              </span>
            </p>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-3">
              <p className="text-cyan-400 font-mono text-base">
                Fim da mensagem. Deseja ver novamente?
              </p>
              <Button
                onClick={restartCaptions}
                className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold"
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Repetir Mensagem
              </Button>
            </div>
          )}
        </div>

        {/* INDICADORES E CONTROLE */}
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
  );
}
