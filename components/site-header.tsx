import Link from "next/link"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { MobileNav } from "@/components/mobile-nav"
import { Logo } from "@/components/logo"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MobileNav />
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo showText={false} className="sm:hidden" />
            <Logo className="hidden sm:flex" />
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <Button asChild variant="default" className="hidden sm:flex">
              <Link href="/posts/new">
                <PlusCircle className="mr-2 h-4 w-4" />
                Create Post
              </Link>
            </Button>
            <Button asChild variant="default" size="icon" className="sm:hidden">
              <Link href="/posts/new">
                <PlusCircle className="h-4 w-4" />
              </Link>
            </Button>
            <ModeToggle />
            <UserNav />
          </nav>
        </div>
      </div>
    </header>
  )
}
