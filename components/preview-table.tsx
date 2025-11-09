"use client"

interface PreviewTableProps {
  data: Array<{
    name: string
    orderId: string
  }>
}

export default function PreviewTable({ data }: PreviewTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-background/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-primary/5 border-b border-border">
            <th className="px-6 py-4 text-left font-semibold text-foreground">Name</th>
            <th className="px-6 py-4 text-left font-semibold text-foreground">Order ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((order, index) => (
            <tr
              key={index}
              className="border-b border-border/50 hover:bg-primary/5 transition-colors duration-150 animate-fadeInUp"
              style={{ animationDelay: `${index * 30}ms` }}
            >
              <td className="px-6 py-4 text-foreground font-medium">{order.name}</td>
              <td className="px-6 py-4 font-mono text-foreground/80 break-all">{order.orderId}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
