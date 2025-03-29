"use client";

import { useState } from "react";
import { Settings } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";

interface SettingsDialogProps {
  selectedDate: Date | null;
  onDateChange: (date: Date | null) => void;
}

export function SettingsDialog({
  selectedDate,
  onDateChange,
}: SettingsDialogProps) {
  const [open, setOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(selectedDate);

  const handleSave = () => {
    onDateChange(tempDate);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your profile information here.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dob">
              Date of Birth
            </Label>
            <div className="col-span-3">
              <Button
                id="dob"
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !selectedDate && "text-muted-foreground"
                )}
                onClick={() => setCalendarOpen(!calendarOpen)}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  format(selectedDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
              {calendarOpen && (
                <div className="absolute z-50 mt-2 bg-background p-4 rounded-lg border shadow-lg">
                  <Calendar
                    mode="single"
                    selected={tempDate || undefined}
                    onSelect={(day) => {
                      setTempDate(day || null);
                      setCalendarOpen(false);
                      if (day) {
                        onDateChange(day);
                      }
                    }}
                    initialFocus
                    captionLayout="dropdown-buttons"
                    fromYear={1900}
                    toYear={new Date().getFullYear()}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end">
          <Button onClick={handleSave}>Save changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
