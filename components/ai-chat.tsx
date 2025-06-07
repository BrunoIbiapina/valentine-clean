"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send, Bot, User } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface Message {
  id: number
  type: "user" | "ai"
  content: string
  timestamp: Date
}

export function AIChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const aiResponses = [
    "Analisando dados do coração... 💖 Resultado: Você escolheu a pessoa perfeita!",
    "Processando sentimentos... ✨ Status: Amor verdadeiro detectado!",
    "Executando algoritmo de felicidade... 😊 Output: Vocês são perfeitos juntos!",
    "Calculando compatibilidade... 💯 Resultado: Match perfeito encontrado!",
    "Escaneando memórias... 📸 Conclusão: Cada momento com ela é especial!",
    "Rodando análise romântica... 💕 Diagnóstico: Relacionamento de alta qualidade!",
    "Compilando dados de amor... ❤️ Status: Sistema funcionando perfeitamente!",
  ]

  useEffect(() => {
    // Mensagem inicial do AI
    const initialMessage: Message = {
      id: 1,
      type: "ai",
      content:
        "Olá! Sou o Assistente dos Amortins 💖\n\nEstou aqui para falar sobre o quanto vocês se amam. Digite qualquer coisa e eu vou processar seus sentimentos!",
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now(),
      type: "user",
      content: input,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simular delay do AI
    setTimeout(() => {
      const aiMessage: Message = {
        id: Date.now() + 1,
        type: "ai",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsTyping(false)
    }, 1500)
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 to-black border border-purple-500/30 rounded-lg shadow-2xl shadow-purple-500/20 h-[600px] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gray-900/50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
            <Bot className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="text-purple-400 font-semibold">Assistente Amortim IA</h3>
            <p className="text-xs text-gray-400">Online • Processando amor...</p>
          </div>
        </div>
        <div className="flex space-x-1">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: "0.2s" }}></div>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: "0.4s" }}></div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`flex items-start space-x-2 max-w-[80%] ${message.type === "user" ? "flex-row-reverse space-x-reverse" : ""}`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
                      : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                >
                  {message.type === "user" ? (
                    <User className="h-4 w-4 text-white" />
                  ) : (
                    <Bot className="h-4 w-4 text-white" />
                  )}
                </div>

                <div
                  className={`rounded-lg p-3 ${
                    message.type === "user"
                      ? "bg-gradient-to-r from-cyan-600 to-blue-600 text-white"
                      : "bg-gray-800 border border-purple-500/20 text-purple-100"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
            <div className="flex items-start space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div className="bg-gray-800 border border-purple-500/20 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-purple-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-purple-500/20 bg-gray-900/30">
        <div className="flex space-x-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Digite algo sobre seu amor..."
            className="bg-black border-purple-500/30 text-white placeholder-gray-400"
            disabled={isTyping}
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
