"use client";

import { useState, useEffect, useRef } from "react";
import { TechPhotoCarousel } from "@/components/tech-photo-carousel";
import { ParticleSystem } from "@/components/particle-system";
import { TerminalMessage } from "@/components/terminal-message";
import { HologramCard } from "@/components/hologram-card";
import { AIChat } from "@/components/ai-chat";
import { Button } from "@/components/ui/button";
import { Volume2, VolumeX, Cpu } from "lucide-react";


export default function HomenagePage() {
  const [showContent, setShowContent] = useState(false);
  const [currentSection, setCurrentSection] = useState(0);
  const [playAudio, setPlayAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/json.mp3");
      audioRef.current.loop = true;
    }

    if (playAudio) {
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.log("Autoplay bloqueado:", err));
    } else {
      audioRef.current.pause();
    }
  }, [playAudio]);

  const sections = [
    { id: "photos", title: "GALERIA", icon: "📸" },
    { id: "message", title: "MENSAGEM CRIPTOGRAFADA", icon: "💌" },
    { id: "ai", title: "ASSISTENTE AMORTIM", icon: "🤖" },
    { id: "stats", title: "ANÁLISE DE DADOS", icon: "📊" },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <ParticleSystem />

      {/* Header */}
      <div className="relative z-20 border-b border-cyan-500/30 bg-black/80 backdrop-blur">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Cpu className="h-8 w-8 text-cyan-400" />
            <div>
              <h1 className="text-xl font-bold text-cyan-400">AMORTIM.EXE</h1>
              <p className="text-xs text-gray-400 font-mono">
                Sistema Operacional Amortim
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => setPlayAudio(!playAudio)}
            className="text-cyan-400 hover:bg-cyan-500/20"
          >
            {playAudio ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Navegação */}
      <div className="relative z-20 bg-gray-900/50 backdrop-blur border-b border-cyan-500/20">
        <div className="container mx-auto px-4">
          <div className="flex space-x-1 overflow-x-auto scrollbar-hide">
            {sections.map((section, index) => (
              <button
                key={section.id}
                onClick={() => setCurrentSection(index)}
                className={`px-4 py-2 text-sm font-mono whitespace-nowrap transition-all ${
                  currentSection === index
                    ? "bg-cyan-500/20 text-cyan-400 border-b-2 border-cyan-400"
                    : "text-gray-400 hover:text-cyan-400"
                }`}
              >
                {section.icon} {section.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-full overflow-x-hidden">
        {showContent && (
          <>
            {currentSection === 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <TechPhotoCarousel />
                <div className="space-y-6">
                  <HologramCard title="STATUS DO SISTEMA">
                    <div className="space-y-2 font-mono text-sm">
                      <div className="flex justify-between">
                        <span>Nível de Amor:</span>
                        <span className="text-green-400">∞ (OVERFLOW)</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Felicidade:</span>
                        <span className="text-green-400">100%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Conexão:</span>
                        <span className="text-green-400">MÁXIMA</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-cyan-400">APAIXONADO</span>
                      </div>
                    </div>
                  </HologramCard>
                </div>
              </div>
            )}

            {currentSection === 1 && (
              <div className="max-w-4xl mx-auto">
                <TerminalMessage />
              </div>
            )}

            {currentSection === 2 && (
              <div className="max-w-4xl mx-auto">
                <AIChat />
              </div>
            )}

            {currentSection === 3 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <HologramCard title="TEMPO JUNTOS">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-cyan-400 mb-2">
                      {17 * 365 + Math.floor(17 / 4)}
                    </div>
                    <div className="text-sm text-gray-400">
                      dias ao seu lado — e contando
                    </div>
                  </div>
                </HologramCard>

                <HologramCard title="MEMÓRIAS CRIADAS">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-400 mb-2">
                      {Math.floor(Math.random() * 1000) + 500}
                    </div>
                    <div className="text-sm text-gray-400">
                      momentos especiais
                    </div>
                  </div>
                </HologramCard>

                <HologramCard title="SORRISOS CAUSADOS">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-400 mb-2">
                      ∞
                    </div>
                    <div className="text-sm text-gray-400">
                      impossível contar
                    </div>
                  </div>
                </HologramCard>
              </div>
            )}
          </>
        )}
      </div>

      {/* Rodapé */}
      <div className="relative z-20 border-t border-cyan-500/30 bg-black/80 backdrop-blur mt-16">
        <div className="container mx-auto px-4 py-6 text-center">
          <p className="text-cyan-400 font-mono text-sm mb-2">
            &gt; Sistema desenvolvido com 💙 para meu amor
          </p>
          <p className="text-gray-400 text-xs">
            AMORTIM v2.0 | Runtime: Para sempre
          </p>
        </div>
      </div>
    </div>
  );
}
