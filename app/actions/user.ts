"use server";

import { db } from "@/app/db";
import { users } from "@/app/db/schema";
import { faker } from "@faker-js/faker";

export async function addRandomUser() {
  try {
    const randomUser = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      age: faker.number.int({ min: 18, max: 80 }),
    };

    console.log("Adding user:", randomUser);
    await db.insert(users).values(randomUser);
    return { success: true, user: randomUser };
  } catch (error) {
    console.error("Error adding user:", error);
    return { success: false, error: "Failed to add user" };
  }
}

export async function getUsers() {
  try {
    const allUsers = await db.select().from(users);
    return { success: true, users: allUsers };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, error: "Failed to fetch users" };
  }
}
