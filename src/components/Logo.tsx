import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'gold' | 'white' | 'dark';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'gold',
  showText = true,
}) => {
  const sizeMap = {
    sm: { w: 38, h: 38, icon: 28 },
    md: { w: 52, h: 52, icon: 40 },
    lg: { w: 84, h: 84, icon: 68 },
    xl: { w: 140, h: 140, icon: 110 },
  };

  const primaryColor = variant === 'gold' ? '#c5a059' : variant === 'white' ? '#ffffff' : '#11131a';
  const secondaryColor = variant === 'gold' ? '#e6c687' : variant === 'white' ? '#e4e4e7' : '#27272a';

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Men's World Barber & Shears Emblem */}
      <svg
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 transition-transform duration-300 group-hover:scale-105`}
        style={{ width: sizeMap[size].w, height: sizeMap[size].h }}
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f3e0aa" />
            <stop offset="50%" stopColor="#c5a059" />
            <stop offset="100%" stopColor="#8d6e2e" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#c5a059" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Outer subtle circular crest ring */}
        <circle
          cx="200"
          cy="200"
          r="192"
          stroke={variant === 'gold' ? 'url(#goldGrad)' : primaryColor}
          strokeWidth="6"
          opacity="0.85"
        />
        <circle
          cx="200"
          cy="200"
          r="184"
          stroke={variant === 'gold' ? 'url(#goldGrad)' : primaryColor}
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.6"
        />

        {/* --- Barber Silhouette & Tools --- */}
        <g fill={variant === 'gold' ? 'url(#goldGrad)' : primaryColor} filter="url(#glow)">
          {/* Pompadour Hair */}
          <path d="M195 55 C160 55 135 75 140 105 C145 115 150 118 152 125 C145 130 142 142 145 152 C150 156 156 150 158 140 C162 148 170 145 174 136 C180 120 185 105 198 100 C215 95 230 102 245 110 C250 115 255 125 258 135 C262 140 268 142 270 135 C272 120 270 105 260 90 C245 68 225 55 195 55 Z" />

          {/* Head & Ear */}
          <path d="M158 138 C150 148 150 162 155 172 C160 178 165 175 168 168 C168 160 168 150 165 142 Z" />
          <path d="M170 130 C175 140 185 155 198 155 C215 155 228 142 232 130 C220 125 200 122 170 130 Z" opacity="0.3" />

          {/* Eyes & Brow detailing */}
          <ellipse cx="188" cy="140" rx="4" ry="2.5" />
          <ellipse cx="225" cy="140" rx="4" ry="2.5" />
          <path d="M182 133 C186 130 195 131 198 134" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />
          <path d="M218 134 C222 131 230 130 234 133" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />

          {/* Full Groomed Beard & Mustache */}
          <path d="M178 160 C188 158 198 165 208 165 C218 165 228 158 238 160 C245 170 248 185 240 205 C230 225 215 235 208 235 C200 235 185 225 176 205 C168 185 172 170 178 160 Z" />

          {/* Left Hand & Straight Razor (Viewer's Left) */}
          {/* Razor Blade & Scale */}
          <path d="M125 125 L108 170 L118 174 L135 129 Z" />
          <path d="M102 175 L80 205 L88 210 L110 180 Z" opacity="0.8" />
          {/* Right Hand & Upright Barber Scissors (Viewer's Right) */}
          {/* Scissor Blades */}
          <path d="M272 110 L260 185 L268 187 L280 112 Z" />
          <path d="M305 115 L262 188 L270 190 L313 117 Z" />
          {/* Finger rings */}
          <circle cx="265" cy="202" r="7" stroke={primaryColor} strokeWidth="3" fill="none" />
          <circle cx="282" cy="198" r="7" stroke={primaryColor} strokeWidth="3" fill="none" />

          {/* Crossed Arms & Torso */}
          <path d="M135 200 C110 215 90 245 88 280 L312 280 C310 245 290 215 265 200 C245 225 225 240 200 240 C175 240 155 225 135 200 Z" />
          {/* Forearms overlay */}
          <path d="M115 230 C135 238 165 248 200 245 C190 260 170 270 145 268 Z" opacity="0.7" />
          <path d="M285 230 C265 238 235 248 200 245 C210 260 230 270 255 268 Z" opacity="0.7" />
        </g>

        {/* --- Notched Ribbon Banner with MEN'S WORLD --- */}
        <g filter="url(#glow)">
          {/* Ribbon Background with notched banner tails */}
          <path
            d="M45 272 L65 285 L45 298 L55 330 L345 330 L355 298 L335 285 L355 272 Z"
            fill="#090b10"
            stroke={variant === 'gold' ? 'url(#goldGrad)' : primaryColor}
            strokeWidth="3.5"
          />

          {/* Text: MEN'S WORLD */}
          <text
            x="200"
            y="312"
            textAnchor="middle"
            fill={variant === 'gold' ? 'url(#goldGrad)' : '#ffffff'}
            fontFamily="'Cinzel', Georgia, serif"
            fontSize="32"
            fontWeight="900"
            letterSpacing="3"
          >
            MEN'S WORLD
          </text>
        </g>

        {/* Subtitle: SALON & ACADEMY */}
        <text
          x="200"
          y="360"
          textAnchor="middle"
          fill={secondaryColor}
          fontFamily="'Plus Jakarta Sans', sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="4"
        >
          SALON & ACADEMY
        </text>
      </svg>

      {/* Optional Side Typography for Navbar / Headers */}
      {showText && (
        <div className="flex flex-col min-w-0">
          <span className="font-cinzel text-sm sm:text-base md:text-lg font-bold tracking-wider text-white leading-tight whitespace-nowrap">
            MEN'S WORLD
          </span>
          <span className="text-[8px] sm:text-[9px] md:text-[10px] tracking-wider text-[#c5a059] uppercase font-bold leading-tight mt-0.5 whitespace-nowrap">
            SALON & ACADEMY
          </span>
        </div>
      )}
    </div>
  );
};
