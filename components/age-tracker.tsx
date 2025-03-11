"use client"

import { useState, useEffect } from "react"
import { differenceInMilliseconds } from "date-fns"

interface AgeTrackerProps {
  dob: Date | null
}

export function AgeTracker({ dob }: AgeTrackerProps) {
  const [age, setAge] = useState<string>("")

  useEffect(() => {
    if (!dob) {
      setAge("Please set your date of birth")
      return
    }

    const calculateAge = () => {
      const now = new Date()
      const diffMs = differenceInMilliseconds(now, dob)

      // Convert milliseconds to years with decimal precision
      const ageInYears = diffMs / (1000 * 60 * 60 * 24 * 365.25)

      // Format to 9 decimal places
      return ageInYears.toFixed(9)
    }

    // Initial calculation
    setAge(calculateAge())

    // Update every 100ms for smooth counter
    const interval = setInterval(() => {
      setAge(calculateAge())
    }, 100)

    return () => clearInterval(interval)
  }, [dob])

  return (
    <div className="text-center">
      <div className="text-3xl md:text-3xl font-bold mb-2">
        {dob ? (
          <span className="font-mono">{age}</span>
        ) : (
          <span className="text-2xl text-muted-foreground">Set your birth date in settings</span>
        )}
      </div>
    </div>
  )
}

