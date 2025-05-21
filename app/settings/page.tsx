import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { BellRing, Key, Linkedin, User } from "lucide-react"
import { LayoutWrapper } from "@/components/layout-wrapper"

export default function SettingsPage() {
  return (
    <LayoutWrapper>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="linkedin" className="flex items-center gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <BellRing className="h-4 w-4" />
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="profile" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Manage your profile information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                <div className="flex flex-col items-center space-y-2">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/images/headshot.png" alt="Ehtisham Sadiq" />
                    <AvatarFallback>ES</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                </div>
                <div className="space-y-4 flex-1">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Ehtisham Sadiq" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="title">Professional Title</Label>
                    <Input id="title" defaultValue="Machine Learning/AI Engineer" />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  defaultValue="Machine Learning/AI Engineer with 5 years of experience. BS in Software Engineering."
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="ehtisham@example.com" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Customize your branding settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="brand-name">Brand Name</Label>
                <Input id="brand-name" defaultValue="Ehtisham Sadiq" />
              </div>
              <div className="grid gap-2">
                <Label>Brand Colors</Label>
                <div className="flex flex-wrap gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="primary-color">Primary</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-jet-black"></div>
                      <Input id="primary-color" defaultValue="#1C2526" className="w-24" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="secondary-color">Secondary</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-pure-white border"></div>
                      <Input id="secondary-color" defaultValue="#FFFFFF" className="w-24" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="accent-color">Accent</Label>
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-md bg-emerald-green"></div>
                      <Input id="accent-color" defaultValue="#2ECC71" className="w-24" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="linkedin" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>LinkedIn Integration</CardTitle>
              <CardDescription>Connect your LinkedIn account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="rounded-lg border p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Linkedin className="h-8 w-8" />
                  <div>
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-sm text-muted-foreground">Connected as Ehtisham Sadiq</p>
                  </div>
                </div>
                <Button variant="outline">Disconnect</Button>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="linkedin-url">LinkedIn Profile URL</Label>
                <Input id="linkedin-url" defaultValue="https://linkedin.com/in/ehtisham-sadiq" />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>API Settings</CardTitle>
              <CardDescription>Manage your LinkedIn API settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="api-key">API Key</Label>
                <div className="flex">
                  <Input id="api-key" type="password" defaultValue="••••••••••••••••" className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="api-secret">API Secret</Label>
                <div className="flex">
                  <Input id="api-secret" type="password" defaultValue="••••••••••••••••" className="rounded-r-none" />
                  <Button variant="outline" className="rounded-l-none">
                    <Key className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage your notification preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="font-medium">Post Reminders</div>
                  <div className="text-sm text-muted-foreground">Receive reminders 24 hours before scheduled posts</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="font-medium">Post Published</div>
                  <div className="text-sm text-muted-foreground">Receive notifications when posts are published</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="font-medium">Engagement Updates</div>
                  <div className="text-sm text-muted-foreground">Receive notifications about post engagement</div>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between space-y-0 rounded-lg border p-4">
                <div className="space-y-0.5">
                  <div className="font-medium">Email Notifications</div>
                  <div className="text-sm text-muted-foreground">Receive notifications via email</div>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </LayoutWrapper>
  )
}
