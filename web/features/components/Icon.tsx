import { useState } from 'react';

interface IconProps {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}

export const Icon = ({ src, alt, size = 120, className }: IconProps) => {
  const [hasError, setHasError] = useState(false);
  const sizeInPx = `${size}px`;

  const getInitials = (name: string) =>
    name
      .split(/[\s-]/)
      .map((word) => word[0]?.toUpperCase())
      .join('')
      .slice(0, 2);

  return (
    <div
      className={`flex items-center justify-center ${className || ''}`}
      style={{
        width: sizeInPx,
        height: sizeInPx,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
      }}
    >
      {!hasError ? (
        <img src={src} alt={alt} className="w-100 h-full object-cover" onError={() => setHasError(true)} />
      ) : (
        <span>{getInitials(alt)}</span>
      )}
    </div>
  );
};
