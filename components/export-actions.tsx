"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"

interface ExportActionsProps {
  data: Array<{
    name: string
    orderId: string
  }>
}

export default function ExportActions({ data }: ExportActionsProps) {
  const [copied, setCopied] = useState(false)
  const [exporting, setExporting] = useState(false)

  const handleCopyToClipboard = async () => {
    try {
      const headers = ["Name", "Order ID"]
      const rows = data.map((order) => [order.name, order.orderId])
      const csv = [headers, ...rows].map((row) => row.join("\t")).join("\n")

      await navigator.clipboard.writeText(csv)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleExportToExcel = async () => {
    try {
      setExporting(true)
      const { write, utils } = await import("xlsx")

      const worksheet = utils.json_to_sheet(data)
      const workbook = utils.book_new()
      utils.book_append_sheet(workbook, worksheet, "Orders")

      worksheet["!cols"] = [{ wch: 30 }, { wch: 30 }]

      write(workbook, { bookType: "xlsx", type: "binary", filename: "orders.xlsx" })
    } catch (err) {
      console.error("Failed to export:", err)
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="flex gap-3 flex-wrap animate-fadeInUp">
      <Button
        onClick={handleCopyToClipboard}
        className={`flex-1 min-w-40 h-11 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 ${
          copied
            ? "bg-emerald-500/90 hover:bg-emerald-600 text-white shadow-lg"
            : "bg-gradient-to-r from-primary to-accent hover:shadow-lg text-white shadow-md"
        }`}
      >
        {copied ? "✓ Copied" : "📋 Copy to Clipboard"}
      </Button>
      <Button
        onClick={handleExportToExcel}
        disabled={exporting}
        className="flex-1 min-w-40 h-11 bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg text-secondary-foreground font-semibold rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md"
      >
        {exporting ? "⏳ Exporting..." : "📊 Export to Excel"}
      </Button>
    </div>
  )
}
