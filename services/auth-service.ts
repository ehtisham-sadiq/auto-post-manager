import { apiClient } from "@/lib/api-client"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: {
    id: string
    email: string
    name: string
  }
}

export const authService = {
  /**
   * Login with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const formData = new URLSearchParams()
    formData.append("username", credentials.email)
    formData.append("password", credentials.password)

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.detail || "Login failed")
    }

    return response.json()
  },

  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>("/auth/register", data)
  },

  /**
   * Get the current user profile
   */
  async getProfile() {
    return apiClient.get("/users/me")
  },
}
