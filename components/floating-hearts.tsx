"use client"
import { useEffect, useRef } from "react"

interface Heart {
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  color: string
}

const FloatingHearts = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Heart properties
    const hearts: Heart[] = []
    const heartCount = Math.min(30, Math.floor((window.innerWidth * window.innerHeight) / 30000))

    // Heart colors
    const colors = [
      "#ffb6c1", // Light pink
      "#ffc0cb", // Pink
      "#ff69b4", // Hot pink
      "#da70d6", // Orchid
      "#dda0dd", // Plum
      "#ee82ee", // Violet
    ]

    // Create hearts
    for (let i = 0; i < heartCount; i++) {
      hearts.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 15 + 5,
        speed: Math.random() * 1 + 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }

    // Draw heart shape
    const drawHeart = (
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      color: string,
      opacity: number,
    ) => {
      ctx.save()
      ctx.globalAlpha = opacity
      ctx.fillStyle = color
      ctx.beginPath()

      // Heart shape bezier curves
      ctx.moveTo(x, y + size / 4)

      // Left curve
      ctx.bezierCurveTo(x - size / 2, y - size / 2, x - size, y, x, y + size)

      // Right curve
      ctx.bezierCurveTo(x + size, y, x + size / 2, y - size / 2, x, y + size / 4)

      ctx.closePath()
      ctx.fill()
      ctx.restore()
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update hearts
      hearts.forEach((heart) => {
        drawHeart(
          ctx,
          heart.x,
          heart.y,
          heart.size,
          heart.color,
          heart.opacity * (0.5 + Math.sin(Date.now() * 0.001) * 0.2),
        )

        // Move heart upward
        heart.y -= heart.speed

        // Add slight horizontal movement
        heart.x += Math.sin(Date.now() * 0.001 + hearts.indexOf(heart)) * 0.5

        // Reset position if heart goes off screen
        if (heart.y < -heart.size) {
          heart.y = canvas.height + heart.size
          heart.x = Math.random() * canvas.width
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />
}

export default FloatingHearts
