"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarDays, Clock, ImageIcon, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { PostPreviewDialog } from "@/components/post-preview-dialog"
import { EditPostDialog } from "@/components/edit-post-dialog"
import { useToast } from "@/hooks/use-toast"
import { PostCard } from "@/components/post-card"
import { StatsCard } from "@/components/stats-card"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function Home() {
  const { toast } = useToast()
  const [previewOpen, setPreviewOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [selectedPost, setSelectedPost] = useState<any>(null)

  // Sample post data
  const upcomingPosts = [
    {
      id: "1",
      title: "Machine Learning Optimization Tips",
      category: "Tips and Tricks",
      niche: "Machine Learning",
      status: "Scheduled",
      date: "May 16, 2025",
      content:
        "Optimize your ML models with these proven techniques that can improve performance by up to 20% while reducing computational costs.",
      caption:
        "🚀 Optimize Your Machine Learning Models: 4 Proven Techniques\n\nAre your ML models running slower than they should? Here are 4 techniques that helped me improve performance by 20% while reducing costs:\n\n✅ Hyperparameter Tuning\n✅ Feature Selection\n✅ Model Pruning\n✅ Quantization\n\nWhich technique has worked best for you? Comment below!\n\n#MachineLearning #MLOptimization #DataScience #AI",
    },
    {
      id: "2",
      title: "Cloud Computing for ML Models",
      category: "Problem < Solution",
      niche: "Cloud Computing",
      status: "Scheduled",
      date: "May 17, 2025",
      content:
        "Learn how to leverage cloud computing resources to train and deploy machine learning models more efficiently and cost-effectively.",
      caption:
        "☁️ Cloud Computing: The Solution to ML Training Bottlenecks\n\nFrustrated with slow ML model training on your local machine? Cloud computing offers:\n\n✅ Scalable compute resources\n✅ Pay-as-you-go pricing\n✅ Specialized ML hardware\n✅ Simplified deployment\n\nWhat cloud platform do you prefer for ML workloads?\n\n#CloudComputing #MachineLearning #MLOps #AWSvsAzure",
    },
    {
      id: "3",
      title: "Generative AI Trends 2025",
      category: "What's Trendy",
      niche: "Generative AI",
      status: "Scheduled",
      date: "May 18, 2025",
      content:
        "Explore the latest trends in generative AI and how they're reshaping industries from creative content to software development.",
      caption:
        "🔮 5 Generative AI Trends Reshaping Tech in 2025\n\nGenerative AI is evolving rapidly! Here are the trends to watch:\n\n1️⃣ Multimodal models becoming standard\n2️⃣ Domain-specific fine-tuning at scale\n3️⃣ Democratization of model training\n4️⃣ Enhanced factuality and reduced hallucinations\n5️⃣ AI-assisted coding transforming development\n\nWhich trend excites you most?\n\n#GenerativeAI #AITrends #TechInnovation #FutureOfAI",
    },
  ]

  const recentPosts = [
    {
      id: "4",
      title: "Python Data Processing Techniques",
      category: "How to Guide",
      niche: "Python",
      status: "Published",
      date: "April 15, 2025",
      content:
        "Learn how to process large datasets efficiently with Python using these advanced techniques that can save you hours of computation time.",
      caption:
        "🐍 Python Data Processing: 5 Techniques to Handle Large Datasets\n\nProcessing gigabytes of data in Python? These techniques saved me hours:\n\n1️⃣ Dask for parallel computing\n2️⃣ Memory-mapped files with NumPy\n3️⃣ Chunked processing with generators\n4️⃣ Optimized Pandas operations\n5️⃣ Vectorization over loops\n\nWhat's your go-to technique for large datasets?\n\n#Python #DataProcessing #BigData #DataScience",
      engagement: 120,
    },
    {
      id: "5",
      title: "AI Ethics in Modern Applications",
      category: "Industry Insights",
      niche: "AI",
      status: "Published",
      date: "April 1, 2025",
      content:
        "Exploring the ethical considerations in AI development and how to implement responsible AI practices in your projects.",
      caption:
        "🧠 AI Ethics: Beyond the Buzzwords\n\nBuilding AI systems requires ethical consideration. Here's my framework:\n\n✅ Fairness: Test for bias across diverse groups\n✅ Transparency: Document model limitations\n✅ Privacy: Minimize data collection, maximize security\n✅ Accountability: Clear ownership of outcomes\n\nHow do you approach ethics in your AI projects?\n\n#AIEthics #ResponsibleAI #MachineLearning #TechEthics",
      engagement: 105,
    },
    {
      id: "6",
      title: "Data Integration Best Practices",
      category: "Tips and Tricks",
      niche: "Data Integration",
      status: "Published",
      date: "March 15, 2025",
      content:
        "Discover the best practices for seamless data integration across different systems and platforms in your organization.",
      caption:
        "🔄 Data Integration: 7 Best Practices for Success\n\nIntegrating data across systems? Follow these practices:\n\n1️⃣ Define clear data governance policies\n2️⃣ Implement robust data quality checks\n3️⃣ Use standardized data formats\n4️⃣ Design for scalability from day one\n5️⃣ Document all transformations\n6️⃣ Implement proper error handling\n7️⃣ Monitor integration performance\n\nWhat challenges have you faced with data integration?\n\n#DataIntegration #DataEngineering #ETL #DataArchitecture",
      engagement: 95,
    },
  ]

  const draftPosts = [
    {
      id: "7",
      title: "AI Ethics in Modern Applications",
      category: "Industry Insights",
      niche: "AI",
      status: "Draft",
      date: "N/A",
      content:
        "Exploring the ethical considerations in AI development and how to implement responsible AI practices in your projects.",
      caption:
        "🧠 AI Ethics: Beyond the Buzzwords\n\nBuilding AI systems requires ethical consideration. Here's my framework:\n\n✅ Fairness: Test for bias across diverse groups\n✅ Transparency: Document model limitations\n✅ Privacy: Minimize data collection, maximize security\n✅ Accountability: Clear ownership of outcomes\n\nHow do you approach ethics in your AI projects?\n\n#AIEthics #ResponsibleAI #MachineLearning #TechEthics",
    },
    {
      id: "8",
      title: "System Design for ML Applications",
      category: "How to Guide",
      niche: "System Design",
      status: "Draft",
      date: "N/A",
      content:
        "Learn how to design robust systems for machine learning applications that can scale and perform in production environments.",
      caption:
        "🏗️ System Design for ML: A Practical Guide\n\nDesigning ML systems for production? Consider these components:\n\n1️⃣ Data pipeline with validation\n2️⃣ Feature store for consistency\n3️⃣ Model training infrastructure\n4️⃣ Serving layer with monitoring\n5️⃣ Feedback loop for retraining\n\nWhat's your biggest challenge in ML system design?\n\n#SystemDesign #MLOps #SoftwareArchitecture #MachineLearning",
    },
  ]

  const handlePreview = (post: any) => {
    setSelectedPost(post)
    setPreviewOpen(true)
  }

  const handleEdit = (post: any) => {
    setSelectedPost(post)
    setEditOpen(true)
  }

  const handleSchedule = (post: any) => {
    toast({
      title: "Schedule Post",
      description: `Post "${post.title}" has been scheduled.`,
    })
  }

  const handlePostNow = (post: any) => {
    toast({
      title: "Post Now",
      description: `Post "${post.title}" has been sent to LinkedIn for immediate publishing.`,
      variant: "default",
    })
  }

  return (
    <LayoutWrapper>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <Button asChild className="w-full sm:w-auto">
          <Link href="/posts/new">
            <ImageIcon className="mr-2 h-4 w-4" />
            Create New Post
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Posts"
          value="12"
          description="from last month"
          icon={ImageIcon}
          trend="up"
          trendValue="+2"
        />
        <StatsCard
          title="Scheduled Posts"
          value="3"
          description="Next post on May 15"
          icon={CalendarDays}
          trend="neutral"
        />
        <StatsCard
          title="Total Engagement"
          value="1,234"
          description="from last month"
          icon={ThumbsUp}
          trend="up"
          trendValue="+24%"
        />
        <StatsCard
          title="Avg. Response Time"
          value="3.2h"
          description="from last month"
          icon={Clock}
          trend="down"
          trendValue="-12%"
        />
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="w-full sm:w-auto">
          <TabsTrigger value="upcoming" className="flex-1 sm:flex-initial">
            Upcoming Posts
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex-1 sm:flex-initial">
            Recent Posts
          </TabsTrigger>
          <TabsTrigger value="drafts" className="flex-1 sm:flex-initial">
            Drafts
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {upcomingPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPreview={handlePreview}
                onEdit={handleEdit}
                onPostNow={handlePostNow}
                type="upcoming"
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="recent" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentPosts.map((post) => (
              <PostCard key={post.id} post={post} onPreview={handlePreview} type="recent" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {draftPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onPreview={handlePreview}
                onEdit={handleEdit}
                onSchedule={handleSchedule}
                type="draft"
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedPost && (
        <>
          <PostPreviewDialog open={previewOpen} onOpenChange={setPreviewOpen} post={selectedPost} />
          <EditPostDialog open={editOpen} onOpenChange={setEditOpen} post={selectedPost} />
        </>
      )}
    </LayoutWrapper>
  )
}
