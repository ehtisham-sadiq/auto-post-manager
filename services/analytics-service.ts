import { apiClient } from "@/lib/api-client"

export interface AnalyticsData {
  total_posts: number
  total_engagement: number
  posts_by_status: {
    published: number
    scheduled: number
    draft: number
  }
  engagement_by_category: Record<string, number>
  engagement_over_time: Array<{
    date: string
    engagement: number
  }>
  top_performing_posts: Array<{
    id: string
    title: string
    engagement: number
  }>
}

export const analyticsService = {
  /**
   * Get analytics data
   */
  async getAnalytics(timeframe: "week" | "month" | "year" = "month"): Promise<AnalyticsData> {
    return apiClient.get<AnalyticsData>(`/analytics?timeframe=${timeframe}`)
  },
}
