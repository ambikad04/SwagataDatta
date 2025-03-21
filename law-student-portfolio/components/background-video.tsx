"use client"

import { useEffect, useRef, useState } from "react"

interface BackgroundVideoProps {
  videoSrc: string
  fallbackImageSrc: string
  overlayOpacity?: number
}

export function BackgroundVideo({ videoSrc, fallbackImageSrc, overlayOpacity = 0.5 }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleCanPlay = () => {
      setIsVideoLoaded(true)
    }

    video.addEventListener("canplay", handleCanPlay)

    // Try to play the video (may be blocked by browser autoplay policies)
    video.play().catch((error) => {
      console.log("Autoplay prevented:", error)
    })

    return () => {
      video.removeEventListener("canplay", handleCanPlay)
    }
  }, [])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* Fallback image that shows until video loads */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${isVideoLoaded ? "opacity-0" : "opacity-100"}`}
        style={{ backgroundImage: `url(${fallbackImageSrc})` }}
      />

      {/* Video background */}
      <video ref={videoRef} className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* Overlay to darken video and improve text readability */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary/30 to-primary/10"
        style={{ opacity: overlayOpacity }}
      />

      {/* Additional decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.1),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(21,61,132,0.1),transparent_70%)]" />
    </div>
  )
}

