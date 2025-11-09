"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface InputSectionProps {
  onParse: (input: string) => void
}

export default function InputSection({ onParse }: InputSectionProps) {
  const [input, setInput] = useState("")

  const handleParse = () => {
    onParse(input)
  }

  const handleClear = () => {
    setInput("")
    onParse("")
  }

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="bulk-input" className="block text-sm font-semibold text-foreground mb-3">
          Paste your order data
        </label>
        <textarea
          id="bulk-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="alice.smith@gmail.com - orderID#TM12345/AA1&#10;bob.jones@yahoo.com - order of SG98765/B12&#10;carol.white@outlook.com - OrderId#AXS54321/C3"
          className="w-full h-40 p-4 border border-border rounded-lg font-mono text-sm bg-background text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
        />
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleParse}
          disabled={!input.trim()}
          className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-lg text-primary-foreground font-semibold h-11 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
        >
          ✨ Parse Orders
        </Button>
        <Button
          onClick={handleClear}
          variant="outline"
          className="px-6 h-11 border border-border text-foreground font-medium rounded-xl hover:bg-accent/10 transition-all duration-200 bg-transparent hover:shadow-md"
        >
          ✕ Clear
        </Button>
      </div>
    </div>
  )
}
