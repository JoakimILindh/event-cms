import { cn } from "@/lib/utils"

export const PageHeadline = ({ children, className }) => {
  return (
    <h1 className={cn("text-6xl font-bold text-center mb-10 capitalize", className)}>{ children }</h1>
  )
}