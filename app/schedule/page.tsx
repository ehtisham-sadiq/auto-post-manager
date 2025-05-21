"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar } from "@/components/ui/calendar"
import { PlusCircle } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PostPreviewDialog } from "@/components/post-preview-dialog"
import { EditPostDialog } from "@/components/edit-post-dialog"
import { useToast } from "@/hooks/use-toast"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function SchedulePage() {
  const { toast } = useToast()
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)

  // Sample scheduled posts data
  const scheduledPosts = [
    {
      id: "1",
      title: "Machine Learning Optimization Tips",
      date: new Date(2025, 4, 15), // May 15, 2025
      category: "Tips and Tricks",
      niche: "Machine Learning",
      content:
        "Optimize your ML models with these proven techniques that can improve performance by up to 20% while reducing computational costs.",
      caption:
        "🚀 Optimize Your Machine Learning Models: 4 Proven Techniques\n\nAre your ML models running slower than they should? Here are 4 techniques that helped me improve performance by 20% while reducing costs:\n\n✅ Hyperparameter Tuning\n✅ Feature Selection\n✅ Model Pruning\n✅ Quantization\n\nWhich technique has worked best for you? Comment below!\n\n#MachineLearning #MLOptimization #DataScience #AI",
      status: "Scheduled",
    },
    {
      id: "2",
      title: "Cloud Computing for ML Models",
      date: new Date(2025, 5, 15), // June 15, 2025
      category: "Problem < Solution",
      niche: "Cloud Computing",
      content:
        "Learn how to leverage cloud computing resources to train and deploy machine learning models more efficiently and cost-effectively.",
      caption:
        "☁️ Cloud Computing: The Solution to ML Training Bottlenecks\n\nFrustrated with slow ML model training on your local machine? Cloud computing offers:\n\n✅ Scalable compute resources\n✅ Pay-as-you-go pricing\n✅ Specialized ML hardware\n✅ Simplified deployment\n\nWhat cloud platform do you prefer for ML workloads?\n\n#CloudComputing #MachineLearning #MLOps #AWSvsAzure",
      status: "Scheduled",
    },
    {
      id: "3",
      title: "Generative AI Trends 2025",
      date: new Date(2025, 6, 15), // July 15, 2025
      category: "What's Trendy",
      niche: "Generative AI",
      content:
        "Explore the latest trends in generative AI and how they're reshaping industries from creative content to software development.",
      caption:
        "🔮 5 Generative AI Trends Reshaping Tech in 2025\n\nGenerative AI is evolving rapidly! Here are the trends to watch:\n\n1️⃣ Multimodal models becoming standard\n2️⃣ Domain-specific fine-tuning at scale\n3️⃣ Democratization of model training\n4️⃣ Enhanced factuality and reduced hallucinations\n5️⃣ AI-assisted coding transforming development\n\nWhich trend excites you most?\n\n#GenerativeAI #AITrends #TechInnovation #FutureOfAI",
      status: "Scheduled",
    },
  ]

  // Function to get posts for the selected date
  const getPostsForDate = (date: Date | undefined) => {
    if (!date) return []

    return scheduledPosts.filter((post) => {
      return (
        post.date.getDate() === date.getDate() &&
        post.date.getMonth() === date.getMonth() &&
        post.date.getFullYear() === date.getFullYear()
      )
    })
  }

  // Function to highlight dates with posts
  const isDayWithPost = (day: Date) => {
    return scheduledPosts.some(
      (post) =>
        post.date.getDate() === day.getDate() &&
        post.date.getMonth() === day.getMonth() &&
        post.date.getFullYear() === day.getFullYear(),
    )
  }

  const selectedDatePosts = getPostsForDate(date)

  const handlePreview = (post: any) => {
    setSelectedPost({
      ...post,
      date: post.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    })
    setPreviewOpen(true)
  }

  const handleEdit = (post: any) => {
    setSelectedPost(post)
    setEditOpen(true)
  }

  return (
    <LayoutWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Schedule</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle>Calendar</CardTitle>
            <CardDescription>View and manage your scheduled posts</CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              modifiers={{
                withPost: (date) => isDayWithPost(date),
              }}
              modifiersStyles={{
                withPost: {
                  backgroundColor: "hsl(var(--primary) / 0.1)",
                  borderRadius: "0",
                  color: "hsl(var(--primary))",
                  fontWeight: "bold",
                },
              }}
            />
            <div className="mt-4 flex items-center text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="mr-1 h-3 w-3 rounded-sm bg-primary/30"></div>
                <span>Posts scheduled</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-all duration-200">
          <CardHeader>
            <CardTitle>
              {date ? (
                <>Posts for {date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</>
              ) : (
                <>Select a date</>
              )}
            </CardTitle>
            <CardDescription>
              {selectedDatePosts.length > 0
                ? `${selectedDatePosts.length} post${selectedDatePosts.length > 1 ? "s" : ""} scheduled`
                : "No posts scheduled for this date"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {selectedDatePosts.length > 0 ? (
              <div className="space-y-4">
                {selectedDatePosts.map((post) => (
                  <div
                    key={post.id}
                    className="flex items-start justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="space-y-1">
                      <h3 className="font-medium">{post.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">{post.category}</Badge>
                        <Badge variant="outline">{post.niche}</Badge>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handlePreview(post)}>
                        Preview
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed">
                <p className="text-sm text-muted-foreground">No posts scheduled for this date</p>
                <Button asChild variant="link" className="mt-2">
                  <Link href="/posts/new">Schedule a post</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 hover:shadow-md transition-all duration-200">
        <CardHeader>
          <CardTitle>Upcoming Schedule</CardTitle>
          <CardDescription>View all your upcoming scheduled posts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {scheduledPosts
              .sort((a, b) => a.date.getTime() - b.date.getTime())
              .map((post) => (
                <div
                  key={post.id}
                  className="flex flex-col sm:flex-row sm:items-start justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="space-y-1 mb-4 sm:mb-0">
                    <h3 className="font-medium">{post.title}</h3>
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge variant="outline" className="bg-primary/10">
                        {post.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                      </Badge>
                      <Badge variant="outline">{post.category}</Badge>
                      <Badge variant="outline">{post.niche}</Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => handleEdit(post)}>
                      Edit
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handlePreview(post)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-destructive"
                      onClick={() => {
                        toast({
                          title: "Post Cancelled",
                          description: `Post "${post.title}" has been cancelled.`,
                          variant: "destructive",
                        })
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {selectedPost && (
        <>
          <PostPreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} post={selectedPost} />
          <EditPostDialog open={editOpen} onOpenChange={setEditOpen} post={selectedPost} />
        </>
      )}
    </LayoutWrapper>
  )
}
