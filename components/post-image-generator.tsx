"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"

interface PostImageGeneratorProps {
  title: string
  content: string
  visualType: string
  backgroundColor: string
  layout: string
}

export function PostImageGenerator({
  title = "Machine Learning Optimization",
  content = "Optimize your ML models with these proven techniques that can improve performance by up to 20% while reducing computational costs.",
  visualType = "grid",
  backgroundColor = "#1C2526",
  layout = "centered",
}: PostImageGeneratorProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [imageUrl, setImageUrl] = useState<string>("")

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 1200
    canvas.height = 675

    // Draw background
    ctx.fillStyle = backgroundColor
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add subtle pattern if not using plain background
    if (backgroundColor === "#1C2526" && visualType === "grid") {
      drawHexagonalGrid(ctx, canvas.width, canvas.height)
    }

    // Draw content based on layout and visual type
    if (layout === "centered") {
      drawCenteredLayout(ctx, title, content, canvas.width, canvas.height)
    } else if (layout === "grid" && visualType === "grid") {
      drawGridLayout(ctx, title, content, canvas.width, canvas.height)
    }

    // Add branding
    drawBranding(ctx, canvas.width, canvas.height)

    // Convert canvas to image URL
    setImageUrl(canvas.toDataURL("image/png"))
  }, [title, content, visualType, backgroundColor, layout])

  const drawHexagonalGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    ctx.strokeStyle = "rgba(46, 204, 113, 0.1)"
    ctx.lineWidth = 1

    const hexSize = 40
    const rows = Math.ceil(height / (hexSize * 1.5)) + 1
    const cols = Math.ceil(width / (hexSize * Math.sqrt(3))) + 1

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = c * hexSize * Math.sqrt(3)
        const y = r * hexSize * 1.5

        ctx.beginPath()
        for (let i = 0; i < 6; i++) {
          const angle = ((2 * Math.PI) / 6) * i
          const xPos = x + hexSize * Math.cos(angle)
          const yPos = y + hexSize * Math.sin(angle)

          if (i === 0) {
            ctx.moveTo(xPos, yPos)
          } else {
            ctx.lineTo(xPos, yPos)
          }
        }
        ctx.closePath()
        ctx.stroke()
      }
    }
  }

  const drawCenteredLayout = (
    ctx: CanvasRenderingContext2D,
    title: string,
    content: string,
    width: number,
    height: number,
  ) => {
    // Set text styles
    ctx.textAlign = "center"
    ctx.fillStyle = "#FFFFFF"

    // Draw title
    ctx.font = "bold 48px Poppins"
    const titleLines = getLines(ctx, title, width * 0.8)
    let y = height / 2 - (titleLines.length * 60) / 2

    titleLines.forEach((line) => {
      ctx.fillText(line, width / 2, y)
      y += 60
    })

    // Draw divider
    ctx.fillStyle = "#2ECC71"
    ctx.fillRect(width / 2 - 80, y + 20, 160, 4)

    // Draw content
    ctx.font = "24px Poppins"
    ctx.fillStyle = "#FFFFFF"
    const contentLines = getLines(ctx, content, width * 0.7)
    y += 60

    contentLines.forEach((line) => {
      ctx.fillText(line, width / 2, y)
      y += 36
    })
  }

  const drawGridLayout = (
    ctx: CanvasRenderingContext2D,
    title: string,
    content: string,
    width: number,
    height: number,
  ) => {
    // Set text styles
    ctx.textAlign = "center"
    ctx.fillStyle = "#FFFFFF"

    // Draw title
    ctx.font = "bold 40px Poppins"
    const titleLines = getLines(ctx, title, width * 0.8)
    let y = 80

    titleLines.forEach((line) => {
      ctx.fillText(line, width / 2, y)
      y += 50
    })

    // Draw content
    ctx.font = "24px Poppins"
    ctx.fillStyle = "#FFFFFF"
    const contentLines = getLines(ctx, content, width * 0.7)
    y += 20

    contentLines.forEach((line) => {
      ctx.fillText(line, width / 2, y)
      y += 36
    })

    // Draw divider
    ctx.fillStyle = "#2ECC71"
    ctx.fillRect(width / 2 - 80, y + 20, 160, 4)

    // Draw grid items
    const gridItems = [
      { title: "Hyperparameter Tuning", content: "Systematically search for optimal parameters" },
      { title: "Feature Selection", content: "Remove irrelevant features to reduce noise" },
      { title: "Model Pruning", content: "Eliminate redundant neurons or branches" },
      { title: "Quantization", content: "Reduce precision of weights for faster inference" },
    ]

    const gridWidth = width * 0.8
    const itemWidth = gridWidth / 2 - 20
    const itemHeight = 120
    const startX = (width - gridWidth) / 2
    const startY = y + 60

    gridItems.forEach((item, index) => {
      const row = Math.floor(index / 2)
      const col = index % 2

      const x = startX + col * (itemWidth + 40)
      const y = startY + row * (itemHeight + 20)

      // Draw item background
      ctx.fillStyle = "rgba(255, 255, 255, 0.1)"
      ctx.fillRect(x, y, itemWidth, itemHeight)

      // Draw item title
      ctx.font = "bold 20px Poppins"
      ctx.fillStyle = "#2ECC71"
      ctx.textAlign = "left"
      ctx.fillText(item.title, x + 15, y + 30)

      // Draw item content
      ctx.font = "16px Poppins"
      ctx.fillStyle = "#FFFFFF"
      const itemContentLines = getLines(ctx, item.content, itemWidth - 30)
      let contentY = y + 60

      itemContentLines.forEach((line) => {
        ctx.fillText(line, x + 15, contentY)
        contentY += 24
      })
    })
  }

  const drawBranding = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Draw branding background
    ctx.fillStyle = "rgba(28, 37, 38, 0.8)"
    ctx.fillRect(width - 220, height - 60, 200, 40)

    // Draw name
    ctx.font = "14px Poppins"
    ctx.fillStyle = "#FFFFFF"
    ctx.textAlign = "right"
    ctx.fillText("Ehtisham Sadiq", width - 70, height - 30)

    // Draw avatar placeholder (in a real implementation, you'd load the actual image)
    ctx.fillStyle = "#2ECC71"
    ctx.beginPath()
    ctx.arc(width - 35, height - 30, 25, 0, Math.PI * 2)
    ctx.fill()

    // Draw avatar border
    ctx.strokeStyle = "#2ECC71"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(width - 35, height - 30, 23, 0, Math.PI * 2)
    ctx.stroke()
  }

  const getLines = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    const words = text.split(" ")
    const lines: string[] = []
    let currentLine = words[0]

    for (let i = 1; i < words.length; i++) {
      const word = words[i]
      const width = ctx.measureText(currentLine + " " + word).width

      if (width < maxWidth) {
        currentLine += " " + word
      } else {
        lines.push(currentLine)
        currentLine = word
      }
    }

    lines.push(currentLine)
    return lines
  }

  const handleDownload = () => {
    const link = document.createElement("a")
    link.download = "linkedin-post.png"
    link.href = imageUrl
    link.click()
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[16/9] overflow-hidden rounded-lg border">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      </div>
      <div className="flex justify-end">
        <Button onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download Image
        </Button>
      </div>
    </div>
  )
}
