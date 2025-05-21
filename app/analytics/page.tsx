"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart, LineChart, PieChart } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { StatsCard } from "@/components/stats-card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { LayoutWrapper } from "@/components/layout-wrapper"
import {
  Area,
  AreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart as RechartsLineChart,
  Pie,
  PieChart as RechartsPieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("30")

  // Sample data for charts
  const engagementData = [
    { date: "Apr 1", likes: 45, comments: 12, shares: 8 },
    { date: "Apr 8", likes: 52, comments: 18, shares: 11 },
    { date: "Apr 15", likes: 61, comments: 24, shares: 15 },
    { date: "Apr 22", likes: 67, comments: 28, shares: 19 },
    { date: "Apr 29", likes: 75, comments: 32, shares: 22 },
    { date: "May 6", likes: 87, comments: 36, shares: 25 },
    { date: "May 13", likes: 91, comments: 42, shares: 30 },
  ]

  const engagementBreakdownData = [
    { name: "Likes", value: 420, color: "#2ECC71" },
    { name: "Comments", value: 192, color: "#3498DB" },
    { name: "Shares", value: 130, color: "#9B59B6" },
    { name: "Profile Views", value: 98, color: "#E74C3C" },
  ]

  const categoryPerformanceData = [
    { name: "Tips and Tricks", engagement: 87, posts: 4 },
    { name: "How to Guide", engagement: 75, posts: 3 },
    { name: "Problem < Solution", engagement: 62, posts: 2 },
    { name: "Industry Insights", engagement: 58, posts: 2 },
    { name: "What's Trendy", engagement: 45, posts: 1 },
  ]

  const nichePerformanceData = [
    { name: "Machine Learning", engagement: 92, posts: 3 },
    { name: "Python", engagement: 78, posts: 2 },
    { name: "AI", engagement: 65, posts: 2 },
    { name: "Data Analytics", engagement: 55, posts: 2 },
    { name: "Cloud Computing", engagement: 48, posts: 1 },
    { name: "Generative AI", engagement: 42, posts: 1 },
    { name: "System Design", engagement: 35, posts: 1 },
  ]

  const postLengthData = [
    { length: "100-125", engagement: 45, posts: 2 },
    { length: "126-150", engagement: 62, posts: 3 },
    { length: "151-175", engagement: 78, posts: 3 },
    { length: "176-200", engagement: 85, posts: 2 },
    { length: "201-225", engagement: 72, posts: 1 },
    { length: "226-250", engagement: 58, posts: 1 },
  ]

  const audienceDemographicsData = [
    { name: "Software Engineers", value: 35, color: "#2ECC71" },
    { name: "Data Scientists", value: 25, color: "#3498DB" },
    { name: "Product Managers", value: 15, color: "#9B59B6" },
    { name: "CTOs", value: 10, color: "#E74C3C" },
    { name: "Other Tech", value: 15, color: "#F39C12" },
  ]

  const followerGrowthData = [
    { date: "Jan", followers: 120 },
    { date: "Feb", followers: 145 },
    { date: "Mar", followers: 178 },
    { date: "Apr", followers: 213 },
    { date: "May", followers: 267 },
  ]

  const audienceEngagementTimesData = [
    { time: "6 AM", engagement: 5 },
    { time: "8 AM", engagement: 12 },
    { time: "10 AM", engagement: 25 },
    { time: "12 PM", engagement: 32 },
    { time: "2 PM", engagement: 45 },
    { time: "4 PM", engagement: 58 },
    { time: "6 PM", engagement: 65 },
    { time: "8 PM", engagement: 48 },
    { time: "10 PM", engagement: 30 },
  ]

  const topPerformingPosts = [
    {
      title: "Machine Learning Optimization Tips",
      date: "April 15, 2025",
      category: "Tips and Tricks",
      engagement: 145,
    },
    {
      title: "Python Data Processing Techniques",
      date: "April 1, 2025",
      category: "How to Guide",
      engagement: 120,
    },
    {
      title: "AI Ethics in Modern Applications",
      date: "March 15, 2025",
      category: "Industry Insights",
      engagement: 105,
    },
  ]

  return (
    <LayoutWrapper>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Select date range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Last 7 days</SelectItem>
              <SelectItem value="30">Last 30 days</SelectItem>
              <SelectItem value="90">Last 90 days</SelectItem>
              <SelectItem value="365">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatsCard
          title="Total Impressions"
          value="12,543"
          description="from previous period"
          trend="up"
          trendValue="+18%"
        />
        <StatsCard
          title="Total Engagements"
          value="1,234"
          description="from previous period"
          trend="up"
          trendValue="+24%"
        />
        <StatsCard
          title="Engagement Rate"
          value="9.8%"
          description="from previous period"
          trend="up"
          trendValue="+2.3%"
        />
        <StatsCard title="Profile Views" value="543" description="from previous period" trend="up" trendValue="+32%" />
      </div>

      <Tabs defaultValue="engagement" className="space-y-4">
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="engagement" className="flex items-center gap-2 flex-1 md:flex-initial">
            <LineChart className="h-4 w-4" />
            <span className="hidden sm:inline">Engagement</span>
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2 flex-1 md:flex-initial">
            <BarChart className="h-4 w-4" />
            <span className="hidden sm:inline">Content Performance</span>
          </TabsTrigger>
          <TabsTrigger value="audience" className="flex items-center gap-2 flex-1 md:flex-initial">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Audience</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="engagement" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Engagement Over Time</CardTitle>
                <CardDescription>Likes, comments, and shares over the selected period</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={engagementData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="likes" stroke="#2ECC71" strokeWidth={2} activeDot={{ r: 8 }} />
                    <Line type="monotone" dataKey="comments" stroke="#3498DB" strokeWidth={2} />
                    <Line type="monotone" dataKey="shares" stroke="#9B59B6" strokeWidth={2} />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Engagement Breakdown</CardTitle>
                <CardDescription>Distribution of different engagement types</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={engagementBreakdownData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {engagementBreakdownData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>Top Performing Posts</CardTitle>
              <CardDescription>Posts with the highest engagement rates</CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="w-full">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Post Title</TableHead>
                      <TableHead className="hidden md:table-cell">Date</TableHead>
                      <TableHead className="hidden md:table-cell">Category</TableHead>
                      <TableHead className="text-right">Engagement</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topPerformingPosts.map((post, index) => (
                      <TableRow key={index} className="hover:bg-muted/50 transition-colors">
                        <TableCell className="font-medium">{post.title}</TableCell>
                        <TableCell className="hidden md:table-cell">{post.date}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          <Badge variant="outline">{post.category}</Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className="font-bold text-emerald-green">{post.engagement}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Content Performance by Category</CardTitle>
                <CardDescription>Average engagement by post category</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={categoryPerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="engagement" fill="#2ECC71" name="Avg. Engagement" />
                    <Bar dataKey="posts" fill="#3498DB" name="Number of Posts" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Content Performance by Niche</CardTitle>
                <CardDescription>Average engagement by post niche</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={nichePerformanceData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="engagement" fill="#2ECC71" name="Avg. Engagement" />
                    <Bar dataKey="posts" fill="#3498DB" name="Number of Posts" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>Post Length Analysis</CardTitle>
              <CardDescription>Correlation between post length and engagement</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={postLengthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="length" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="engagement"
                    stroke="#2ECC71"
                    fill="#2ECC71"
                    fillOpacity={0.3}
                    name="Avg. Engagement"
                  />
                  <Area
                    type="monotone"
                    dataKey="posts"
                    stroke="#3498DB"
                    fill="#3498DB"
                    fillOpacity={0.3}
                    name="Number of Posts"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="audience" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Audience Demographics</CardTitle>
                <CardDescription>Breakdown of your audience by industry and role</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={audienceDemographicsData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {audienceDemographicsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle>Follower Growth</CardTitle>
                <CardDescription>Growth in followers over time</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={followerGrowthData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="followers"
                      stroke="#2ECC71"
                      fill="#2ECC71"
                      fillOpacity={0.3}
                      name="Followers"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card className="hover:shadow-md transition-all duration-200">
            <CardHeader>
              <CardTitle>Audience Engagement Times</CardTitle>
              <CardDescription>When your audience is most active</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsBarChart
                  data={audienceEngagementTimesData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="engagement" fill="#2ECC71" name="Engagement Level" />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </LayoutWrapper>
  )
}
