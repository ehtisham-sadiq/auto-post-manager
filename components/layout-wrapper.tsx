import type React from "react"
import { SiteHeader } from "@/components/site-header"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

interface LayoutWrapperProps {
  children: React.ReactNode
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 lg:block">
          <MainNav />
        </aside>
        <main className="flex-1 flex flex-col">
          <div className="flex-1 p-4 md:p-6">{children}</div>
          <Footer />
        </main>
      </div>
    </div>
  )
}
