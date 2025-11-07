// movie-status.enum.ts
export const MovieStatusEnum = {
  RELEASED: "RELEASED",
  UPCOMING: "UPCOMING",
  DRAFT: "DRAFT",
} as const;

export type MovieStatus =
  (typeof MovieStatusEnum)[keyof typeof MovieStatusEnum];
