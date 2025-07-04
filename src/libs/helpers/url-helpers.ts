/**
 * Determines if a given URL is an external link.
 *
 * A link is considered external if:
 * - It has a different protocol (e.g., http vs https)
 * - It has a different hostname/domain
 * - It starts with a protocol (http://, https://, mailto:, tel:, etc.)
 *
 * @param href - The URL string to check
 * @returns `true` if the link is external, `false` if it's internal or relative
 */
export const isExternalLink = (href: string): boolean => {
  // Handle empty or invalid hrefs
  if (!href || typeof href !== 'string') {
    return false;
  }

  // If it starts with a hash or relative path, it's internal
  if (
    href.startsWith('#') ||
    href.startsWith('/') ||
    href.startsWith('./') ||
    href.startsWith('../')
  ) {
    return false;
  }

  // If it starts with a protocol, check if it's external
  if (
    href.includes('://') ||
    href.startsWith('mailto:') ||
    href.startsWith('tel:')
  ) {
    try {
      // Handle special protocols that aren't http/https
      if (href.startsWith('mailto:') || href.startsWith('tel:')) {
        return true;
      }

      const linkUrl = new URL(href);
      const currentUrl = new URL(window.location.href);

      return linkUrl.hostname !== currentUrl.hostname;
    } catch {
      // If URL parsing fails, treat as external for safety
      return true;
    }
  }

  // If no protocol and doesn't start with relative indicators, it's likely internal
  return false;
};
