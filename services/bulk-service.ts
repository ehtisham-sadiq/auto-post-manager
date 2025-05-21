import { apiClient } from "@/lib/api-client"
import type { Post } from "./post-service"

export interface BulkUploadResult {
  successful: number
  failed: number
  posts: Post[]
  errors?: Record<string, string>
}

export interface BulkScheduleOptions {
  post_ids: string[]
  start_date: string
  frequency: "daily" | "weekly" | "custom"
  times?: string[]
  days_of_week?: number[]
  custom_dates?: string[]
}

export const bulkService = {
  /**
   * Upload CSV file for bulk post creation
   */
  async uploadCSV(file: File): Promise<BulkUploadResult> {
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/bulk/upload`, {
      method: "POST",
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.detail || "CSV upload failed")
    }

    return response.json()
  },

  /**
   * Schedule multiple posts at once
   */
  async scheduleBulk(options: BulkScheduleOptions): Promise<Post[]> {
    return apiClient.post<Post[]>("/bulk/schedule", options)
  },
}
