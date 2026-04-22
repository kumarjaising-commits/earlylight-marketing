import React from 'react';

interface PrimaryCTAProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  className?: string;
}

export default function PrimaryCTA({ children, onClick, href, className = '' }: PrimaryCTAProps) {
  const baseStyles = `
    inline-block
    px-8 py-3.5
    font-semibold
    text-white
    bg-gradient-to-r from-brand-yellow via-brand-cyan to-brand-purple
    rounded-full
    transition-all
    duration-300
    shadow-[0_0_20px_rgba(6,182,212,0.4)]
    hover:shadow-[0_0_30px_rgba(6,182,212,0.6)]
    hover:-translate-y-0.5
    cursor-pointer
    text-center
    ${className}
  `;

  if (href) {
    return <a href={href} className={baseStyles}>{children}</a>;
  }

  return (
    <button onClick={onClick} className={baseStyles} type="button">
      {children}
    </button>
  );
}
