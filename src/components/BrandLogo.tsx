interface BrandLogoProps {
  variant?: "light" | "dark";
  className?: string;
  showTagline?: boolean;
  size?: "sm" | "md" | "lg";
}

export function BrandLogo({ 
  variant = "dark", 
  className = "", 
  showTagline = true,
  size = "md" 
}: BrandLogoProps) {
  const isLight = variant === "light";

  // Size configurations
  const dimensions = {
    sm: { icon: "w-9 h-9", title: "text-base sm:text-lg", sub: "text-[9px] sm:text-[10px]" },
    md: { icon: "w-11 h-11 sm:w-12 sm:h-12", title: "text-lg sm:text-xl", sub: "text-[10px] sm:text-[11.5px]" },
    lg: { icon: "w-14 h-14 sm:w-16 sm:h-16", title: "text-2xl sm:text-3xl", sub: "text-xs sm:text-sm" },
  }[size];

  return (
    <div className={`flex items-center gap-2.5 sm:gap-3 select-none group cursor-pointer ${className}`}>
      {/* Official Circular Emblem with Palm, Airplane, Sun, Ship & Waves */}
      <div className={`relative ${dimensions.icon} flex-shrink-0 transition-transform duration-200 group-hover:scale-105`}>
        <svg 
          viewBox="0 0 520 520" 
          className="w-full h-full drop-shadow-sm" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle circular disc base */}
          <circle 
            cx="260" 
            cy="260" 
            r="246" 
            fill={isLight ? "rgba(255,255,255,0.06)" : "#FFFFFF"} 
            stroke={isLight ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.06)"} 
            strokeWidth="2" 
          />

          {/* 1. GREEN PALM TREE & CIRCULAR ENCLOSURE */}
          {/* Palm Fronds radiating from top of trunk */}
          <g id="palm-fronds" fill={isLight ? "#34D399" : "#23773B"}>
            <path d="M120 180 C95 150 60 120 40 135 C30 142 55 160 85 175 C100 182 115 182 120 180 Z" />
            <path d="M120 180 C80 170 30 165 15 185 C8 195 40 200 80 195 C100 192 115 186 120 180 Z" />
            <path d="M120 180 C85 200 35 220 20 240 C12 250 45 240 85 215 C105 202 116 188 120 180 Z" />
            <path d="M120 180 C110 135 105 85 125 70 C135 62 140 100 132 140 C128 160 124 175 120 180 Z" />
            <path d="M120 180 C135 140 165 95 190 105 C202 110 185 135 155 160 C138 172 126 178 120 180 Z" />
            <path d="M120 180 C150 165 205 150 225 170 C232 178 200 190 160 190 C138 190 125 184 120 180 Z" />
            <path d="M120 180 C145 195 195 215 205 235 C208 244 185 240 150 215 C132 202 123 188 120 180 Z" />
            <path d="M120 180 C95 220 60 255 45 270 C38 275 60 260 90 230 C108 212 118 192 120 180 Z" />
          </g>

          {/* Palm Trunk sweeping into the lower and right circular arc */}
          <path 
            d="M124 180 C105 240 92 310 98 375 C105 440 150 495 220 515 C295 535 375 505 425 450 C470 400 485 320 460 250 C435 180 375 130 320 125 C310 124 315 132 325 135 C370 145 422 188 445 245 C468 305 452 380 410 425 C368 472 298 498 232 482 C168 466 128 418 122 360 C116 305 125 245 138 180 Z" 
            fill={isLight ? "#34D399" : "#23773B"} 
          />

          {/* 2. AIRPLANE AT THE TOP (Flying top-left) */}
          <g transform="translate(285, 110) rotate(-22)" fill={isLight ? "#FDE68A" : "#422116"}>
            <path d="M-40 0 C-30 -4 20 -4 40 -1 C45 0 45 2 40 3 C20 4 -30 4 -40 0 Z" />
            <path d="M-5 -2 L-20 -28 C-22 -32 -18 -32 -14 -30 L10 -2 Z" />
            <path d="M-5 2 L-20 28 C-22 32 -18 32 -14 30 L10 2 Z" />
            <path d="M-30 -1 L-44 -12 C-46 -14 -44 -15 -42 -14 L-32 0 Z" />
            <path d="M-32 0 L-42 12 C-44 14 -46 13 -44 11 L-30 1 Z" />
          </g>

          {/* 3. TERRACOTTA SUN */}
          <circle cx="320" cy="210" r="23" fill={isLight ? "#F59E0B" : "#BA6B41"} />

          {/* 4. CRUISE SHIP / CATAMARAN */}
          <g fill={isLight ? "#F8FAFC" : "#422116"}>
            <path d="M255 272 C275 260 305 255 330 262 C334 263 325 275 315 276 C295 277 270 278 255 272 Z" />
            <path d="M235 298 C265 278 315 272 350 285 C355 287 342 300 325 301 C295 303 260 304 235 298 Z" />
            <path d="M205 332 C250 300 340 295 390 318 C400 322 375 358 350 365 C300 378 230 365 205 332 Z" />
          </g>

          {/* 5. OCEAN WAVE SWOOSHES */}
          <path 
            d="M165 370 C200 435 295 440 375 395 C382 391 365 405 340 412 C275 428 200 420 165 370 Z" 
            fill={isLight ? "#FBBF24" : "#BA7E52"} 
          />
          <path 
            d="M85 410 C120 465 230 500 355 460 C368 456 345 470 315 478 C215 498 120 475 85 410 Z" 
            fill={isLight ? "#38BDF8" : "#422116"} 
          />
        </svg>
      </div>

      {/* Official Typography: Andaman Dream Yatra & Travel Made Simple */}
      <div className="flex flex-col justify-center whitespace-nowrap flex-shrink-0">
        <div 
          style={{ fontFamily: "'Calistoga', 'Playfair Display', serif" }}
          className={`tracking-normal leading-none ${dimensions.title} ${
            isLight ? "text-white" : "text-[#422116]"
          }`}
        >
          <span>Andaman Dream Yatra</span>
        </div>

        {showTagline && (
          <div 
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            className={`font-bold tracking-wider leading-tight mt-1 ${dimensions.sub} ${
              isLight ? "text-emerald-400" : "text-[#23773B]"
            }`}
          >
            Travel Made Simple
          </div>
        )}
      </div>
    </div>
  );
}
