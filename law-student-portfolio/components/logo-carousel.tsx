"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface LogoCarouselProps {
  logos: {
    src: string
    alt: string
    width: number
    height: number
  }[]
}

export function LogoCarousel({ logos }: LogoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % logos.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [logos.length])

  return (
    <div className="w-full overflow-hidden py-8 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl">
      <div className="text-center mb-6">
        <h3 className="text-xl md:text-2xl font-serif font-bold text-gray-900 dark:text-gray-100">
          Affiliations & Recognitions
        </h3>
        <div className="w-16 h-1 bg-gradient-to-r from-navy to-blue mx-auto mt-2"></div>
      </div>

      <div className="flex justify-center items-center h-24 relative">
        {logos.map((logo, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 100 }}
            animate={{
              opacity: index === currentIndex ? 1 : 0,
              x: index === currentIndex ? 0 : -100,
              scale: index === currentIndex ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            className="absolute"
          >
            <Image
              src={logo.src || "/placeholder.svg"}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
              className="object-contain max-h-20"
              priority
            />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {logos.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? "bg-blue dark:bg-blue-400" : "bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

