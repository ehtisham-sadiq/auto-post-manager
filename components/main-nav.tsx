"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BarChart3, Calendar, FileUp, Home, ImageIcon, LayoutTemplate, Settings } from "lucide-react"

export function MainNav() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/",
      label: "Dashboard",
      icon: Home,
      active: pathname === "/",
    },
    {
      href: "/posts",
      label: "Posts",
      icon: ImageIcon,
      active: pathname === "/posts" || pathname.startsWith("/posts/"),
    },
    {
      href: "/schedule",
      label: "Schedule",
      icon: Calendar,
      active: pathname === "/schedule",
    },
    {
      href: "/templates",
      label: "Templates",
      icon: LayoutTemplate,
      active: pathname === "/templates",
    },
    {
      href: "/bulk-upload",
      label: "Bulk Upload",
      icon: FileUp,
      active: pathname === "/bulk-upload",
    },
    {
      href: "/analytics",
      label: "Analytics",
      icon: BarChart3,
      active: pathname === "/analytics",
    },
    {
      href: "/settings",
      label: "Settings",
      icon: Settings,
      active: pathname === "/settings",
    },
  ]

  return (
    <nav className="flex flex-col gap-2 p-2">
      {routes.map((route) => (
        <Button
          key={route.href}
          variant={route.active ? "default" : "ghost"}
          className={cn("justify-start gap-2", route.active && "bg-primary text-primary-foreground")}
          asChild
        >
          <Link href={route.href}>
            <route.icon className="h-4 w-4" />
            {route.label}
          </Link>
        </Button>
      ))}
    </nav>
  )
}
