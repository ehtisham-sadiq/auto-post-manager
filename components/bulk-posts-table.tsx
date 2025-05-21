"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Calendar, Edit, ImageIcon } from "lucide-react"
import { format } from "date-fns"

interface BulkPostsTableProps {
  posts: any[]
  onEdit: (post: any) => void
  onUploadImage: (post: any) => void
  onBulkSchedule?: () => void
  validationErrors: Record<string, string[]>
}

export function BulkPostsTable({
  posts,
  onEdit,
  onUploadImage,
  onBulkSchedule,
  validationErrors,
}: BulkPostsTableProps) {
  const handleStatusChange = (postId: string, status: string) => {
    // This would be handled by the parent component in a real implementation
    // For now, we'll just log it
    console.log(`Changed status of post ${postId} to ${status}`)
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No posts to display. Please upload a CSV file first.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {onBulkSchedule && (
        <div className="flex justify-end">
          <Button onClick={onBulkSchedule}>
            <Calendar className="mr-2 h-4 w-4" />
            Bulk Schedule
          </Button>
        </div>
      )}

      <ScrollArea className="h-[500px] rounded-md border">
        <Table>
          <TableHeader className="sticky top-0 bg-background">
            <TableRow>
              <TableHead className="w-[300px]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Niche</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Scheduled Date</TableHead>
              <TableHead>Image</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {posts.map((post, index) => {
              const hasErrors = post.errors && post.errors.length > 0

              return (
                <TableRow key={post.id} className={`${hasErrors ? "bg-destructive/5" : ""}`}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className={hasErrors ? "text-destructive" : ""}>{post.title || "Untitled"}</span>
                      {hasErrors && (
                        <div className="flex items-center text-xs text-destructive mt-1">
                          <AlertCircle className="h-3 w-3 mr-1" />
                          {post.errors[0]}
                          {post.errors.length > 1 && ` (+${post.errors.length - 1} more)`}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{post.category || "—"}</TableCell>
                  <TableCell>{post.niche || "—"}</TableCell>
                  <TableCell>
                    <Select
                      defaultValue={post.status || "Draft"}
                      onValueChange={(value) => handleStatusChange(post.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Draft">Draft</SelectItem>
                        <SelectItem value="Scheduled">Scheduled</SelectItem>
                        <SelectItem value="Published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{post.date ? format(new Date(post.date), "MMM d, yyyy") : "—"}</TableCell>
                  <TableCell>
                    {post.hasImage ? (
                      <Badge variant="outline" className="bg-primary/10">
                        Image Added
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-muted">
                        No Image
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button size="sm" variant="outline" onClick={() => onEdit(post)}>
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => onUploadImage(post)}>
                        <ImageIcon className="h-4 w-4 mr-1" />
                        {post.hasImage ? "Change Image" : "Add Image"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  )
}
