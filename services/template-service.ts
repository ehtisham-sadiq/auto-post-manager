import { apiClient } from "@/lib/api-client"

export interface Template {
  id: string
  name: string
  description: string
  content: string
  category: string
  created_at: string
  updated_at: string
}

export interface CreateTemplateData {
  name: string
  description: string
  content: string
  category: string
}

export interface UpdateTemplateData extends Partial<CreateTemplateData> {}

export const templateService = {
  /**
   * Get all templates
   */
  async getTemplates(): Promise<Template[]> {
    return apiClient.get<Template[]>("/templates")
  },

  /**
   * Get a template by ID
   */
  async getTemplate(id: string): Promise<Template> {
    return apiClient.get<Template>(`/templates/${id}`)
  },

  /**
   * Create a new template
   */
  async createTemplate(data: CreateTemplateData): Promise<Template> {
    return apiClient.post<Template>("/templates", data)
  },

  /**
   * Update a template
   */
  async updateTemplate(id: string, data: UpdateTemplateData): Promise<Template> {
    return apiClient.put<Template>(`/templates/${id}`, data)
  },

  /**
   * Delete a template
   */
  async deleteTemplate(id: string): Promise<void> {
    return apiClient.delete<void>(`/templates/${id}`)
  },
}
