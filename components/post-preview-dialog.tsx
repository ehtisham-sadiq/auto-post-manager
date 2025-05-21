"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, Download, ThumbsUp, MessageSquare, Share2 } from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

interface PostPreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  post: {
    id: string
    title: string
    category: string
    niche: string
    status: string
    date: string
    content: string
    caption: string
    engagement?: number
  }
}

export function PostPreviewDialog({ open, onOpenChange, post }: PostPreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">{post.title}</DialogTitle>
          <DialogDescription className="flex flex-wrap items-center gap-2 mt-2">
            <Badge variant="outline">{post.category}</Badge>
            <Badge variant="outline">{post.niche}</Badge>
            {post.status && (
              <Badge
                className={
                  post.status === "Published"
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100"
                    : post.status === "Scheduled"
                      ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100"
                }
              >
                {post.status}
              </Badge>
            )}
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div className="relative aspect-[16/9] bg-jet-black rounded-md overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-bold text-pure-white mb-2">{post.title}</h3>
                <p className="text-pure-white mb-4">{post.content}</p>
                <div className="w-16 h-1 bg-emerald-green mb-4"></div>
                <div className="absolute bottom-3 right-3 flex items-center bg-jet-black/80 px-2 py-1 rounded">
                  <span className="text-pure-white text-xs mr-2">Ehtisham Sadiq</span>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-green">
                    <Image src="/images/headshot.png" alt="Ehtisham Sadiq" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {post.date && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                {post.status === "Published" ? `Posted on ${post.date}` : `Scheduled for ${post.date}`}
              </div>
            )}

            <div className="space-y-2">
              <h4 className="font-medium">Post Content</h4>
              <p className="text-sm text-muted-foreground">{post.content}</p>
            </div>

            {post.caption && (
              <div className="space-y-2">
                <h4 className="font-medium">LinkedIn Caption</h4>
                <div className="text-sm text-muted-foreground whitespace-pre-line p-4 bg-muted rounded-md">
                  {post.caption}
                </div>
              </div>
            )}

            {post.engagement && post.engagement > 0 && (
              <div className="flex items-center gap-6 pt-4 border-t">
                <div className="flex items-center gap-1">
                  <ThumbsUp className="h-4 w-4 text-emerald-green" />
                  <span className="text-sm">{Math.floor(post.engagement * 0.6)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-4 w-4 text-emerald-green" />
                  <span className="text-sm">{Math.floor(post.engagement * 0.25)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Share2 className="h-4 w-4 text-emerald-green" />
                  <span className="text-sm">{Math.floor(post.engagement * 0.15)}</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="outline" className="sm:w-auto w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Image
          </Button>
          {post.status === "Draft" && <Button className="sm:w-auto w-full">Schedule Post</Button>}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
