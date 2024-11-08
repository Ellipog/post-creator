import Navbar from "@/components/ui/Navbar";
import Creator from "@/components/creator/Creator";

export default function CreatorPage() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Navbar />
        <Creator />
      </div>
    </div>
  );
}
