import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="flex h-screen flex-col items-center justify-center p-8 text-center">
      <h2 className="text-4xl font-bold mb-4">404</h2>
      <p className="text-xl mb-2">Page Not Found</p>
      <p className="text-muted-foreground mb-6">The page you are looking for doesn't exist or has been moved.</p>
      <Button asChild>
        <Link href="/">Go to Homepage</Link>
      </Button>
    </div>
  )
}
