export function resolveName(slug: string): string {
  const tokens = slug.trim().split(/[\s_-]+/);
  const capitalized = tokens.map((token) => token.charAt(0).toUpperCase() + token.slice(1).toLowerCase());
  return capitalized.join(' ');
}
