"use client";
import Image from 'next/image';
import appleIcon from '@/app/apple-icon.png';

interface LogoProps {
  variant?: 'horizontal' | 'vertical' | 'icon-only';
  className?: string;
  iconSize?: number;
  useImageIcon?: boolean;
}

interface EmblemProps {
  iconSize? : number; 
}


const Emblem = ({iconSize} : EmblemProps) => (
  <svg
    width={iconSize}
    height={iconSize}
    viewBox="0 0 200 200"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
  >
    {/* Outer Circle Ring */}
    <circle
      cx="100"
      cy="110"
      r="62"
      stroke="#004528"
      strokeWidth="10"
      fill="none"
      opacity="0.95"
    />

    {/* Left Spearhead/Trident side */}
    {/* Left Outer Facet (Medium Green) */}
    <path
      d="M 48 35 L 54 95 L 82 150 Z"
      fill="#145C38"
    />
    {/* Left Inner Facet (Light/Emerald Green) */}
    <path
      d="M 48 35 L 82 150 L 73 110 Z"
      fill="#2D8053"
    />

    {/* Right Spearhead/Trident side (Mirrored) */}
    {/* Right Inner Facet (Medium Green) */}
    <path
      d="M 152 35 L 127 110 L 118 150 Z"
      fill="#145C38"
    />
    {/* Right Outer Facet (Dark Forest Green) */}
    <path
      d="M 152 35 L 118 150 L 146 95 Z"
      fill="#0A3F24"
    />

    {/* Middle Spearhead/Trident */}
    {/* Middle Left Facet (Light/Emerald Green) */}
    <path
      d="M 100 12 L 91 105 L 100 142 Z"
      fill="#2D8053"
    />
    {/* Middle Right Facet (Dark Forest Green) */}
    <path
      d="M 100 12 L 100 142 L 109 105 Z"
      fill="#0A3F24"
    />

    {/* Bottom Central Diamond */}
    {/* Left Facet (Light Green) */}
    <path
      d="M 100 154 L 92 171 L 100 188 Z"
      fill="#2D8053"
    />
    {/* Right Facet (Dark Green) */}
    <path
      d="M 100 154 L 100 188 L 108 171 Z"
      fill="#0A3F24"
    />
  </svg>
);


export default function Logo({ variant = 'horizontal', className = '', iconSize = 48, useImageIcon = false }: LogoProps) {
  // SVG emblem of the logo, or the apple-icon.png artwork when useImageIcon is set

  const icon = useImageIcon ? (
    <Image
      src={appleIcon}
      alt="Logo Yayasan Putra Prabu Indonesia Raya"
      width={iconSize}
      height={iconSize}
      className="shrink-0 transition-transform duration-300 group-hover:scale-105"
      priority
    />
  ) : (
    <Emblem iconSize={iconSize}/>
  );

  if (variant === 'icon-only') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {icon}
      </div>
    );
  }

  if (variant === 'vertical') {
    return (
      <div className={`flex flex-col items-center text-center group ${className}`}>
        {icon}
        <div className="mt-4">
          <h1 className="font-sans font-bold text-primary tracking-wide leading-tight text-lg md:text-xl">
            YAYASAN PUTRA PRABU
          </h1>
          <p className="font-sans font-semibold text-secondary tracking-[0.25em] text-[11px] md:text-xs uppercase mt-1">
            INDONESIA RAYA
          </p>
        </div>
      </div>
    );
  }

  // Default: Horizontal layout
  return (
    <div className={`flex items-center gap-3.5 group cursor-pointer ${className}`}>
      {icon}
      <div className="flex flex-col justify-center">
        <h1 className="font-sans font-extrabold text-primary tracking-wide leading-none text-sm md:text-base">
          YAYASAN PUTRA PRABU
        </h1>
        <p className="font-sans font-bold text-secondary tracking-[0.2em] text-[10px] md:text-[11px] uppercase mt-1 leading-none">
          INDONESIA RAYA
        </p>
      </div>
    </div>
  );
}
