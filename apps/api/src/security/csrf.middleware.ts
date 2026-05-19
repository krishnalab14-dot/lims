export function csrfProtectionMiddleware(csrfHeader?: string, csrfCookie?: string): void {
  if (!csrfHeader || !csrfCookie || csrfHeader !== csrfCookie) {
    throw new Error('Invalid CSRF token');
  }
}
