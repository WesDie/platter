"use client";

import { useState } from "react";
import { addRecord } from "@/app/actions/record";
import type { NewRecord } from "@/app/db/schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";

const formats = ["Vinyl", "CD", "Cassette", "Digital", "Other"];
const conditions = ["Mint", "Excellent", "Good", "Fair", "Poor"];

export function AddRecordForm({ userId }: { userId: number }) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const record: NewRecord = {
      userId,
      title: formData.get("title") as string,
      artist: formData.get("artist") as string,
      releaseYear: parseInt(formData.get("releaseYear") as string),
      format: formData.get("format") as string,
      condition: formData.get("condition") as string,
      notes: formData.get("notes") as string,
    };

    try {
      await addRecord(record);
      (e.target as HTMLFormElement).reset();
      setOpen(false);
    } catch (error) {
      console.error("Error adding record:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="w-fit m-auto" variant="outline">
          <Plus className="rounded-full border-2" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Record</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="artist">Artist</Label>
            <Input id="artist" name="artist" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="releaseYear">Release Year</Label>
            <Input type="number" id="releaseYear" name="releaseYear" required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="format">Format</Label>
            <Select name="format" required>
              <SelectTrigger>
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent>
                {formats.map((format) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition</Label>
            <Select name="condition" required>
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                {conditions.map((condition) => (
                  <SelectItem key={condition} value={condition}>
                    {condition}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" />
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
            aria-label="Add Record"
          >
            {isLoading ? "Adding..." : "Add Record"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
