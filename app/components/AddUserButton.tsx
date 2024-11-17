"use client";

import { useState } from "react";
import { addRandomUser } from "@/app/actions/user";

export function AddUserButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await addRandomUser();
    } catch (error) {
      console.error("Error adding user", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
    >
      {isLoading ? "Adding..." : "Add Random User"}
    </button>
  );
}
