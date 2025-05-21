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
import { Download } from "lucide-react"
import Image from "next/image"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TemplatePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: {
    id: string
    name: string
    description: string
    category: string
    visualType: string
    lastUsed: string
  }
}

export function TemplatePreviewDialog({ open, onOpenChange, template }: TemplatePreviewDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl">{template.name}</DialogTitle>
          <DialogDescription>{template.description}</DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6">
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">{template.category}</Badge>
              <Badge variant="outline">{template.visualType}</Badge>
              <Badge variant="outline">Last used: {template.lastUsed}</Badge>
            </div>

            <div className="relative aspect-[16/9] bg-jet-black rounded-md overflow-hidden shadow-lg">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-xl font-bold text-pure-white mb-2">Template Preview: {template.name}</h3>
                {template.visualType === "Grid" && (
                  <>
                    <p className="text-pure-white mb-4">
                      This is a sample template for creating grid-based content layouts.
                    </p>
                    <div className="w-16 h-1 bg-emerald-green mb-4"></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left w-full max-w-md">
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Point One</h4>
                        <p className="text-pure-white text-xs">Description for the first point</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Point Two</h4>
                        <p className="text-pure-white text-xs">Description for the second point</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Point Three</h4>
                        <p className="text-pure-white text-xs">Description for the third point</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Point Four</h4>
                        <p className="text-pure-white text-xs">Description for the fourth point</p>
                      </div>
                    </div>
                  </>
                )}

                {template.visualType === "Split" && (
                  <div className="flex flex-col sm:flex-row w-full h-full">
                    <div className="w-full sm:w-1/2 bg-muted/10 p-6 flex flex-col justify-center items-start text-left">
                      <h4 className="text-emerald-green font-bold text-lg mb-2">The Problem</h4>
                      <p className="text-pure-white text-sm">
                        Description of the problem that needs to be solved in the industry.
                      </p>
                    </div>
                    <div className="w-full sm:w-1/2 bg-muted/20 p-6 flex flex-col justify-center items-start text-left">
                      <h4 className="text-emerald-green font-bold text-lg mb-2">The Solution</h4>
                      <p className="text-pure-white text-sm">
                        Description of the innovative solution that addresses the problem.
                      </p>
                    </div>
                  </div>
                )}

                {template.visualType === "Comparison Table" && (
                  <>
                    <p className="text-pure-white mb-4">Compare different tools or approaches side by side</p>
                    <div className="w-16 h-1 bg-emerald-green mb-4"></div>
                    <div className="w-full overflow-x-auto">
                      <table className="w-full max-w-md text-left border-collapse">
                        <thead>
                          <tr>
                            <th className="p-2 border border-muted/20 text-emerald-green">Feature</th>
                            <th className="p-2 border border-muted/20 text-emerald-green">Tool A</th>
                            <th className="p-2 border border-muted/20 text-emerald-green">Tool B</th>
                          </tr>
                        </thead>
                        <tbody className="text-pure-white text-sm">
                          <tr>
                            <td className="p-2 border border-muted/20">Performance</td>
                            <td className="p-2 border border-muted/20">★★★☆☆</td>
                            <td className="p-2 border border-muted/20">★★★★☆</td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-muted/20">Ease of Use</td>
                            <td className="p-2 border border-muted/20">★★★★☆</td>
                            <td className="p-2 border border-muted/20">★★★☆☆</td>
                          </tr>
                          <tr>
                            <td className="p-2 border border-muted/20">Cost</td>
                            <td className="p-2 border border-muted/20">★★☆☆☆</td>
                            <td className="p-2 border border-muted/20">★★★★☆</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {template.visualType === "Text with Highlight" && (
                  <>
                    <div className="w-full max-w-md">
                      <h3 className="text-2xl font-bold text-pure-white mb-4">Industry Insight</h3>
                      <p className="text-pure-white mb-6 text-left">
                        Regular text explaining an important industry trend or insight that professionals should be
                        aware of in today's rapidly changing landscape.
                      </p>
                      <div className="bg-emerald-green/20 p-4 border-l-4 border-emerald-green text-left">
                        <p className="text-pure-white font-bold">
                          "Highlighted quote or statistic that emphasizes the key point of the insight."
                        </p>
                      </div>
                    </div>
                  </>
                )}

                {template.visualType === "Code Snippet" && (
                  <>
                    <p className="text-pure-white mb-4">Share code examples with explanations</p>
                    <div className="w-16 h-1 bg-emerald-green mb-4"></div>
                    <div className="w-full max-w-md bg-muted/30 rounded-md p-4 text-left">
                      <pre className="text-pure-white text-xs overflow-x-auto">
                        <code>{`# Python example
def process_data(data):
    """
    Process the input data and return results
    """
    results = []
    for item in data:
        # Transform the item
        processed = item * 2
        results.append(processed)
    return results

# Example usage
data = [1, 2, 3, 4, 5]
results = process_data(data)
print(results)  # [2, 4, 6, 8, 10]`}</code>
                      </pre>
                    </div>
                  </>
                )}

                {template.visualType === "Centered" && (
                  <>
                    <div className="w-full max-w-md flex flex-col items-center">
                      <div className="text-5xl font-bold text-emerald-green mb-4">87%</div>
                      <p className="text-pure-white text-xl mb-6">
                        of companies using AI report increased productivity
                      </p>
                      <div className="w-16 h-1 bg-emerald-green mb-4"></div>
                      <p className="text-pure-white text-sm">
                        Based on a survey of 500 companies across various industries in 2025
                      </p>
                    </div>
                  </>
                )}

                <div className="absolute bottom-3 right-3 flex items-center bg-jet-black/80 px-2 py-1 rounded">
                  <span className="text-pure-white text-xs mr-2">Ehtisham Sadiq</span>
                  <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-green">
                    <Image src="/images/headshot.png" alt="Ehtisham Sadiq" fill className="object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="flex flex-col sm:flex-row gap-2 mt-6">
          <Button variant="outline" className="sm:w-auto w-full">
            <Download className="mr-2 h-4 w-4" />
            Download Template
          </Button>
          <Button className="sm:w-auto w-full">Use This Template</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
