import Post from "@/components/post/Post";

export default function Feed() {
  return (
    <div className="w-full h-full overflow-y-auto">
      <div className="w-[600px] flex flex-col items-center justify-start pt-10 mx-auto">
        <Post />
      </div>
    </div>
  );
}
