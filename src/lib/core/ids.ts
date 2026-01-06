/**
 * Generate a unique ID for entities
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * Generate a prefixed ID
 */
export function generatePrefixedId(prefix: string): string {
  return `${prefix}-${generateId()}`
}
