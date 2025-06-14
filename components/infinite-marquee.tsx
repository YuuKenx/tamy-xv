"use client"
import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface MarqueeProps {
  className?: string
  direction?: "left" | "right"
  speed?: "slow" | "normal" | "fast"
  pauseOnHover?: boolean
}

export default function InfiniteMarquee({
  className,
  direction = "left",
  speed = "normal",
  pauseOnHover = true,
}: MarqueeProps) {
  const [isHovering, setIsHovering] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)

  // Logos de ejemplo - en un caso real, estos vendrían de una API o CMS
  const logos = [
    { id: 1, name: "Acme Inc", url: "/placeholder.svg?height=60&width=120&text=ACME" },
    { id: 2, name: "TechCorp", url: "/placeholder.svg?height=60&width=120&text=TECHCORP" },
    { id: 3, name: "Globex", url: "/placeholder.svg?height=60&width=120&text=GLOBEX" },
    { id: 4, name: "Initech", url: "/placeholder.svg?height=60&width=120&text=INITECH" },
    { id: 5, name: "Umbrella", url: "/placeholder.svg?height=60&width=120&text=UMBRELLA" },
    { id: 6, name: "Stark Industries", url: "/placeholder.svg?height=60&width=120&text=STARK" },
    { id: 7, name: "Wayne Enterprises", url: "/placeholder.svg?height=60&width=120&text=WAYNE" },
    { id: 8, name: "Cyberdyne", url: "/placeholder.svg?height=60&width=120&text=CYBERDYNE" },
  ]

  // Duplicamos los logos para crear el efecto infinito
  const allLogos = [...logos, ...logos]

  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.scrollWidth / 2)
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.scrollWidth / 2)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Determinar la duración de la animación basada en la velocidad
  const getDuration = () => {
    const baseDuration = containerWidth / 50 // Ajustar según sea necesario
    const speedMultiplier = {
      slow: 2,
      normal: 1,
      fast: 0.5,
    }
    return baseDuration * speedMultiplier[speed]
  }

  return (
    <div
      className={cn("w-full overflow-hidden relative", className)}
      onMouseEnter={() => pauseOnHover && setIsHovering(true)}
      onMouseLeave={() => pauseOnHover && setIsHovering(false)}
    >
      <div
        ref={containerRef}
        className="flex items-center whitespace-nowrap"
        style={{
          transform: `translateX(${direction === "right" ? "-" : ""}${containerWidth}px)`,
          animationName: `scroll-${direction}`,
          animationDuration: `${getDuration()}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationPlayState: isHovering ? "paused" : "running",
        }}
      >
        {allLogos.map((logo, index) => (
          <div key={`${logo.id}-${index}`} className="flex-shrink-0 mx-8 py-4 flex items-center justify-center">
            <Image
              src={logo.url || "/placeholder.svg"}
              alt={logo.name}
              width={120}
              height={60}
              className="h-12 md:h-16 w-auto object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx global>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-${containerWidth}px);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-${containerWidth}px);
          }
          100% {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
