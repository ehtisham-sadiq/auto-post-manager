"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Download, FileUp, HelpCircle, Upload } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { CsvUploader } from "@/components/csv-uploader"
import { BulkPostsTable } from "@/components/bulk-posts-table"
import { EditPostDialog } from "@/components/edit-post-dialog"
import { ImageUploadDialog } from "@/components/image-upload-dialog"
import { BulkScheduleDialog } from "@/components/bulk-schedule-dialog"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function BulkUploadPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("upload")
  const [csvData, setCsvData] = useState<any[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [imageUploadOpen, setImageUploadOpen] = useState(false)
  const [bulkScheduleOpen, setBulkScheduleOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [validationErrors, setValidationErrors] = useState<Record<string, string[]>>({})

  const handleCsvUpload = (data: any[]) => {
    // Transform CSV data to match our post structure
    const transformedData = data.map((row, index) => ({
      id: `bulk-${index}`,
      title: row.title || "",
      content: row.content || "",
      caption: row.caption || "",
      category: row.category || "",
      niche: row.niche || "",
      date: row.date ? new Date(row.date) : null,
      status: row.status || "Draft",
      hasImage: !!row.image_url,
      imageUrl: row.image_url || "",
      errors: [],
    }))

    // Validate the data
    const errors: Record<string, string[]> = {}
    transformedData.forEach((post, index) => {
      const postErrors: string[] = []
      if (!post.title) postErrors.push("Title is required")
      if (!post.content) postErrors.push("Content is required")
      if (!post.category) postErrors.push("Category is required")

      if (postErrors.length > 0) {
        errors[index] = postErrors
        transformedData[index].errors = postErrors
      }
    })

    setCsvData(transformedData)
    setValidationErrors(errors)

    if (Object.keys(errors).length > 0) {
      toast({
        title: "Validation Errors",
        description: `${Object.keys(errors).length} posts have validation errors. Please fix them before proceeding.`,
        variant: "destructive",
      })
    } else {
      toast({
        title: "CSV Uploaded Successfully",
        description: `${transformedData.length} posts have been uploaded and are ready for review.`,
      })
      setActiveTab("review")
    }
  }

  const handleEditPost = (post: any) => {
    setSelectedPost(post)
    setEditOpen(true)
  }

  const handleUploadImage = (post: any) => {
    setSelectedPost(post)
    setImageUploadOpen(true)
  }

  const handleBulkSchedule = () => {
    // Check for validation errors before scheduling
    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Cannot Schedule Posts",
        description: "Please fix all validation errors before scheduling.",
        variant: "destructive",
      })
      return
    }

    setBulkScheduleOpen(true)
  }

  const handleSaveEdit = (updatedPost: any) => {
    const updatedData = csvData.map((post) => (post.id === updatedPost.id ? { ...post, ...updatedPost } : post))
    setCsvData(updatedData)

    // Re-validate the edited post
    const postIndex = csvData.findIndex((post) => post.id === updatedPost.id)
    const newErrors = { ...validationErrors }

    const postErrors: string[] = []
    if (!updatedPost.title) postErrors.push("Title is required")
    if (!updatedPost.content) postErrors.push("Content is required")
    if (!updatedPost.category) postErrors.push("Category is required")

    if (postErrors.length > 0) {
      newErrors[postIndex] = postErrors
      updatedData[postIndex].errors = postErrors
    } else {
      delete newErrors[postIndex]
      updatedData[postIndex].errors = []
    }

    setValidationErrors(newErrors)
  }

  const handleSaveImage = (postId: string, imageUrl: string) => {
    const updatedData = csvData.map((post) => (post.id === postId ? { ...post, imageUrl, hasImage: true } : post))
    setCsvData(updatedData)

    toast({
      title: "Image Added",
      description: "The image has been attached to the post.",
    })
  }

  const handleSchedulePosts = (scheduledPosts: any[]) => {
    // Update the CSV data with the scheduled posts
    setCsvData(scheduledPosts)

    toast({
      title: "Posts Scheduled",
      description: `Successfully scheduled ${scheduledPosts.length} posts.`,
    })
  }

  const handleProcessPosts = () => {
    // Check for validation errors
    if (Object.keys(validationErrors).length > 0) {
      toast({
        title: "Cannot Process Posts",
        description: "Please fix all validation errors before processing.",
        variant: "destructive",
      })
      return
    }

    setIsProcessing(true)

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      toast({
        title: "Posts Processed Successfully",
        description: `${csvData.length} posts have been added to your content library.`,
      })

      // Reset the form
      setCsvData([])
      setActiveTab("upload")
    }, 2000)
  }

  const handleDownloadTemplate = () => {
    // Create CSV template content
    const templateContent =
      "title,content,caption,category,niche,date,status,image_url\n" +
      "Example Post Title,This is the main content of the post,This is the LinkedIn caption with #hashtags,Tips and Tricks,Machine Learning,2025-06-15,Draft,\n" +
      "Another Example,More content here,More caption text here,How to Guide,Python,2025-07-01,Draft,"

    // Create a blob and download link
    const blob = new Blob([templateContent], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "linkedin_posts_template.csv"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast({
      title: "Template Downloaded",
      description: "CSV template has been downloaded. Use this as a guide for your bulk upload.",
    })
  }

  return (
    <LayoutWrapper>
      <div className="flex flex-col space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-3xl font-bold tracking-tight">Bulk Upload</h1>
          <Button variant="outline" onClick={handleDownloadTemplate}>
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="upload" className="flex-1 sm:flex-initial">
              <FileUp className="mr-2 h-4 w-4" />
              Upload CSV
            </TabsTrigger>
            <TabsTrigger value="review" className="flex-1 sm:flex-initial" disabled={csvData.length === 0}>
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Review & Process
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upload LinkedIn Posts CSV</CardTitle>
                <CardDescription>
                  Upload a CSV file containing your LinkedIn posts data. The file should include columns for title,
                  content, caption, category, niche, date, and status.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <HelpCircle className="h-4 w-4" />
                  <AlertTitle>CSV Format</AlertTitle>
                  <AlertDescription>
                    Your CSV should include the following columns: title, content, caption, category, niche, date
                    (YYYY-MM-DD), status, and image_url (optional).
                    <Button variant="link" className="p-0 h-auto" onClick={handleDownloadTemplate}>
                      Download a template
                    </Button>
                  </AlertDescription>
                </Alert>

                <CsvUploader onUpload={handleCsvUpload} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="review" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Review and Process Posts</CardTitle>
                <CardDescription>
                  Review your uploaded posts, make any necessary edits, and process them into your content library.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.keys(validationErrors).length > 0 && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Validation Errors</AlertTitle>
                    <AlertDescription>
                      {Object.keys(validationErrors).length} posts have validation errors that need to be fixed before
                      processing.
                    </AlertDescription>
                  </Alert>
                )}

                <BulkPostsTable
                  posts={csvData}
                  onEdit={handleEditPost}
                  onUploadImage={handleUploadImage}
                  onBulkSchedule={handleBulkSchedule}
                  validationErrors={validationErrors}
                />

                <div className="flex justify-end mt-4">
                  <Button
                    onClick={handleProcessPosts}
                    disabled={isProcessing || Object.keys(validationErrors).length > 0 || csvData.length === 0}
                  >
                    {isProcessing ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <Upload className="mr-2 h-4 w-4" />
                        Process All Posts
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {selectedPost && (
          <>
            <EditPostDialog open={editOpen} onOpenChange={setEditOpen} post={selectedPost} onSave={handleSaveEdit} />
            <ImageUploadDialog
              open={imageUploadOpen}
              onOpenChange={setImageUploadOpen}
              postId={selectedPost.id}
              onSave={handleSaveImage}
            />
          </>
        )}

        <BulkScheduleDialog
          open={bulkScheduleOpen}
          onOpenChange={setBulkScheduleOpen}
          posts={csvData}
          onSchedule={handleSchedulePosts}
        />
      </div>
    </LayoutWrapper>
  )
}
