"use client";

import { AsyncLinkFormatter } from "@/components/utils/asyncLinkFormatter";

export function ParagraphModule({
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
      className={`text-lg w-full ${positionClass} ${!editing && margin}`}
      key={postIndex}
    >
      <AsyncLinkFormatter text={data} />
    </div>
  );
}
