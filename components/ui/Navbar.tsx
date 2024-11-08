import { House, PlusCircle, UserCircle } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="fixed left-5 bottom-5 flex flex-col gap-4">
      <button className="group relative text-slate-500 hover:text-slate-600 flex items-center transition-all duration-200">
        <Link href="/creator" className="relative flex items-center">
          <PlusCircle size={42} />
          <span
            className="absolute left-full ml-1 px-2 py-1 font-bold rounded-md 
            opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-200 whitespace-nowrap"
          >
            Create Post
          </span>
        </Link>
      </button>
      <button className="group relative text-slate-500 hover:text-slate-600 flex items-center transition-all duration-200">
        <Link href="/" className="relative flex items-center">
          <House size={42} />
          <span
            className="absolute left-full ml-1 px-2 py-1 font-bold rounded-md 
            opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-200 whitespace-nowrap"
          >
            Home
          </span>
        </Link>
      </button>
      <button className="group relative text-slate-500 hover:text-slate-600 flex items-center transition-all duration-200">
        <div className="relative flex items-center">
          <UserCircle size={42} />
          <span
            className="absolute left-full ml-1 px-2 py-1 font-bold rounded-md 
            opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0
            transition-all duration-200 whitespace-nowrap"
          >
            Username
          </span>
        </div>
      </button>
    </div>
  );
}
