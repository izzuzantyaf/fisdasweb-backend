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

/**
 * This function do mutation in-place
 * @param dto
 */
export function normalizeDto(dto: object) {
  // trim every string
  for (const key in dto) {
    if (typeof dto[key] === undefined || dto[key] === null) {
      continue;
    }

    if (typeof dto[key] === 'string') {
      dto[key] = dto[key].trim();
    } else if (Array.isArray(dto[key])) {
      dto[key].forEach((item) => {
        normalizeDto(item);
      });
    } else if (typeof dto[key] === 'object') {
      normalizeDto(dto[key]);
    }
  }
}
