'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

const ACCENT = '#39d353';
const PALETTE = ['#1a1d1b', '#0e4429', '#00722f', '#26a641', ACCENT];
const BAYER = [[0, 8, 2, 10], [12, 4, 14, 6], [3, 11, 1, 9], [15, 7, 13, 5]];
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const TOTAL_WEEKS = 53;
const ANNUAL_CONTRIBUTIONS = 700;

type Cell = { week: number; day: number; level: number };

function createRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 1664525 + 1013904223) % 4294967296;
    return value / 4294967296;
  };
}

function buildData(): Cell[] {
  const random = createRandom(20260911);
  const cells: Cell[] = [];
  for (let week = 0; week < TOTAL_WEEKS; week += 1) {
    const season = 0.22 + 0.78 * Math.sin((week / TOTAL_WEEKS) * Math.PI * 0.95);
    for (let day = 0; day < 7; day += 1) {
      const probability = season * (day === 0 || day === 6 ? 0.45 : 1);
      const sample = random();
      let level = 0;
      if (sample < probability * 0.82) level = 1;
      if (sample < probability * 0.6) level = 2;
      if (sample < probability * 0.34) level = 3;
      if (sample < probability * 0.14) level = 4;
      cells.push({ week, day, level });
    }
  }
  return cells;
}

function windowLabel(weeks: number) {
  return weeks >= 50 ? 'ENE — DIC 2026' : `ÚLTIMAS ${weeks} SEMANAS`;
}

