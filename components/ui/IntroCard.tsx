"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export function IntroCard() {
  const [visible, setVisible] = useState(true);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <motion.div
            animate={{
              boxShadow: [
                "0 0 10px #00ffff",
                "0 0 20px #00ffff",
                "0 0 30px #00ffff",
                "0 0 20px #00ffff",
                "0 0 10px #00ffff"
              ],
            }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="relative w-[90vw] max-w-md bg-black/90 border border-cyan-400 rounded-xl p-6 shadow-lg backdrop-blur-lg"
          >
            {/* Botão de fechar */}
            <button
              onClick={() => setVisible(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
            >
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-cyan-400 text-lg font-bold mb-4 text-center">
              Boas-vindas ao AMORTIM 💙
            </h2>

            <div className="text-gray-300 text-sm space-y-2 text-left">
              <p>🎧 Aumente o som no canto superior direito</p>
              <p>📸 Veja nossa história na <strong>GALERIA</strong></p>
              <p>💌 Leia a <strong>MENSAGEM CRIPTOGRAFADA</strong></p>
              <p>🤖 Fale com o <strong>ASSISTENTE AMORTIM</strong></p>
              <p>📊 Descubra <strong>há quantos dias estamos juntos</strong> na Análise de Dados</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
