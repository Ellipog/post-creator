import Feed from "@/components/ui/Feed";
import Navbar from "@/components/ui/Navbar";

export default function Home() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Navbar />
        <Feed />
      </div>
    </div>
  );
}
