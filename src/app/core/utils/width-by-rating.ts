export function getWidthByRating(value: number | undefined): number {
  const validValue = value ?? 0;
  return Math.floor(validValue * 20);
}
