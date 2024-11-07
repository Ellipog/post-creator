export function HeaderModule({
  data,
  position,
  postLength,
  postIndex,
}: {
  data: string;
  position: string;
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

  const margin =
    postIndex === 0 ? "mb-3" : postIndex === postLength - 1 ? "mt-3" : "my-3";

  return (
    <div
      className={`text-2xl font-bold w-full ${positionClass} ${margin}`}
      key={postIndex}
    >
      {data}
    </div>
  );
}
