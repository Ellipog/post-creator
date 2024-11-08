"use client";

import { AsyncLinkFormatter } from "@/components/utils/asyncLinkFormatter";

export function ParagraphModule({
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
      className={`text-lg w-full ${positionClass} ${margin}`}
      key={postIndex}
    >
      <AsyncLinkFormatter text={data} />
    </div>
  );
}
