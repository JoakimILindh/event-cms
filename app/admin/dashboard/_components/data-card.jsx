import { cn } from "@/lib/utils"

export const DataCard = ({ className, data, text}) => {
  return (
    <div className={cn("border h-36 rounded-lg bg-slate-500/10 flex items-center justify-center gap-4 text-2xl", className)}>
      <p>{ data }</p>
      <p className="capitalize">{ text }</p>
    </div>
  )
}