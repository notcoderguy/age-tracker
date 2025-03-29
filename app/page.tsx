"use client"

import { useState, useEffect } from "react"
import { Github } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { SettingsDialog } from "@/components/settings-dialog"
import { AgeTracker } from "@/components/age-tracker"

export default function Home() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)

  // Load saved data on component mount
  useEffect(() => {
    const savedDate = localStorage.getItem("dob")
    if (savedDate) {
      setSelectedDate(new Date(savedDate))
    }
  }, [])

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date)
    if (date) {
      localStorage.setItem("dob", date.toISOString())
    }
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center overflow-hidden relative">
      {/* Icons in the top-right corner */}
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <ThemeToggle />
        <SettingsDialog
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
        <Link
          href="https://github.com/notcoderguy/age-tracker"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub repository"
        >
          <Button variant="ghost" size="icon">
            <Github className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Age tracker in the middle of the screen */}
      <AgeTracker dob={selectedDate} />
    </main>
  )
}
