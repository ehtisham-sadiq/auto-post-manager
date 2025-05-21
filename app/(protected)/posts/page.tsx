"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CalendarDays, Edit, Eye, Filter, PlusCircle, Search, Share2, Trash2 } from "lucide-react"
import Link from "next/link"
import { PostPreviewDialog } from "@/components/post-preview-dialog"
import { EditPostDialog } from "@/components/edit-post-dialog"
import { useToast } from "@/hooks/use-toast"
import { ScrollArea } from "@/components/ui/scroll-area"
import { postService, type Post } from "@/services/post-service"
import { format } from "date-fns"

export default function PostsPage() {
  const { toast } = useToast()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [categoryFilter, setCategoryFilter] = useState("all")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true)
        const data = await postService.getPosts()
        setPosts(data)
      } catch (err) {
        console.error("Failed to fetch posts:", err)
        setError("Failed to load posts. Please try again later.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchPosts()
  }, [])

  const handlePreview = (post: Post) => {
    setSelectedPost(post)
    setPreviewOpen(true)
  }

  const handleEdit = (post: Post) => {
    setSelectedPost(post)
    setEditOpen(true)
  }

  const handleSchedule = async (post: Post) => {
    try {
      // Open a dialog to select date and time (implementation not shown)
      const scheduledDate = new Date()
      scheduledDate.setDate(scheduledDate.getDate() + 1)

      await postService.schedulePost(post.id, scheduledDate.toISOString())

      // Update the post in the local state
      setPosts(
        posts.map((p) =>
          p.id === post.id ? { ...p, status: "Scheduled", scheduled_date: scheduledDate.toISOString() } : p,
        ),
      )

      toast({
        title: "Post Scheduled",
        description: `Post "${post.title}" has been scheduled for ${format(scheduledDate, "PPP 'at' p")}.`,
      })
    } catch (err) {
      console.error("Failed to schedule post:", err)
      toast({
        title: "Schedule Failed",
        description: "Failed to schedule the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (post: Post) => {
    try {
      await postService.deletePost(post.id)
      setPosts(posts.filter((p) => p.id !== post.id))
      toast({
        title: "Post Deleted",
        description: `Post "${post.title}" has been deleted.`,
      })
    } catch (err) {
      console.error("Failed to delete post:", err)
      toast({
        title: "Delete Failed",
        description: "Failed to delete the post. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Filter posts based on search query and filters
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || post.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesCategory =
      categoryFilter === "all" || post.category.toLowerCase().includes(categoryFilter.toLowerCase())

    return matchesSearch && matchesStatus && matchesCategory
  })

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center p-8">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex h-full flex-col items-center justify-center p-8">
        <p className="text-destructive mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Retry</Button>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Posts</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/posts/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex w-full max-w-sm items-center space-x-2">
          <Input
            type="search"
            placeholder="Search posts..."
            className="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit" size="icon" variant="ghost">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
        <div className="flex flex-col gap-4 sm:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="tips">Tips and Tricks</SelectItem>
                <SelectItem value="howto">How to Guide</SelectItem>
                <SelectItem value="problem">Problem &lt; Solution</SelectItem>
                <SelectItem value="insights">Industry Insights</SelectItem>
                <SelectItem value="trendy">What's Trendy</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
          </div>
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center">
          <p className="text-muted-foreground mb-4">No posts found. Try adjusting your filters or create a new post.</p>
          <Button asChild>
            <Link href="/posts/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create New Post
            </Link>
          </Button>
        </div>
      ) : (
        <div className="rounded-md border overflow-hidden">
          <ScrollArea className="w-full">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead className="hidden md:table-cell">Category</TableHead>
                  <TableHead className="hidden md:table-cell">Niche</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="hidden md:table-cell">Date</TableHead>
                  <TableHead className="hidden md:table-cell">Engagement</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPosts.map((post) => (
                  <TableRow key={post.id} className="hover:bg-muted/50 transition-colors">
                    <TableCell className="font-medium">{post.title}</TableCell>
                    <TableCell className="hidden md:table-cell">{post.category}</TableCell>
                    <TableCell className="hidden md:table-cell">{post.niche}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          post.status === "Published"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                            : post.status === "Scheduled"
                              ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                        }`}
                      >
                        {post.status}
                      </span>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.scheduled_date && (
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {format(new Date(post.scheduled_date), "MMM d, yyyy")}
                        </div>
                      )}
                      {post.published_date && (
                        <div className="flex items-center gap-1">
                          <CalendarDays className="h-3 w-3" />
                          {format(new Date(post.published_date), "MMM d, yyyy")}
                        </div>
                      )}
                      {!post.scheduled_date && !post.published_date && "—"}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {post.engagement_count > 0 ? post.engagement_count : "—"}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" onClick={() => handlePreview(post)}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">View</span>
                        </Button>
                        <Button size="icon" variant="ghost" onClick={() => handleEdit(post)}>
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        {post.status === "Draft" && (
                          <Button size="icon" variant="ghost" onClick={() => handleSchedule(post)}>
                            <Share2 className="h-4 w-4" />
                            <span className="sr-only">Schedule</span>
                          </Button>
                        )}
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-destructive"
                          onClick={() => handleDelete(post)}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>
        </div>
      )}

      {selectedPost && (
        <>
          <PostPreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} post={selectedPost} />
          <EditPostDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            post={selectedPost}
            onSave={(updatedPost) => {
              setPosts(posts.map((p) => (p.id === updatedPost.id ? updatedPost : p)))
              setEditOpen(false)
            }}
          />
        </>
      )}
    </div>
  )
}
