"use client";

import { useEffect, useState } from "react";
import { getRecords } from "@/app/actions/record";
import type { Record } from "@/app/db/schema";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function RecordsList({ userId }: { userId: number }) {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadRecords() {
      const result = await getRecords(userId);
      if (result.success && result.records) {
        setRecords(result.records);
      }
      setIsLoading(false);
    }

    const debounce = setTimeout(loadRecords, 300);
    return () => clearTimeout(debounce);
  }, [userId]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="mt-8 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold tracking-tight">
          Your Collection
        </h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {records.map((record) => (
          <div
            key={record.id}
            className="group relative rounded-lg border bg-card text-card-foreground shadow-sm transition-colors"
          >
            <div className="p-6 space-y-4">
              {record.imageUrl ? (
                <div className="relative aspect-square overflow-hidden rounded-md">
                  <Image
                    src={record.imageUrl}
                    alt={`${record.title} album cover`}
                    fill
                    className="object-cover transition-transform"
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </div>
              ) : (
                <div className="aspect-square rounded-md bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No cover</span>
                </div>
              )}
              <div className="space-y-1">
                <h3 className="font-semibold leading-none tracking-tight">
                  {record.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  by {record.artist} ({record.releaseYear})
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <span
                  className={cn(
                    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
                    "bg-primary/10 text-primary"
                  )}
                >
                  {record.format}
                </span>
                {record.condition && (
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
                      "bg-secondary/10 text-secondary-foreground"
                    )}
                  >
                    {record.condition}
                  </span>
                )}
              </div>
              {record.notes && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {record.notes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
