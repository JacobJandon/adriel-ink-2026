import React from 'react';

interface BaseLogoProps {
  className?: string;
  style?: React.CSSProperties;
  title?: string;
  ariaHidden?: boolean;
}

// Icon-only logo for header/sidebar
export function AdrielLogo({ className = '', style = {}, size = 40, title = 'Adriel AI', ariaHidden }: BaseLogoProps & { size?: number }) {
  return (
    <img
      src="/assets/adriel-icon.png"
      alt={ariaHidden ? '' : 'Adriel AI icon'}
      aria-hidden={ariaHidden || undefined}
      width={size}
      height={size}
      className={className}
      style={style}
      title={title}
      draggable={false}
    />
  );
}

// Full wordmark logo
export function AdrielLogoFull({ className = '', style = {}, height = 64, title = 'Adriel AI', ariaHidden }: BaseLogoProps & { height?: number }) {
  return (
    <img
      src="/assets/adriel-full-transparent.png"
      alt={ariaHidden ? '' : 'Adriel AI full logo'}
      aria-hidden={ariaHidden || undefined}
      height={height}
      className={className}
      style={style}
      title={title}
      draggable={false}
    />
  );
}