export function CommitCalendar() {
  const blockRef = useRef<HTMLDivElement>(null);
  const cellRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [weeks, setWeeks] = useState(14);
  const data = useMemo(() => buildData(), []);
  const visible = useMemo(() => data.filter((cell) => cell.week >= TOTAL_WEEKS - weeks), [data, weeks]);
  const label = windowLabel(weeks);

  useEffect(() => {
    const block = blockRef.current;
    if (!block) return;
    const measure = () => {
      const nextWeeks = Math.max(14, Math.min(TOTAL_WEEKS, Math.floor((block.clientWidth - 46) / 26)));
      setWeeks((current) => (current === nextWeeks ? current : nextWeeks));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(block);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrame = 0;
    const startedAt = performance.now();
    const paint = (elapsed: number) => {
      const time = elapsed * 0.55;
      for (let index = 0; index < visible.length; index += 1) {
        const element = cellRefs.current[index];
        if (!element) continue;
        const cell = visible[index];
        const x = cell.week * 0.42;
        const y = cell.day * 0.72;
        const field = 0.5 + 0.5 * Math.sin(x - time * 2.1 + Math.sin(y + time * 0.9) * 1.4 + Math.sin(x * 0.23 - time) * 1.1);
        const value = (cell.level / 4) * 0.62 + field * 0.5 - 0.06;
        const threshold = (BAYER[cell.day & 3][cell.week & 3] / 16 - 0.5) * 0.9;
        let level = Math.floor(value * 4.6 + threshold);
        level = Math.max(0, Math.min(4, level));
        if (cell.level === 0 && level > 2) level = 2;
        if (element.dataset.level !== String(level)) {
          element.dataset.level = String(level);
          element.style.backgroundColor = PALETTE[level];
        }
      }
    };
    if (prefersReducedMotion) {
      paint(0);
      return;
    }
    const loop = (now: number) => {
      paint((now - startedAt) / 1000);
      animationFrame = requestAnimationFrame(loop);
    };
    animationFrame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationFrame);
  }, [visible]);

  const monthLabels = useMemo(() => {
    const short = weeks < 30;
    const minimumSpacing = short ? 2 : 4;
    const start = TOTAL_WEEKS - weeks;
    const labels: Array<{ name: string; column: number; span: number }> = [];
    let lastColumn = -99;
    MONTHS.forEach((name, index) => {
      const column = Math.round(index * (TOTAL_WEEKS / 12)) - start + 1;
      if (column < 1 || column > weeks - 1 || column - lastColumn < minimumSpacing) return;
      lastColumn = column;
      labels.push({ name: short ? `${name[0]}${name[1].toLowerCase()}` : name, column, span: Math.min(minimumSpacing + 2, weeks - column + 1) });
    });
    return labels;
  }, [weeks]);

  return (
    <div className="relative flex min-h-[320px] w-full max-w-[460px] flex-col overflow-hidden rounded-[22px] bg-[#0c0c0c] px-7 pb-[30px] pt-[34px] text-[#f2f1ee] shadow-[0_24px_60px_rgba(20,20,20,0.16)] [container-type:inline-size] [aspect-ratio:1/1.05]">
      <div aria-hidden className="pointer-events-none absolute inset-0 w-2/5 animate-[commit-sweep_9s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(57,211,83,0.05)_45%,rgba(57,211,83,0.08)_50%,transparent)]" />
      <div className="relative flex min-h-0 flex-1 flex-col gap-5 font-mono max-[520px]:gap-2">
        <div className="flex shrink-0 items-baseline justify-between gap-3 text-[clamp(9px,3.1cqw,12.5px)] uppercase tracking-[0.2em] text-[#6e6e6e]"><span>commits / github</span><span className="text-right text-[#9a9a9a]">{label}</span></div>
        <div className="h-px shrink-0 bg-[#232323]" />
        <div className="flex shrink-0 items-end justify-between gap-4 pt-1.5"><div aria-label={`${ANNUAL_CONTRIBUTIONS} contribuciones en 2026`} className="font-sans text-[clamp(48px,9cqw,104px)] font-black leading-[0.85] tracking-[-0.03em]">+{ANNUAL_CONTRIBUTIONS}</div><div className="text-right text-[clamp(8px,2.8cqw,11.5px)] leading-[1.7] tracking-[0.18em] text-[#6e6e6e]">CONTRIBUCIONES<br />EN 2026</div></div>
        <div className="flex min-h-0 flex-1 flex-col justify-center py-1.5">
          <div ref={blockRef} className="flex flex-col gap-2">
            {monthLabels.length >= 2 && <div className="grid pl-[46px] text-[11px] tracking-[0.12em] text-[#5d5d5d]" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`, gap: 'clamp(3px, 0.5vw, 6px)' }}>{monthLabels.map((month) => <span key={month.name} className="whitespace-nowrap" style={{ gridColumn: `${month.column} / span ${month.span}` }}>{month.name}</span>)}</div>}
            <div className="flex items-stretch gap-3">
              <div className="grid w-[34px] shrink-0 grid-rows-7 text-[10px] tracking-[0.1em] text-[#5d5d5d]" style={{ gap: 'clamp(3px, 0.5vw, 6px)' }}><span /><span className="leading-none">MON</span><span /><span className="leading-none">WED</span><span /><span className="leading-none">FRI</span><span /></div>
              <div className="min-w-0 flex-1"><div className="grid grid-rows-7" style={{ gridTemplateColumns: `repeat(${weeks}, minmax(0, 1fr))`, gridAutoFlow: 'column', gap: 'clamp(3px, 0.5vw, 6px)' }}>{visible.map((cell, index) => <div key={`${cell.week}-${cell.day}`} ref={(element) => { cellRefs.current[index] = element; }} className="aspect-square rounded-[2px] transition-colors duration-[90ms]" style={{ backgroundColor: PALETTE[cell.level] }} />)}</div></div>
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center justify-end gap-2.5 text-[10.5px] tracking-[0.16em] text-[#5d5d5d]"><span>MENOS</span><span className="flex gap-1" aria-label="Escala de actividad">{PALETTE.map((color) => <span key={color} aria-hidden className="size-[11px] rounded-[2px]" style={{ backgroundColor: color }} />)}</span><span>MÁS</span></div>
        <div className="h-px shrink-0 bg-[#232323]" />
        <div className="flex shrink-0 items-center justify-end gap-2 text-[clamp(9px,3.1cqw,12.5px)] tracking-[0.2em] text-[#39d353]"><span aria-hidden className="size-[7px] animate-[commit-blink_2.4s_ease-in-out_infinite] rounded-full bg-[#39d353]" /><span>LIVE</span></div>
      </div>
    </div>
  );
}
