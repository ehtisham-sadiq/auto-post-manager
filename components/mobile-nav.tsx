"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { BarChart3, Calendar, Home, ImageIcon, LayoutTemplate, Menu, Settings } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Logo } from "@/components/logo"

export function MobileNav() {
  const [open, setOpen] = React.useState(false)
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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="lg:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="border-b p-4">
          <SheetTitle className="text-left">
            <Logo size="sm" />
          </SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-4rem)]">
          <div className="flex flex-col gap-2 p-4">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "default" : "ghost"}
                className={cn("justify-start gap-2", route.active && "bg-primary text-primary-foreground")}
                asChild
                onClick={() => setOpen(false)}
              >
                <Link href={route.href}>
                  <route.icon className="h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
