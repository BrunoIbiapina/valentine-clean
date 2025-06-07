"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { PenLine, Check } from "lucide-react"
import { motion } from "framer-motion"

export function MessageCard() {
  const [isEditing, setIsEditing] = useState(false)
  const [message, setMessage] = useState(
    `Meu amor,

Desde o primeiro dia em que te conheci, minha vida se encheu de cores e alegria. Cada momento ao seu lado é especial e único.

Você é a pessoa mais incrível que já conheci, e sou grato todos os dias por ter você em minha vida.

Neste Dia dos Namorados, quero te dizer mais uma vez o quanto você é importante para mim e quanto te amo.`,
  )

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5 }}
    >
      <Card className="shadow-lg border-red-200 bg-white/90 backdrop-blur">
        <CardContent className="pt-6 relative">
          {isEditing ? (
            <>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="min-h-[300px] font-handwriting text-lg"
              />
              <Button
                variant="outline"
                size="sm"
                className="absolute top-2 right-2"
                onClick={() => setIsEditing(false)}
              >
                <Check className="h-4 w-4 mr-1" /> Salvar
              </Button>
            </>
          ) : (
            <>
              <div className="whitespace-pre-wrap font-handwriting text-lg">{message}</div>
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
                onClick={() => setIsEditing(true)}
              >
                <PenLine className="h-4 w-4" />
                <span className="sr-only">Editar mensagem</span>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}
