"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Download, Eye, Save } from "lucide-react"
import Image from "next/image"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function NewPostPage() {
  const [date, setDate] = useState<Date>()
  const [postContent, setPostContent] = useState("")
  const [wordCount, setWordCount] = useState(0)

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.target.value
    setPostContent(content)
    setWordCount(content.trim() === "" ? 0 : content.trim().split(/\s+/).length)
  }

  return (
    <LayoutWrapper>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create New Post</h1>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Post
          </Button>
        </div>
      </div>

      <Tabs defaultValue="content" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="visual">Visual</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="date">Post Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal">
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Post Category</Label>
                <Select>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tips">Tips and Tricks</SelectItem>
                    <SelectItem value="howto">How to Guide</SelectItem>
                    <SelectItem value="problem-solution">{"Problem < Solution"}</SelectItem>
                    <SelectItem value="fact">Fact/Stat</SelectItem>
                    <SelectItem value="insights">Industry Insights</SelectItem>
                    <SelectItem value="trendy">What's Trendy</SelectItem>
                    <SelectItem value="success">Success Stories</SelectItem>
                    <SelectItem value="myth">Myth Buster</SelectItem>
                    <SelectItem value="lessons">Lessons/Mistakes</SelectItem>
                    <SelectItem value="comparison">Tool Comparison</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="niche">Niche</Label>
                <Select>
                  <SelectTrigger id="niche">
                    <SelectValue placeholder="Select niche" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ml">Machine Learning</SelectItem>
                    <SelectItem value="ai">AI</SelectItem>
                    <SelectItem value="python">Python</SelectItem>
                    <SelectItem value="data-integration">Data Integration</SelectItem>
                    <SelectItem value="data-analytics">Data Analytics</SelectItem>
                    <SelectItem value="system-design">System Design</SelectItem>
                    <SelectItem value="generative-ai">Generative AI</SelectItem>
                    <SelectItem value="tech-innovation">Tech Innovation</SelectItem>
                    <SelectItem value="cloud-computing">Cloud Computing</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity in AI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="idea">Idea/Inspiration</Label>
                <Textarea id="idea" placeholder="What inspired this post?" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="topic">Topic</Label>
                <Input id="topic" placeholder="Main topic of the post" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="content">Post Content (100-250 words)</Label>
                  <span
                    className={`text-xs ${
                      wordCount < 100 || wordCount > 250 ? "text-destructive" : "text-muted-foreground"
                    }`}
                  >
                    {wordCount} words
                  </span>
                </div>
                <Textarea
                  id="content"
                  placeholder="Write your post content here..."
                  className="min-h-[200px]"
                  value={postContent}
                  onChange={handleContentChange}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="caption">Caption</Label>
                <Textarea id="caption" placeholder="LinkedIn caption for your post" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Notes/Ideas</Label>
                <Textarea id="notes" placeholder="Additional notes or ideas" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="audience">Target Audience</Label>
                <Input id="audience" placeholder="Who is this post for?" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="goal">Content Goal</Label>
                <Select>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="thought-leadership">Thought Leadership</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="brand-awareness">Brand Awareness</SelectItem>
                    <SelectItem value="lead-generation">Lead Generation</SelectItem>
                    <SelectItem value="networking">Networking</SelectItem>
                    <SelectItem value="community-building">Community Building</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tone">Tone</Label>
                <Select>
                  <SelectTrigger id="tone">
                    <SelectValue placeholder="Select tone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Professional</SelectItem>
                    <SelectItem value="conversational">Conversational</SelectItem>
                    <SelectItem value="educational">Educational</SelectItem>
                    <SelectItem value="inspirational">Inspirational</SelectItem>
                    <SelectItem value="authoritative">Authoritative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="visual" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="visual-type">Visual Type</Label>
                <Select>
                  <SelectTrigger id="visual-type">
                    <SelectValue placeholder="Select visual type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text-only">Text Only</SelectItem>
                    <SelectItem value="graph">Graph/Chart</SelectItem>
                    <SelectItem value="flowchart">Flowchart</SelectItem>
                    <SelectItem value="comparison">Comparison Table</SelectItem>
                    <SelectItem value="timeline">Timeline</SelectItem>
                    <SelectItem value="code-snippet">Code Snippet</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="background">Background Style</Label>
                <Select defaultValue="jet-black">
                  <SelectTrigger id="background">
                    <SelectValue placeholder="Select background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="jet-black">Jet Black</SelectItem>
                    <SelectItem value="hex-pattern">Hexagonal Grid Pattern</SelectItem>
                    <SelectItem value="gradient">Gradient</SelectItem>
                    <SelectItem value="minimal">Minimal White</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="layout">Layout</Label>
                <Select defaultValue="centered">
                  <SelectTrigger id="layout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="centered">Centered</SelectItem>
                    <SelectItem value="left-aligned">Left Aligned</SelectItem>
                    <SelectItem value="split">Split</SelectItem>
                    <SelectItem value="grid">Grid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="heading">Heading</Label>
                <Input id="heading" placeholder="Visual heading (optional)" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="subheading">Subheading</Label>
                <Input id="subheading" placeholder="Visual subheading (optional)" />
              </div>
            </div>
            <div>
              <Card className="overflow-hidden">
                <div className="relative aspect-[16/9] bg-jet-black">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold text-pure-white mb-2">Machine Learning Optimization</h3>
                    <p className="text-pure-white mb-4">
                      Optimize your ML models with these proven techniques that can improve performance by up to 20%
                      while reducing computational costs.
                    </p>
                    <div className="w-16 h-1 bg-emerald-green mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 text-left w-full max-w-md">
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Hyperparameter Tuning</h4>
                        <p className="text-pure-white text-xs">Systematically search for optimal parameters</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Feature Selection</h4>
                        <p className="text-pure-white text-xs">Remove irrelevant features to reduce noise</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Model Pruning</h4>
                        <p className="text-pure-white text-xs">Eliminate redundant neurons or branches</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Quantization</h4>
                        <p className="text-pure-white text-xs">Reduce precision of weights for faster inference</p>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center bg-jet-black/80 px-2 py-1 rounded">
                      <span className="text-pure-white text-xs mr-2">Ehtisham Sadiq</span>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-green">
                        <Image src="/images/headshot.png" alt="Ehtisham Sadiq" fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
                <Button>
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <Card className="overflow-hidden">
                <div className="relative aspect-[16/9] bg-jet-black">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <h3 className="text-xl font-bold text-pure-white mb-2">Machine Learning Optimization</h3>
                    <p className="text-pure-white mb-4">
                      Optimize your ML models with these proven techniques that can improve performance by up to 20%
                      while reducing computational costs.
                    </p>
                    <div className="w-16 h-1 bg-emerald-green mb-4"></div>
                    <div className="grid grid-cols-2 gap-4 text-left w-full max-w-md">
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Hyperparameter Tuning</h4>
                        <p className="text-pure-white text-xs">Systematically search for optimal parameters</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Feature Selection</h4>
                        <p className="text-pure-white text-xs">Remove irrelevant features to reduce noise</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Model Pruning</h4>
                        <p className="text-pure-white text-xs">Eliminate redundant neurons or branches</p>
                      </div>
                      <div className="bg-muted/10 p-3 rounded-md">
                        <h4 className="text-emerald-green font-bold text-sm mb-1">Quantization</h4>
                        <p className="text-pure-white text-xs">Reduce precision of weights for faster inference</p>
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 flex items-center bg-jet-black/80 px-2 py-1 rounded">
                      <span className="text-pure-white text-xs mr-2">Ehtisham Sadiq</span>
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 border-emerald-green">
                        <Image src="/images/headshot.png" alt="Ehtisham Sadiq" fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">
                  <Download className="mr-2 h-4 w-4" />
                  Download Image
                </Button>
              </div>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border p-4">
                <h3 className="font-bold mb-2">LinkedIn Caption</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  🚀 Optimize Your Machine Learning Models: 4 Proven Techniques Are your ML models running slower than
                  they should? Here are 4 techniques that helped me improve performance by 20% while reducing costs: ✅
                  Hyperparameter Tuning ✅ Feature Selection ✅ Model Pruning ✅ Quantization Which technique has worked
                  best for you? Comment below! #MachineLearning #MLOptimization #DataScience #AI
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-bold mb-2">Post Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="font-semibold">Category:</p>
                    <p className="text-muted-foreground">Tips and Tricks</p>
                  </div>
                  <div>
                    <p className="font-semibold">Niche:</p>
                    <p className="text-muted-foreground">Machine Learning</p>
                  </div>
                  <div>
                    <p className="font-semibold">Target Audience:</p>
                    <p className="text-muted-foreground">ML Engineers, Data Scientists</p>
                  </div>
                  <div>
                    <p className="font-semibold">Content Goal:</p>
                    <p className="text-muted-foreground">Thought Leadership</p>
                  </div>
                  <div>
                    <p className="font-semibold">Scheduled Date:</p>
                    <p className="text-muted-foreground">May 15, 2025</p>
                  </div>
                  <div>
                    <p className="font-semibold">Word Count:</p>
                    <p className="text-muted-foreground">145 words</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button>
                  <Calendar className="mr-2 h-4 w-4" />
                  Schedule Post
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </LayoutWrapper>
  )
}
