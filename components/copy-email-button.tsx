'use client';

import { useState, type CSSProperties } from 'react';
import { EMAIL } from '@/content/site';

type Props = {
  className?: string;
  compact?: boolean;
  pill?: boolean;
  style?: CSSProperties;
};

export function CopyEmailButton({ className = '', compact = false, pill = false, style }: Props) {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <button
      type="button"
      aria-label={copied ? 'Correo copiado' : 'Copiar correo'}
      title={copied ? 'Correo copiado' : 'Copiar correo'}
      onClick={copyEmail}
      style={style}
      className={`group inline-flex min-h-11 items-center gap-3 border-0 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${pill ? 'rounded-full bg-[#111111] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.04em] text-white hover:bg-blue hover:text-white md:px-5 md:text-[11px]' : 'bg-transparent hover:text-blue'} ${className}`}
    >
      <span>{copied ? 'CORREO COPIADO' : EMAIL}</span>
      <span key={copied ? 'check' : 'copy'} className="inline-grid size-7 shrink-0 place-items-center animate-[copy-confirm_240ms_ease-out]">
        {copied ? <CheckIcon /> : <CopyIcon compact={compact} />}
      </span>
    </button>
  );
}

function CopyIcon({ compact }: { compact: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={compact ? 'size-[18px]' : 'size-6'} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="8" y="8" width="10" height="10" rx="1.5" />
      <path d="M6 15H5.5A1.5 1.5 0 0 1 4 13.5v-8A1.5 1.5 0 0 1 5.5 4h8A1.5 1.5 0 0 1 15 5.5V6" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}
