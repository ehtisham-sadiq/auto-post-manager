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
import { useToast } from "@/hooks/use-toast"

interface EditTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: any
}

export function EditTemplateDialog({ open, onOpenChange, template }: EditTemplateDialogProps) {
  const { toast } = useToast()
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [templateCategory, setTemplateCategory] = useState("")
  const [templateVisualType, setTemplateVisualType] = useState("")

  // Initialize form with template data when dialog opens
  useEffect(() => {
    if (template && open) {
      setTemplateName(template.name || "")
      setTemplateDescription(template.description || "")
      setTemplateCategory(template.category || "")
      setTemplateVisualType(template.visualType || "")
    }
  }, [template, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically save the edited template
    toast({
      title: "Template Updated",
      description: `Template "${templateName}" has been updated successfully.`,
    })

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Template</DialogTitle>
            <DialogDescription>Make changes to your template. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Template Name</Label>
              <Input
                id="name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                placeholder="e.g., Tips and Tricks Grid"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={templateDescription}
                onChange={(e) => setTemplateDescription(e.target.value)}
                placeholder="Describe what this template is for..."
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <Select value={templateCategory} onValueChange={setTemplateCategory} required>
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
                    <SelectItem value="Tool Comparison">Tool Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="visualType">Visual Type</Label>
                <Select value={templateVisualType} onValueChange={setTemplateVisualType} required>
                  <SelectTrigger id="visualType">
                    <SelectValue placeholder="Select visual type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grid">Grid</SelectItem>
                    <SelectItem value="Split">Split</SelectItem>
                    <SelectItem value="Comparison Table">Comparison Table</SelectItem>
                    <SelectItem value="Text with Highlight">Text with Highlight</SelectItem>
                    <SelectItem value="Code Snippet">Code Snippet</SelectItem>
                    <SelectItem value="Centered">Centered</SelectItem>
                  </SelectContent>
                </Select>
              </div>
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
