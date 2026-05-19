export function requireNonEmptyString(value: unknown, fieldName: string): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${fieldName} is required`);
  }
  return value.trim();
}

export function requireEmail(value: unknown, fieldName: string): string {
  const parsed = requireNonEmptyString(value, fieldName);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(parsed)) {
    throw new Error(`${fieldName} must be a valid email`);
  }
  return parsed;
}
