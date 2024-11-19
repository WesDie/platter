import { RecordsList } from "@/app/components/RecordsList";
import { TopNavBar } from "./components/TopNavigation";

export default function Home() {
  return (
    <main className="min-h-screen py-8 px-4">
      <TopNavBar />
      <RecordsList userId={1} />
    </main>
  );
}
