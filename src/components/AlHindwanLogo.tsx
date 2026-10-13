import React from 'react';

interface AlHindwanLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'icon';
  variant?: 'full' | 'iconOnly';
}

export const AlHindwanLogo: React.FC<AlHindwanLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full'
}) => {
  // Dimensions based on size
  const sizeMap = {
    sm: { width: 130, height: 60, iconSize: 36 },
    md: { width: 180, height: 84, iconSize: 48 },
    lg: { width: 240, height: 112, iconSize: 64 },
    xl: { width: 320, height: 150, iconSize: 84 },
    icon: { width: 56, height: 56, iconSize: 48 }
  };

  const { width, height } = sizeMap[size];

  if (variant === 'iconOnly' || size === 'icon') {
    return (
      <svg
        viewBox="0 0 100 100"
        width={sizeMap[size].iconSize}
        height={sizeMap[size].iconSize}
        className={`inline-block select-none ${className}`}
        aria-label="Al-Hindwan Tours & Travels Logo"
      >
        <defs>
          <linearGradient id="goldGradIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3de98" />
            <stop offset="35%" stopColor="#d8ab4e" />
            <stop offset="70%" stopColor="#c59235" />
            <stop offset="100%" stopColor="#f8e5ab" />
          </linearGradient>
          <linearGradient id="goldBorderIcon" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#edd48b" />
            <stop offset="50%" stopColor="#9a6e1e" />
            <stop offset="100%" stopColor="#ffd875" />
          </linearGradient>
        </defs>

        {/* Black Oval Background */}
        <circle cx="50" cy="50" r="47" fill="#0c0d0e" stroke="url(#goldBorderIcon)" strokeWidth="3" />

        {/* Orbit loop */}
        <ellipse
          cx="52"
          cy="48"
          rx="32"
          ry="15"
          fill="none"
          stroke="url(#goldGradIcon)"
          strokeWidth="3.2"
          transform="rotate(-28 52 48)"
          strokeLinecap="round"
        />

        {/* Golden Airplane */}
        <g transform="translate(32, 28) rotate(-18) scale(0.65)">
          <path
            d="M20 2 L25 18 L48 24 L48 29 L25 28 L23 44 L32 49 L32 53 L20 50 L8 53 L8 49 L17 44 L15 28 L-8 29 L-8 24 L15 18 Z"
            fill="url(#goldGradIcon)"
          />
        </g>
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 400 200"
      width={width}
      height={height}
      className={`inline-block select-none ${className}`}
      aria-label="Al-Hindwan Tours & Travels Logo"
    >
      <defs>
        {/* Rich Metallic Gold Gradients matching the user's emblem */}
        <linearGradient id="goldMetallic" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fcedb4" />
          <stop offset="25%" stopColor="#dfb75f" />
          <stop offset="50%" stopColor="#c69537" />
          <stop offset="75%" stopColor="#e5be6b" />
          <stop offset="100%" stopColor="#a37421" />
        </linearGradient>

        <linearGradient id="goldStrokeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fae7a5" />
          <stop offset="30%" stopColor="#a37624" />
          <stop offset="70%" stopColor="#ecd386" />
          <stop offset="100%" stopColor="#8d621b" />
        </linearGradient>

        <radialGradient id="badgeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#1e1e1e" />
          <stop offset="75%" stopColor="#0b0b0d" />
          <stop offset="100%" stopColor="#050506" />
        </radialGradient>

        <filter id="softShadow" x="-10%" y="-10%" width="120%" height="120%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000000" floodOpacity="0.8" />
        </filter>
      </defs>

      {/* Main Oval Badge */}
      <g filter="url(#softShadow)">
        {/* Outer Gold Ring */}
        <ellipse
          cx="200"
          cy="100"
          rx="192"
          ry="92"
          fill="none"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="6"
        />

        {/* Dark Badge Interior */}
        <ellipse
          cx="200"
          cy="100"
          rx="188"
          ry="88"
          fill="url(#badgeGlow)"
        />

        {/* Inner Thin Gold Accent Rim */}
        <ellipse
          cx="200"
          cy="100"
          rx="184"
          ry="84"
          fill="none"
          stroke="url(#goldMetallic)"
          strokeWidth="1.2"
          opacity="0.6"
        />
      </g>

      {/* Golden Airplane with Dynamic Orbit Loop */}
      <g transform="translate(195, 52)">
        {/* Orbit loop behind & around airplane */}
        <ellipse
          cx="5"
          cy="-4"
          rx="54"
          ry="20"
          fill="none"
          stroke="url(#goldMetallic)"
          strokeWidth="4.2"
          strokeLinecap="round"
          transform="rotate(-26 5 -4)"
        />

        {/* Orbit secondary reflection curve */}
        <path
          d="M-36 12 C -20 28, 25 24, 46 2"
          fill="none"
          stroke="url(#goldStrokeGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Airplane Symbol */}
        <g transform="translate(-16, -10) rotate(-22) scale(0.68)">
          <path
            d="M 0 -24
               L 4 -4
               L 32 4
               L 32 10
               L 4 8
               L 2 24
               L 14 30
               L 14 34
               L 0 31
               L -14 34
               L -14 30
               L -2 24
               L -4 8
               L -32 10
               L -32 4
               L -4 -4
               Z"
            fill="url(#goldMetallic)"
            filter="url(#softShadow)"
          />
        </g>
      </g>

      {/* Brand Typography */}
      {/* "AL-HINDWAN" */}
      <text
        x="200"
        y="138"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', 'Cinzel', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="34"
        letterSpacing="2.5"
        fill="url(#goldMetallic)"
        style={{ textTransform: 'uppercase' }}
      >
        AL-HINDWAN
      </text>

      {/* "TOURS & TRAVELS" */}
      <text
        x="200"
        y="166"
        textAnchor="middle"
        fontFamily="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif"
        fontWeight="700"
        fontSize="17"
        letterSpacing="4.5"
        fill="url(#goldMetallic)"
        style={{ textTransform: 'uppercase' }}
      >
        TOURS & TRAVELS
      </text>
    </svg>
  );
};
