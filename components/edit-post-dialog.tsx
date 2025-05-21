"use client"

import type React from "react"

import { useState, useEffect } from "react"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface EditPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: any
  onSave?: (updatedPost: any) => void
}

export function EditPostDialog({ open, onOpenChange, post, onSave }: EditPostDialogProps) {
  const { toast } = useToast()
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [caption, setCaption] = useState("")
  const [category, setCategory] = useState("")
  const [niche, setNiche] = useState("")
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState("")

  // Initialize form with post data when dialog opens
  useEffect(() => {
    if (post && open) {
      setTitle(post.title || "")
      setContent(post.content || "")
      setCaption(post.caption || "")
      setCategory(post.category || "")
      setNiche(post.niche || "")
      setStatus(post.status || "Draft")

      // Handle date conversion from string to Date if needed
      if (post.date) {
        if (post.date instanceof Date) {
          setDate(post.date)
        } else if (typeof post.date === "string") {
          // Try to parse the date string
          try {
            // This is a simple approach - you might need a more robust date parsing solution
            const parsedDate = new Date(post.date)
            if (!isNaN(parsedDate.getTime())) {
              setDate(parsedDate)
            }
          } catch (e) {
            console.error("Failed to parse date:", e)
          }
        }
      }
    }
  }, [post, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const updatedPost = {
      ...post,
      title,
      content,
      caption,
      category,
      niche,
      date,
      status,
    }

    if (onSave) {
      onSave(updatedPost)
    }

    toast({
      title: "Post Updated",
      description: `Post "${title}" has been updated successfully.`,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Post</DialogTitle>
            <DialogDescription>Make changes to your post. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Post title"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Tips and Tricks">Tips and Tricks</SelectItem>
                    <SelectItem value="How to Guide">How to Guide</SelectItem>
                    <SelectItem value="Problem < Solution">Problem &lt; Solution</SelectItem>
                    <SelectItem value="Fact/Stat">Fact/Stat</SelectItem>
                    <SelectItem value="Industry Insights">Industry Insights</SelectItem>
                    <SelectItem value="What's Trendy">What's Trendy</SelectItem>
                    <SelectItem value="Success Stories">Success Stories</SelectItem>
                    <SelectItem value="Myth Buster">Myth Buster</SelectItem>
                    <SelectItem value="Lessons/Mistakes">Lessons/Mistakes</SelectItem>
                    <SelectItem value="Tool Comparison">Tool Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="niche">Niche</Label>
                <Select value={niche} onValueChange={setNiche}>
                  <SelectTrigger id="niche">
                    <SelectValue placeholder="Select niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                    <SelectItem value="AI">AI</SelectItem>
                    <SelectItem value="Python">Python</SelectItem>
                    <SelectItem value="Data Integration">Data Integration</SelectItem>
                    <SelectItem value="Data Analytics">Data Analytics</SelectItem>
                    <SelectItem value="System Design">System Design</SelectItem>
                    <SelectItem value="Generative AI">Generative AI</SelectItem>
                    <SelectItem value="Tech Innovation">Tech Innovation</SelectItem>
                    <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                    <SelectItem value="Cybersecurity">Cybersecurity in AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Scheduled Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Post content"
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="caption">LinkedIn Caption</Label>
              <Textarea
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="LinkedIn caption"
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
