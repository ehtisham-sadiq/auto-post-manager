"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { TemplatePreviewDialog } from "@/components/template-preview-dialog"
import { TemplateCard } from "@/components/template-card"
import { CreateTemplateDialog } from "@/components/create-template-dialog"
import { EditTemplateDialog } from "@/components/edit-template-dialog"
import { useToast } from "@/hooks/use-toast"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function TemplatesPage() {
  const { toast } = useToast()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [createOpen, setCreateOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  // Sample templates data
  const templates = [
    {
      id: "1",
      name: "Tips and Tricks",
      description: "A template for sharing tips and tricks with a grid layout",
      lastUsed: "2 weeks ago",
      category: "Tips and Tricks",
      visualType: "Grid",
    },
    {
      id: "2",
      name: "Problem-Solution",
      description: "A template for presenting a problem and its solution",
      lastUsed: "1 month ago",
      category: "Problem < Solution",
      visualType: "Split",
    },
    {
      id: "3",
      name: "Data Comparison",
      description: "A template for comparing data points or tools",
      lastUsed: "3 weeks ago",
      category: "Tool Comparison",
      visualType: "Comparison Table",
    },
    {
      id: "4",
      name: "Industry Insight",
      description: "A template for sharing industry insights and trends",
      lastUsed: "2 days ago",
      category: "Industry Insights",
      visualType: "Text with Highlight",
    },
    {
      id: "5",
      name: "Code Snippet",
      description: "A template for sharing code snippets with explanations",
      lastUsed: "1 week ago",
      category: "How to Guide",
      visualType: "Code Snippet",
    },
    {
      id: "6",
      name: "Stat Highlight",
      description: "A template for highlighting an important statistic",
      lastUsed: "5 days ago",
      category: "Fact/Stat",
      visualType: "Centered",
    },
  ]

  const handlePreview = (template: any) => {
    setSelectedTemplate(template)
    setPreviewOpen(true)
  }

  const handleEdit = (template: any) => {
    setSelectedTemplate(template)
    setEditOpen(true)
  }

  return (
    <LayoutWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Templates</h1>
        <Button className="w-full sm:w-auto" onClick={() => setCreateOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Template
        </Button>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} onPreview={handlePreview} onEdit={handleEdit} />
        ))}
      </div>

      {selectedTemplate && (
        <>
          <TemplatePreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} template={selectedTemplate} />
          <EditTemplateDialog open={editOpen} onOpenChange={setEditOpen} template={selectedTemplate} />
        </>
      )}
      <CreateTemplateDialog open={createOpen} onOpenChange={setCreateOpen} />
    </LayoutWrapper>
  )
}
