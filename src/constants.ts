export const validDimensions = ["6x6", "9x9"] as const;
export type ValidDimensions = (typeof validDimensions)[number];
