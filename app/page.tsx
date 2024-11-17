import { AddRecordForm } from "@/app/components/AddRecordForm";
import { RecordsList } from "@/app/components/RecordsList";
import { ModeToggle } from "@/app/components/ModeToggle";

// TODO: Replace with actual user authentication
const DEMO_USER_ID = 1;

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">Platter</h1>
          <ModeToggle />
        </div>
        <AddRecordForm userId={DEMO_USER_ID} />
        <RecordsList userId={DEMO_USER_ID} />
      </div>
    </main>
  );
}
