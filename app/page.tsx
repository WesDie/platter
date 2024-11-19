import { TopNavBar } from "./components/TopNavigation";
import { MainRecords } from "./components/MainRecords";

export default function Home() {
  return (
    <main className="min-h-screen">
      <TopNavBar />
      <MainRecords />
    </main>
  );
}
