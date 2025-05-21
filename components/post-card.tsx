"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarDays, Edit, Eye, ImageIcon, Linkedin, Share2, ThumbsUp } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Badge } from "@/components/ui/badge"

interface PostCardProps {
  post: any
  onPreview: (post: any) => void
  onEdit?: (post: any) => void
  onSchedule?: (post: any) => void
  onPostNow?: (post: any) => void
  type: "upcoming" | "recent" | "draft"
}

export function PostCard({ post, onPreview, onEdit, onSchedule, onPostNow, type }: PostCardProps) {
  const { toast } = useToast()

  const handleEdit = () => {
    if (onEdit) {
      onEdit(post)
    } else {
      toast({
        title: "Edit Post",
        description: `Editing post: ${post.title}`,
      })
    }
  }

  const handleSchedule = () => {
    if (onSchedule) {
      onSchedule(post)
    } else {
      toast({
        title: "Schedule Post",
        description: `Post "${post.title}" has been scheduled.`,
      })
    }
  }

  const handlePostNow = () => {
    if (onPostNow) {
      onPostNow(post)
    } else {
      toast({
        title: "Post Now",
        description: `Post "${post.title}" has been sent to LinkedIn for immediate publishing.`,
        variant: "default",
      })
    }
  }

  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all duration-200">
      <div className="relative h-48 bg-muted overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-transparent to-muted/20 group-hover:to-muted/40 transition-all duration-200">
          <div className="text-muted-foreground">
            <ImageIcon className="h-12 w-12 mx-auto" />
            <p className="text-center mt-2">
              {type === "upcoming" ? "Preview Image" : type === "recent" ? "Post Image" : "Draft Image"}
            </p>
          </div>
        </div>
        {post.category && (
          <div className="absolute top-2 left-2">
            <Badge variant="secondary" className="bg-background/80 backdrop-blur-sm">
              {post.category}
            </Badge>
          </div>
        )}
      </div>
      <CardHeader className="p-4">
        <div className="flex items-center justify-between">
          <CardTitle className="line-clamp-1 text-lg">{post.title}</CardTitle>
        </div>
        <CardDescription className="flex items-center gap-2 mt-1">
          <CalendarDays className="h-3.5 w-3.5" />
          {type === "upcoming"
            ? `Scheduled for ${post.date}`
            : type === "recent"
              ? `Posted on ${post.date}`
              : "Draft - Last edited 2 days ago"}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{post.content}</p>
        {type === "recent" && post.engagement ? (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <ThumbsUp className="h-4 w-4 text-emerald-green" />
              <span className="text-sm">{Math.floor(post.engagement * 0.6)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Share2 className="h-4 w-4 text-emerald-green" />
              <span className="text-sm">{Math.floor(post.engagement * 0.25)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Linkedin className="h-4 w-4 text-emerald-green" />
              <span className="text-sm">{Math.floor(post.engagement * 0.15)}</span>
            </div>
            <Button size="sm" variant="ghost" className="ml-auto" onClick={() => onPreview(post)}>
              <Eye className="h-4 w-4 mr-1" />
              View
            </Button>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => onPreview(post)}>
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Button>
              <Button size="sm" variant="outline" onClick={handleEdit}>
                <Edit className="h-4 w-4 mr-1" />
                Edit
              </Button>
            </div>
            {type === "upcoming" && (
              <Button size="sm" variant="default" onClick={handlePostNow}>
                <Share2 className="h-4 w-4 mr-1" />
                Post Now
              </Button>
            )}
            {type === "draft" && (
              <Button size="sm" variant="default" onClick={handleSchedule}>
                <Share2 className="h-4 w-4 mr-1" />
                Schedule
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
