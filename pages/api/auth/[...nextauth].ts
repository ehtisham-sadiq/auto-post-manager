import NextAuth from "next-auth"
// Adjust the import below to your actual NextAuth config location
// If you don't have a separate config, you can define providers and options here directly
import { authOptions } from "@/lib/auth"

export default NextAuth(authOptions) 