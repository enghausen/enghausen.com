/**
 * Swaps between a light and dark variant of a static asset following the
 * system color scheme, matching the light-dark() token strategy (no JS toggle).
 */
export function ThemeImage({
  light,
  dark,
  alt,
  className,
}: {
  light: string;
  dark: string;
  alt: string;
  className?: string;
}) {
  return (
    <picture>
      <source srcSet={dark} media="(prefers-color-scheme: dark)" />
      <img src={light} alt={alt} className={className} />
    </picture>
  );
}
