"use client"

import { useState } from "react"
import InputSection from "@/components/input-section"
import PreviewTable from "@/components/preview-table"
import ExportActions from "@/components/export-actions"

interface ParsedOrder {
  name: string
  orderId: string
}

export default function Home() {
  const [parsedData, setParsedData] = useState<ParsedOrder[]>([])
  const [rawInput, setRawInput] = useState("")

  const handleParse = (input: string) => {
    setRawInput(input)
    const lines = input.split("\n")
    const orders: ParsedOrder[] = []

    lines.forEach((line) => {
      const trimmed = line.trim()
      if (!trimmed) return

      const match = trimmed.match(/^(.+?)\s*-\s*(.+?)$/)
      if (match) {
        const name = match[1].trim()
        let orderData = match[2].trim()

        orderData = orderData
          .replace(/^orderid\s*[#:]*\s*/i, "")
          .replace(/^order\s+of\s+/i, "")
          .replace(/^order\s*[#:]*\s*/i, "")
          .trim()

        if (orderData) {
          orders.push({
            name: name,
            orderId: orderData,
          })
        }
      }
    })

    setParsedData(orders)
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-background py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 animate-slideDown">
          <div className="inline-block mb-4">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">Order Parser</span>
          </div>
          <h1 className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-secondary mb-3">
            Parse Orders Fast
          </h1>
          <p className="text-lg text-foreground/60">Bulk parse and export order data in seconds</p>
        </div>

        {/* Main Container */}
        <div className="bg-card rounded-2xl shadow-lg border border-border p-8 space-y-8 animate-fadeInUp">
          {/* Input Section */}
          <InputSection onParse={handleParse} />

          {/* Preview Section */}
          {parsedData.length > 0 && (
            <>
              <div className="border-t border-border pt-8 animate-fadeInUp">
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse-glow"></div>
                    <h2 className="text-2xl font-semibold text-foreground">Orders Ready ({parsedData.length})</h2>
                  </div>
                  <p className="text-sm text-foreground/60">
                    Successfully parsed {parsedData.length} order{parsedData.length !== 1 ? "s" : ""} - ready to export
                  </p>
                </div>
                <PreviewTable data={parsedData} />
              </div>

              {/* Export Actions */}
              <div className="border-t border-border pt-8">
                <ExportActions data={parsedData} />
              </div>
            </>
          )}

          {/* Empty State */}
          {parsedData.length === 0 && rawInput && (
            <div className="border-t border-border pt-8">
              <div className="text-center py-12">
                <div className="text-4xl mb-4">⚠️</div>
                <p className="text-foreground/80 font-medium">No valid orders found</p>
                <p className="text-sm text-foreground/50 mt-2">Expected format: name/email - orderID</p>
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-foreground/40">
            Developed by <span className="font-semibold text-foreground/60">Genesis Grant Vivero</span>
          </p>
          <p className="text-xs text-foreground/30 mt-2">
            Works with: alice.smith@gmail.com - TM12345/AA1 or genesis - orderID#nev-1212121212/ress
          </p>
        </div>
      </div>
    </main>
  )
}
