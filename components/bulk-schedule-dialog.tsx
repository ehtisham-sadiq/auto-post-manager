"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { format, addDays, addWeeks, setHours, setMinutes, isBefore, isWeekend } from "date-fns"
import { CalendarIcon, Clock, Info } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"

interface BulkScheduleDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  posts: any[]
  onSchedule: (scheduledPosts: any[]) => void
}

export function BulkScheduleDialog({ open, onOpenChange, posts, onSchedule }: BulkScheduleDialogProps) {
  const { toast } = useToast()
  const [scheduleType, setScheduleType] = useState("evenly")
  const [startDate, setStartDate] = useState<Date>(new Date())
  const [endDate, setEndDate] = useState<Date>(addWeeks(new Date(), 4))
  const [frequency, setFrequency] = useState("weekly")
  const [weekdays, setWeekdays] = useState({
    monday: true,
    tuesday: true,
    wednesday: true,
    thursday: true,
    friday: true,
    saturday: false,
    sunday: false,
  })
  const [timeSlot, setTimeSlot] = useState("morning")
  const [customTime, setCustomTime] = useState("09:00")
  const [scheduledPosts, setScheduledPosts] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("options")

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setScheduleType("evenly")
      setStartDate(new Date())
      setEndDate(addWeeks(new Date(), 4))
      setFrequency("weekly")
      setWeekdays({
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      })
      setTimeSlot("morning")
      setCustomTime("09:00")
      setScheduledPosts([])
      setActiveTab("options")
    }
  }, [open])

  // Generate schedule preview when options change
  useEffect(() => {
    if (!open || posts.length === 0) return

    let scheduleDates: Date[] = []

    if (scheduleType === "evenly") {
      // Calculate days between start and end date
      const daysBetween = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
      const postsCount = posts.length

      // Calculate interval between posts
      let interval = Math.floor(daysBetween / postsCount)
      if (interval < 1) interval = 1

      // Generate dates
      scheduleDates = Array.from({ length: postsCount }, (_, i) => {
        let date = addDays(startDate, i * interval)

        // Apply time based on timeSlot
        if (timeSlot === "custom") {
          const [hours, minutes] = customTime.split(":").map(Number)
          date = setHours(date, hours)
          date = setMinutes(date, minutes)
        } else if (timeSlot === "morning") {
          date = setHours(date, 9)
          date = setMinutes(date, 0)
        } else if (timeSlot === "noon") {
          date = setHours(date, 12)
          date = setMinutes(date, 0)
        } else if (timeSlot === "evening") {
          date = setHours(date, 17)
          date = setMinutes(date, 0)
        }

        // Skip weekends if needed
        if (frequency === "weekdays" && isWeekend(date)) {
          date = addDays(date, isWeekend(date) && date.getDay() === 0 ? 1 : 2)
        }

        return date
      })
    } else if (scheduleType === "frequency") {
      let currentDate = new Date(startDate)
      const scheduleDatesTemp: Date[] = []

      // Generate enough dates based on frequency
      while (scheduleDatesTemp.length < posts.length && isBefore(currentDate, endDate)) {
        const dayOfWeek = currentDate.getDay() // 0 = Sunday, 1 = Monday, etc.

        // Check if the current day is selected
        const isDaySelected =
          (dayOfWeek === 1 && weekdays.monday) ||
          (dayOfWeek === 2 && weekdays.tuesday) ||
          (dayOfWeek === 3 && weekdays.wednesday) ||
          (dayOfWeek === 4 && weekdays.thursday) ||
          (dayOfWeek === 5 && weekdays.friday) ||
          (dayOfWeek === 6 && weekdays.saturday) ||
          (dayOfWeek === 0 && weekdays.sunday)

        if (isDaySelected) {
          let scheduleDate = new Date(currentDate)

          // Apply time based on timeSlot
          if (timeSlot === "custom") {
            const [hours, minutes] = customTime.split(":").map(Number)
            scheduleDate = setHours(scheduleDate, hours)
            scheduleDate = setMinutes(scheduleDate, minutes)
          } else if (timeSlot === "morning") {
            scheduleDate = setHours(scheduleDate, 9)
            scheduleDate = setMinutes(scheduleDate, 0)
          } else if (timeSlot === "noon") {
            scheduleDate = setHours(scheduleDate, 12)
            scheduleDate = setMinutes(scheduleDate, 0)
          } else if (timeSlot === "evening") {
            scheduleDate = setHours(scheduleDate, 17)
            scheduleDate = setMinutes(scheduleDate, 0)
          }

          scheduleDatesTemp.push(scheduleDate)
        }

        // Move to next day
        currentDate = addDays(currentDate, 1)
      }

      scheduleDates = scheduleDatesTemp.slice(0, posts.length)
    } else if (scheduleType === "optimal") {
      // For optimal timing, we'd normally use analytics data
      // Here we'll simulate optimal times based on common patterns
      const optimalTimes = [
        { day: 2, hour: 9, minute: 0 }, // Tuesday 9 AM
        { day: 3, hour: 12, minute: 0 }, // Wednesday 12 PM
        { day: 4, hour: 17, minute: 0 }, // Thursday 5 PM
        { day: 1, hour: 8, minute: 30 }, // Monday 8:30 AM
        { day: 5, hour: 15, minute: 0 }, // Friday 3 PM
      ]

      let currentDate = new Date(startDate)
      const scheduleDatesTemp: Date[] = []

      // Generate enough dates based on optimal times
      while (scheduleDatesTemp.length < posts.length && isBefore(currentDate, endDate)) {
        const optimalTime = optimalTimes[scheduleDatesTemp.length % optimalTimes.length]

        // Find the next occurrence of the optimal day
        while (currentDate.getDay() !== optimalTime.day) {
          currentDate = addDays(currentDate, 1)
        }

        let scheduleDate = new Date(currentDate)
        scheduleDate = setHours(scheduleDate, optimalTime.hour)
        scheduleDate = setMinutes(scheduleDate, optimalTime.minute)

        scheduleDatesTemp.push(scheduleDate)

        // Move to next day to avoid duplicates
        currentDate = addDays(currentDate, 1)
      }

      scheduleDates = scheduleDatesTemp.slice(0, posts.length)
    }

    // Create scheduled posts
    const newScheduledPosts = posts.map((post, index) => ({
      ...post,
      scheduledDate: scheduleDates[index] || null,
    }))

    setScheduledPosts(newScheduledPosts)
  }, [open, posts, scheduleType, startDate, endDate, frequency, weekdays, timeSlot, customTime])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check if all posts have scheduled dates
    const unscheduledPosts = scheduledPosts.filter((post) => !post.scheduledDate)
    if (unscheduledPosts.length > 0) {
      toast({
        title: "Scheduling Error",
        description: `${unscheduledPosts.length} posts could not be scheduled. Please adjust your date range.`,
        variant: "destructive",
      })
      return
    }

    // Update posts with scheduled dates and status
    const updatedPosts = scheduledPosts.map((post) => ({
      ...post,
      date: post.scheduledDate,
      status: "Scheduled",
    }))

    onSchedule(updatedPosts)
    onOpenChange(false)

    toast({
      title: "Posts Scheduled",
      description: `Successfully scheduled ${updatedPosts.length} posts.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] max-h-[90vh] flex flex-col">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Bulk Schedule Posts</DialogTitle>
            <DialogDescription>Schedule multiple posts at once using different timing options.</DialogDescription>
          </DialogHeader>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="options">Scheduling Options</TabsTrigger>
              <TabsTrigger value="preview">Preview Schedule</TabsTrigger>
            </TabsList>

            <TabsContent value="options" className="space-y-4 mt-4 overflow-auto">
              <div className="space-y-4">
                <RadioGroup value={scheduleType} onValueChange={setScheduleType} className="space-y-4">
                  <div className="flex items-start space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="evenly" id="evenly" className="mt-1" />
                    <div className="space-y-1 w-full">
                      <Label htmlFor="evenly" className="font-medium">
                        Evenly Spaced
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Distribute posts evenly across the selected date range.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="frequency" id="frequency" className="mt-1" />
                    <div className="space-y-1 w-full">
                      <Label htmlFor="frequency" className="font-medium">
                        Specific Days
                      </Label>
                      <p className="text-sm text-muted-foreground">Schedule posts on specific days of the week.</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 rounded-md border p-4">
                    <RadioGroupItem value="optimal" id="optimal" className="mt-1" />
                    <div className="space-y-1 w-full">
                      <Label htmlFor="optimal" className="font-medium">
                        Optimal Timing
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        Schedule posts at optimal times based on engagement analytics.
                      </p>
                      <div className="flex items-center mt-1 text-xs text-muted-foreground">
                        <Info className="h-3 w-3 mr-1" />
                        <span>Uses historical data to determine the best posting times.</span>
                      </div>
                    </div>
                  </div>
                </RadioGroup>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="start-date">Start Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                          id="start-date"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {startDate ? format(startDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={startDate}
                          onSelect={(date) => date && setStartDate(date)}
                          initialFocus
                          disabled={(date) => isBefore(date, new Date())}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="end-date">End Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal" id="end-date">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {endDate ? format(endDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={endDate}
                          onSelect={(date) => date && setEndDate(date)}
                          initialFocus
                          disabled={(date) => isBefore(date, startDate)}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {scheduleType === "frequency" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Days of the Week</Label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="monday"
                            checked={weekdays.monday}
                            onCheckedChange={(checked) => setWeekdays({ ...weekdays, monday: checked === true })}
                          />
                          <Label htmlFor="monday" className="text-sm">
                            Monday
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="tuesday"
                            checked={weekdays.tuesday}
                            onCheckedChange={(checked) => setWeekdays({ ...weekdays, tuesday: checked === true })}
                          />
                          <Label htmlFor="tuesday" className="text-sm">
                            Tuesday
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="wednesday"
                            checked={weekdays.wednesday}
                            onCheckedChange={(checked) => setWeekdays({ ...weekdays, wednesday: checked === true })}
                          />
                          <Label htmlFor="wednesday" className="text-sm">
                            Wednesday
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="thursday"
                            checked={weekdays.thursday}
                            onCheckedChange={(checked) => setWeekdays({ ...weekdays, thursday: checked === true })}
                          />
                          <Label htmlFor="thursday" className="text-sm">
                            Thursday
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="friday"
                            checked={weekdays.friday}
                            onCheckedChange={(checked) => setWeekdays({ ...weekdays, friday: checked === true })}
                          />
                          <Label htmlFor="friday" className="text-sm">
                            Friday
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="saturday"
                            checked={weekdays.saturday}
                            onCheckedChange={(checked) => setWeekdays({ ...weekdays, saturday: checked === true })}
                          />
                          <Label htmlFor="saturday" className="text-sm">
                            Saturday
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sunday"
                            checked={weekdays.sunday}
                            onCheckedChange={(checked) => setWeekdays({ ...weekdays, sunday: checked === true })}
                          />
                          <Label htmlFor="sunday" className="text-sm">
                            Sunday
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {scheduleType !== "optimal" && (
                  <div className="space-y-2">
                    <Label htmlFor="time-slot">Time of Day</Label>
                    <Select value={timeSlot} onValueChange={setTimeSlot}>
                      <SelectTrigger id="time-slot">
                        <SelectValue placeholder="Select time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="morning">Morning (9:00 AM)</SelectItem>
                        <SelectItem value="noon">Noon (12:00 PM)</SelectItem>
                        <SelectItem value="evening">Evening (5:00 PM)</SelectItem>
                        <SelectItem value="custom">Custom Time</SelectItem>
                      </SelectContent>
                    </Select>

                    {timeSlot === "custom" && (
                      <div className="mt-2 flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <Input
                          type="time"
                          value={customTime}
                          onChange={(e) => setCustomTime(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    )}
                  </div>
                )}

                {scheduleType === "evenly" && (
                  <div className="space-y-2">
                    <Label htmlFor="frequency">Frequency</Label>
                    <Select value={frequency} onValueChange={setFrequency}>
                      <SelectTrigger id="frequency">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekdays">Weekdays Only</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="preview" className="mt-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">Schedule Preview</h3>
                  <Badge variant="outline" className="ml-2">
                    {scheduledPosts.length} Posts
                  </Badge>
                </div>

                <ScrollArea className="h-[300px] rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Post Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Scheduled Date</TableHead>
                        <TableHead>Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {scheduledPosts.map((post) => (
                        <TableRow key={post.id}>
                          <TableCell className="font-medium">{post.title || "Untitled"}</TableCell>
                          <TableCell>{post.category || "—"}</TableCell>
                          <TableCell>
                            {post.scheduledDate ? format(post.scheduledDate, "EEE, MMM d, yyyy") : "Not scheduled"}
                          </TableCell>
                          <TableCell>{post.scheduledDate ? format(post.scheduledDate, "h:mm a") : "—"}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </div>
            </TabsContent>
          </Tabs>

          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Schedule Posts</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
