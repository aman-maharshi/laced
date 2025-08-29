"use client"

import { useRouter } from "next/navigation"

interface LogoProps {
  variant?: "dark" | "light"
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export default function Logo({ variant = "dark", size = "md", showText = true }: LogoProps) {
  const router = useRouter()

  const handleLogoClick = () => {
    router.push("/")
  }

  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8",
    lg: "w-10 h-10"
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-xl"
  }

  const bgColor = variant === "dark" ? "bg-dark-900" : "bg-light-100"
  const hoverBgColor = variant === "dark" ? "hover:bg-dark-700" : "hover:bg-light-200"
  const textColor = variant === "dark" ? "text-light-100" : "text-dark-900"

  return (
    <div className={`flex items-center ${showText ? "space-x-3" : ""}`}>
      <div
        className={`${sizeClasses[size]} ${bgColor} rounded-lg flex items-center justify-center cursor-pointer ${hoverBgColor} transition-colors`}
        onClick={handleLogoClick}
      >
        <img src={variant === "dark" ? "/logo.png" : "/logo-dark.png"} alt="Laced" className={sizeClasses[size]} />
      </div>
      {showText && <span className={`${textSizes[size]} font-bold ${textColor}`}>Laced</span>}
    </div>
  )
}
