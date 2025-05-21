import { apiClient } from "@/lib/api-client"

export interface Post {
  id: string
  title: string
  content: string
  caption: string
  category: string
  niche: string
  status: "Draft" | "Published" | "Scheduled"
  scheduled_date?: string
  published_date?: string
  engagement_count: number
  image_url?: string
  created_at: string
  updated_at: string
}

export interface CreatePostData {
  title: string
  content: string
  caption: string
  category: string
  niche: string
  image_url?: string
}

export interface UpdatePostData extends Partial<CreatePostData> {
  status?: "Draft" | "Published" | "Scheduled"
  scheduled_date?: string
}

export const postService = {
  /**
   * Get all posts
   */
  async getPosts(): Promise<Post[]> {
    return apiClient.get<Post[]>("/posts")
  },

  /**
   * Get a post by ID
   */
  async getPost(id: string): Promise<Post> {
    return apiClient.get<Post>(`/posts/${id}`)
  },

  /**
   * Create a new post
   */
  async createPost(data: CreatePostData): Promise<Post> {
    return apiClient.post<Post>("/posts", data)
  },

  /**
   * Update a post
   */
  async updatePost(id: string, data: UpdatePostData): Promise<Post> {
    return apiClient.put<Post>(`/posts/${id}`, data)
  },

  /**
   * Delete a post
   */
  async deletePost(id: string): Promise<void> {
    return apiClient.delete<void>(`/posts/${id}`)
  },

  /**
   * Schedule a post
   */
  async schedulePost(id: string, scheduledDate: string): Promise<Post> {
    return apiClient.put<Post>(`/posts/${id}/schedule`, { scheduled_date: scheduledDate })
  },

  /**
   * Publish a post
   */
  async publishPost(id: string): Promise<Post> {
    return apiClient.put<Post>(`/posts/${id}/publish`, {})
  },
}
