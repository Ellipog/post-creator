export function HeaderModule({
  data,
  position,
  postLength,
  postIndex,
  editing = false,
}: {
  data: string;
  position: string;
  postLength: number;
  postIndex: number;
  editing: boolean;
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
      className={`text-2xl font-bold w-full ${positionClass} ${
        !editing && margin
      }`}
      key={postIndex}
    >
      {data}
    </div>
  );
}
