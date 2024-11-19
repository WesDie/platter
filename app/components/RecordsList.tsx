"use client";

import { useEffect, useState } from "react";
import { getRecords } from "@/app/actions/record";
import type { Record } from "@/app/db/schema";
import Image from "next/image";
import { AddRecordForm } from "./AddRecordForm";

export function RecordsList({
  userId,
  onRecordSelect,
}: {
  userId: number;
  onRecordSelect: (record: Record) => void;
}) {
  const [records, setRecords] = useState<Record[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
    <div className="grid gap-4 auto-rows-auto grid-cols-[repeat(auto-fill,minmax(200px,1fr))] pt-24 px-4 overflow-y-auto max-h-screen scrollbar-hide">
      {records.map((record) => (
        <div
          key={record.id}
          className={`group relative bg-card text-card-foreground shadow-sm transition-all duration-300 cursor-pointer flex flex-col gap-2 ${
            hoveredId && hoveredId !== record.id ? "opacity-30" : ""
          }`}
          onMouseEnter={() => setHoveredId(record.id)}
          onMouseLeave={() => setHoveredId(null)}
          onClick={() => onRecordSelect(record)}
        >
          {record.imageUrl ? (
            <div className="relative aspect-square overflow-hidden">
              <Image
                src={record.imageUrl}
                alt={`${record.title} album cover`}
                fill
                className="object-cover transition-transform"
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              />
            </div>
          ) : (
            <div className="aspect-square bg-muted flex items-center justify-center">
              <span className="text-muted-foreground">No cover</span>
            </div>
          )}
          {/* <div className="flex items-center justify-between">
            <span
              className={`w-2 h-2 rounded-full ${
                record.condition === "Mint"
                  ? "bg-green-500"
                  : record.condition === "Excellent"
                  ? "bg-blue-500"
                  : record.condition === "Good"
                  ? "bg-yellow-500"
                  : record.condition === "Fair"
                  ? "bg-orange-500"
                  : "bg-red-500"
              }`}
            ></span>
          </div> */}
        </div>
      ))}
      <AddRecordForm userId={1} />
    </div>
  );
}
