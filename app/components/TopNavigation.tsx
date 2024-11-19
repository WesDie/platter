"use client";

import { ModeToggle } from "./ModeToggle";

export function TopNavBar() {
  return (
    <>
      <div className="flex items-center justify-between p-4 border-b fixed top-0 left-0 right-0 z-50 bg-background">
        <h1 className="text-lg font-bold">Platter</h1>
        <ModeToggle />
      </div>
    </>
  );
}
