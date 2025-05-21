"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FileUp, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Papa from "papaparse"

interface CsvUploaderProps {
  onUpload: (data: any[]) => void
}

export function CsvUploader({ onUpload }: CsvUploaderProps) {
  const { toast } = useToast()
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type === "text/csv") {
        setFile(droppedFile)
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload a CSV file.",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    if (!file) return

    setIsUploading(true)

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        setIsUploading(false)

        if (results.errors && results.errors.length > 0) {
          toast({
            title: "CSV Parsing Error",
            description: results.errors[0].message,
            variant: "destructive",
          })
          return
        }

        onUpload(results.data)
      },
      error: (error) => {
        setIsUploading(false)
        toast({
          title: "CSV Parsing Error",
          description: error.message,
          variant: "destructive",
        })
      },
    })
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-primary bg-primary/5" : "border-border"
        } transition-colors duration-200`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="rounded-full bg-primary/10 p-4">
            <FileUp className="h-8 w-8 text-primary" />
          </div>
          <div>
            <p className="text-lg font-medium">Drag and drop your CSV file here</p>
            <p className="text-sm text-muted-foreground">or click to browse files</p>
          </div>
          <input ref={fileInputRef} type="file" accept=".csv" className="hidden" onChange={handleFileChange} />
          <Button variant="outline" onClick={() => fileInputRef.current?.click()} disabled={isUploading}>
            Browse Files
          </Button>
        </div>
      </div>

      {file && (
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="rounded-md bg-primary/10 p-2">
                <FileUp className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={handleRemoveFile} disabled={isUploading}>
                <X className="h-4 w-4" />
              </Button>
              <Button onClick={handleUpload} disabled={isUploading}>
                {isUploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
