"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileUp, Link2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ImageUploadDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  postId: string
  onSave: (postId: string, imageUrl: string) => void
}

export function ImageUploadDialog({ open, onOpenChange, postId, onSave }: ImageUploadDialogProps) {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upload")
  const [imageUrl, setImageUrl] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
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
      if (droppedFile.type.startsWith("image/")) {
        setFile(droppedFile)
        setPreviewUrl(URL.createObjectURL(droppedFile))
      } else {
        toast({
          title: "Invalid File Type",
          description: "Please upload an image file.",
          variant: "destructive",
        })
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)
      setPreviewUrl(URL.createObjectURL(selectedFile))
    }
  }

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setFile(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (activeTab === "upload" && file) {
      setIsUploading(true)

      // Simulate file upload
      setTimeout(() => {
        setIsUploading(false)

        // In a real implementation, this would be the URL returned from your image upload service
        const uploadedUrl = URL.createObjectURL(file)
        onSave(postId, uploadedUrl)
        handleClose()
      }, 1500)
    } else if (activeTab === "url" && imageUrl) {
      onSave(postId, imageUrl)
      handleClose()
    } else {
      toast({
        title: "No Image Selected",
        description: "Please upload an image or provide a URL.",
        variant: "destructive",
      })
    }
  }

  const handleClose = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl)
    }
    setFile(null)
    setPreviewUrl(null)
    setImageUrl("")
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Add Image to Post</DialogTitle>
            <DialogDescription>Upload an image or provide a URL to attach to your LinkedIn post.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">
                <FileUp className="h-4 w-4 mr-2" />
                Upload Image
              </TabsTrigger>
              <TabsTrigger value="url">
                <Link2 className="h-4 w-4 mr-2" />
                Image URL
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="space-y-4 mt-4">
              {!previewUrl ? (
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
                      <p className="text-lg font-medium">Drag and drop your image here</p>
                      <p className="text-sm text-muted-foreground">or click to browse files</p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()}>
                      Browse Files
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-md overflow-hidden border">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="object-contain w-full h-full"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm"
                      onClick={handleRemoveFile}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    {file?.name} ({file?.size ? (file.size / 1024).toFixed(2) : 0} KB)
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="url" className="space-y-4 mt-4">
              <div className="grid gap-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              {imageUrl && (
                <div className="relative aspect-video rounded-md overflow-hidden border">
                  <img
                    src={imageUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="object-contain w-full h-full"
                    onError={() => {
                      toast({
                        title: "Invalid Image URL",
                        description: "The URL does not point to a valid image.",
                        variant: "destructive",
                      })
                      setImageUrl("")
                    }}
                  />
                </div>
              )}
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isUploading}>
              {isUploading ? "Uploading..." : "Save Image"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
