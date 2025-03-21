import { Scale } from "lucide-react"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "white"
}

export function Logo({ size = "md", variant = "default" }: LogoProps) {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-3xl",
  }

  const colorClasses = {
    default: "text-navy dark:text-blue",
    white: "text-white",
  }

  return (
    <div className={`font-serif font-bold flex items-center ${sizeClasses[size]} ${colorClasses[variant]}`}>
      <div className="mr-2 flex items-center justify-center">
        <Scale className="h-6 w-6" />
      </div>
      <span>S Datta</span>
    </div>
  )
}

