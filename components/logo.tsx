import { Linkedin } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
  size?: "sm" | "md" | "lg"
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const iconSize = size === "sm" ? "h-5 w-5" : size === "lg" ? "h-8 w-8" : "h-6 w-6"
  const textSize = size === "sm" ? "text-lg" : size === "lg" ? "text-2xl" : "text-xl"

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="rounded-md bg-primary p-1 flex items-center justify-center">
        <Linkedin className={cn("text-primary-foreground", iconSize)} />
      </div>
      {showText && (
        <span className={cn("font-poppins font-bold", textSize)}>
          <span className="text-primary">LinkedIn</span> Content Manager
        </span>
      )}
    </div>
  )
}
