export function QuoteModule({
  data,
  position,
  author,
  postLength,
  postIndex,
}: {
  data: string;
  position: string;
  author: string;
  postLength: number;
  postIndex: number;
}) {
  const positionClass =
    position === "left"
      ? ""
      : position === "center"
      ? "text-center"
      : position === "right"
      ? "text-right"
      : "";

  const positionClassQuote =
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
      className={`text-lg w-full flex flex-col justify-center ${positionClass} ${margin}`}
      key={postIndex}
    >
      <div
        className={`flex flex-row w-full items-center ${positionClassQuote}`}
      >
        {position === "right" && data}
        <div
          className={`h-[1.5rem] w-1 bg-slate-300 ${
            position === "right" ? "ml-2" : "mr-2"
          }`}
        />
        {position !== "right" && data}
      </div>
      <div className="text-sm text-slate-500">- {author}</div>
    </div>
  );
}
