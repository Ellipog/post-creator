import Image from "next/image";

export function ImageModule({
  data,
  position,
  alt,
  postLength,
  postIndex,
  editing = false,
}: {
  data: string;
  position: string;
  alt: string;
  postLength: number;
  postIndex: number;
  editing: boolean;
}) {
  const positionClass =
    position === "left"
      ? "justify-start"
      : position === "center"
      ? "justify-center"
      : position === "right"
      ? "justify-end"
      : "justify-start";

  const margin =
    postIndex === 0 ? "mb-3" : postIndex === postLength - 1 ? "mt-3" : "my-3";

  return (
    <div
      className={`${positionClass} flex group relative ${!editing && margin}`}
      key={postIndex}
    >
      <div className="relative w-fit">
        <Image
          src={data}
          alt={alt}
          width={0}
          height={0}
          sizes="100%"
          className="w-auto h-auto group-hover:brightness-[0.8] transition-all duration-200 object-contain rounded-md max-h-[400px] min-h-[200px]"
        />
        <div className="absolute bottom-2 left-2 right-2 text-lg text-white/90 font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          {alt}
        </div>
      </div>
    </div>
  );
}
