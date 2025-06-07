"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Edit3, Save, Terminal } from "lucide-react"

export function TerminalMessage() {
  const [isEditing, setIsEditing] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  const originalMessage = `> Inicializando protocolo de amor...
> Carregando memórias do coração...
> Descriptografando sentimentos...

MENSAGEM DECODIFICADA:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Feliz Dia dos Namorados!
Que tal receber uma menssagem especial de forma diferente? kkkk 
> Processando mensagem...
> Mensagem processada com sucesso!
> Exibindo mensagem...
Hoje é só mais um motivo pra te lembrar o quanto você é importante pra mim.
Estar com você é leve e me faz bem. Gosto da nossa conexão, das risadas, das conversas e da tranquilidade que a gente tem juntos.
Obrigado por ser parceria e por estar sempre presente.
Te amo!`

  const [message, setMessage] = useState(originalMessage)

  useEffect(() => {
    if (isTyping) {
      let index = 0
      const timer = setInterval(() => {
        if (index < originalMessage.length) {
          setDisplayText(originalMessage.slice(0, index + 1))
          index++
        } else {
          setIsTyping(false)
          clearInterval(timer)
        }
      }, 30)

      return () => clearInterval(timer)
    }
  }, [isTyping, originalMessage])

  return (
    <div className="bg-black border border-green-500/30 rounded-lg shadow-2xl shadow-green-500/20">
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-4 border-b border-green-500/20 bg-gray-900/50">
        <div className="flex items-center space-x-2">
          <Terminal className="h-5 w-5 text-green-400" />
          <span className="text-green-400 font-mono text-sm">amortim.exe</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="p-6">
        {!isEditing ? (
          <div className="relative">
            <pre className="text-green-400 font-mono text-sm leading-relaxed whitespace-pre-wrap">
              {isTyping ? displayText : message}
              {isTyping && <span className="animate-pulse bg-green-400 text-black">█</span>}
            </pre>

            {!isTyping && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-green-400 hover:bg-green-500/20"
                onClick={() => setIsEditing(true)}
              >
                <Edit3 className="h-4 w-4" />
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-4">
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="min-h-[400px] bg-black border-green-500/30 text-green-400 font-mono text-sm"
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="text-gray-400 hover:bg-gray-500/20"
                onClick={() => {
                  setIsEditing(false)
                  setDisplayText(message)
                }}
              >
                Cancelar
              </Button>
              <Button
                size="sm"
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => {
                  setIsEditing(false)
                  setDisplayText(message)
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Terminal Footer */}
      <div className="px-6 py-3 border-t border-green-500/20 bg-gray-900/30">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-green-400">{isTyping ? "Executando..." : "Processo concluído"}</span>
          <span className="text-gray-400">
            Linhas: {message.split("\n").length} | Chars: {message.length}
          </span>
        </div>
      </div>
    </div>
  )
}
