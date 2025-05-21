import { apiClient } from "@/lib/api-client"
import type { Post } from "./post-service"

export interface ScheduleData {
  scheduled_posts: Post[]
  upcoming_posts: Post[]
  past_posts: Post[]
}

export interface ScheduleSettings {
  preferred_times: string[]
  time_zone: string
  max_posts_per_day: number
}

export const scheduleService = {
  /**
   * Get schedule data
   */
  async getSchedule(): Promise<ScheduleData> {
    return apiClient.get<ScheduleData>("/schedules")
  },

  /**
   * Get schedule settings
   */
  async getScheduleSettings(): Promise<ScheduleSettings> {
    return apiClient.get<ScheduleSettings>("/schedules/settings")
  },

  /**
   * Update schedule settings
   */
  async updateScheduleSettings(settings: Partial<ScheduleSettings>): Promise<ScheduleSettings> {
    return apiClient.put<ScheduleSettings>("/schedules/settings", settings)
  },
}
