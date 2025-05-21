"use client"

import type React from "react"

import { useState } from "react"
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

interface CreateTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateTemplateDialog({ open, onOpenChange }: CreateTemplateDialogProps) {
  const [templateName, setTemplateName] = useState("")
  const [templateDescription, setTemplateDescription] = useState("")
  const [templateCategory, setTemplateCategory] = useState("")
  const [templateVisualType, setTemplateVisualType] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the template
    // For now, we'll just close the dialog
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Template</DialogTitle>
            <DialogDescription>
              Create a new template for your LinkedIn posts. Fill in the details below.
            </DialogDescription>
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
                    <SelectItem value="tips">Tips and Tricks</SelectItem>
                    <SelectItem value="howto">How to Guide</SelectItem>
                    <SelectItem value="problem-solution">Problem &lt; Solution</SelectItem>
                    <SelectItem value="fact">Fact/Stat</SelectItem>
                    <SelectItem value="insights">Industry Insights</SelectItem>
                    <SelectItem value="trendy">What's Trendy</SelectItem>
                    <SelectItem value="comparison">Tool Comparison</SelectItem>
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
            <Button type="submit">Create Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
