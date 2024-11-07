import Image from "next/image";

export function ImageModule({
  data,
  position,
  alt,
  postLength,
  postIndex,
}: {
  data: string;
  position: string;
  alt: string;
  postLength: number;
  postIndex: number;
}) {
  const positionClass =
    position === "left"
      ? "justify-start"
      : position === "center"
      ? "justify-center"
      : position === "right"
      ? "justify-end"
      : "";

  const margin =
    postIndex === 0 ? "mb-3" : postIndex === postLength - 1 ? "mt-3" : "my-3";

  return (
    <div
      className={`w-full ${positionClass} flex group relative ${margin}`}
      key={postIndex}
    >
      <Image
        src={data}
        alt={alt}
        width={0}
        height={0}
        sizes="100%"
        className="rounded-md max-h-[400px] w-auto h-auto group-hover:brightness-[0.8] transition-all duration-200"
        style={{
          objectFit: "contain",
        }}
      />
      <div className="absolute bottom-2 left-2 text-lg text-white/90 font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {alt}
      </div>
    </div>
  );
}
