"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, Edit, Eye, Trash2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface TemplateCardProps {
  template: {
    id: string
    name: string
    description: string
    lastUsed: string
    category: string
    visualType: string
  }
  onPreview: (template: any) => void
  onEdit?: (template: any) => void
}

export function TemplateCard({ template, onPreview, onEdit }: TemplateCardProps) {
  const { toast } = useToast()

  const handleCopy = () => {
    toast({
      title: "Template Copied",
      description: `Template "${template.name}" has been copied and is ready to use.`,
    })
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(template)
    } else {
      toast({
        title: "Edit Template",
        description: `Editing template: ${template.name}`,
      })
    }
  }

  const handleDelete = () => {
    toast({
      title: "Delete Template",
      description: `Template "${template.name}" has been deleted.`,
      variant: "destructive",
    })
  }

  return (
    <Card className="group hover:shadow-md transition-all duration-200">
      <CardHeader>
        <CardTitle className="group-hover:text-primary transition-colors">{template.name}</CardTitle>
        <CardDescription>{template.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="font-medium text-muted-foreground">Category</p>
            <p>{template.category}</p>
          </div>
          <div>
            <p className="font-medium text-muted-foreground">Visual Type</p>
            <p>{template.visualType}</p>
          </div>
          <div className="col-span-2">
            <p className="font-medium text-muted-foreground">Last Used</p>
            <p>{template.lastUsed}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={() => onPreview(template)}>
          <Eye className="mr-2 h-4 w-4" />
          Preview
        </Button>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
            <span className="sr-only">Use Template</span>
          </Button>
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button variant="outline" size="sm" className="text-destructive" onClick={handleDelete}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
