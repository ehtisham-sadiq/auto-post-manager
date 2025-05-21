import type React from "react"
import { ProtectedRoute } from "@/components/protected-route"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <LayoutWrapper>{children}</LayoutWrapper>
    </ProtectedRoute>
  )
}
