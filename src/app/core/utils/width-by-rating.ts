export function getWidthByRating(value: number): number {
  const validValue = value ?? 0;
  return Math.floor(validValue * 20);
}
