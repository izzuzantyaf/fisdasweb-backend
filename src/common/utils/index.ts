import { isInt } from 'class-validator';

export function isNotUndefinedOrNull(value: any) {
  return value !== null && value !== undefined;
}

export function isIntIdValid(value: string | number) {
  const parsedValue = Number(value);

  if (
    isNaN(parsedValue) ||
    !isInt(parsedValue) ||
    parsedValue < Number.MIN_SAFE_INTEGER ||
    parsedValue > Number.MAX_SAFE_INTEGER
  ) {
    return false;
  }

  return true;
}
