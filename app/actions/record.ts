"use server";

import { db } from "@/app/db";
import { records } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidateTag } from "next/cache";
import type { NewRecord } from "@/app/db/schema";

export async function addRecord(data: NewRecord) {
  try {
    await db.insert(records).values(data);
    revalidateTag("records");
    return { success: true };
  } catch (error) {
    console.error("Error adding record:", error);
    return { success: false, error: "Failed to add record" };
  }
}

export async function getRecords(userId: number) {
  try {
    const userRecords = await db
      .select()
      .from(records)
      .where(eq(records.userId, userId))
      .orderBy(records.createdAt);
    return { success: true, records: userRecords };
  } catch (error) {
    console.error("Error fetching records:", error);
    return { success: false, error: "Failed to fetch records" };
  }
}
