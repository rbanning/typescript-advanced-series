export type Nullable<T> = T | null | undefined;

export function isNullish(value: unknown): value is (null | undefined) {
  return value === null || typeof(value) === 'undefined' || value === undefined;
}

export function isNotNullish<T>(value: unknown): value is T {
  return !isNullish(value);
}