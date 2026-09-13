'use client';

import { useEffect, useRef } from 'react';

/** Punto decorativo con seguimiento amortiguado, independiente del framerate. */
export function CursorFollower() {
  const dotRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    if (!dot) return;

    const media = window.matchMedia(
      '(min-width: 768px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',
    );
    let frame = 0;
    let visible = false;
    let previousTime = 0;
    let x = 0;
    let y = 0;
    let targetX = 0;
    let targetY = 0;

    const paint = () => {
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const hide = () => {
      visible = false;
      dot.style.opacity = '0';
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const animate = (time: number) => {
      const elapsed = Math.min(time - previousTime, 64);
      previousTime = time;
      const progress = 1 - Math.exp(-elapsed / 150);
      x += (targetX - x) * progress;
      y += (targetY - y) * progress;

      if (Math.hypot(targetX - x, targetY - y) < 0.1) {
        x = targetX;
        y = targetY;
        frame = 0;
      } else {
        frame = requestAnimationFrame(animate);
      }
      paint();
    };

    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== 'mouse') {
        hide();
        return;
      }
      targetX = event.clientX;
      targetY = event.clientY;

      // Aparece donde entra el mouse, sin viajar desde una esquina.
      if (!visible) {
        x = targetX;
        y = targetY;
        paint();
        visible = true;
        dot.style.opacity = '1';
      }
      if (!frame) {
        previousTime = performance.now();
        frame = requestAnimationFrame(animate);
      }
    };

    const leave = (event: PointerEvent) => {
      if (!event.relatedTarget) hide();
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerout', leave);
    window.addEventListener('blur', hide);
    document.addEventListener('visibilitychange', hide);
    media.addEventListener('change', hide);

    return () => {
      hide();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerout', leave);
      window.removeEventListener('blur', hide);
      document.removeEventListener('visibilitychange', hide);
      media.removeEventListener('change', hide);
    };
  }, []);

  return <span ref={dotRef} className="cursor-follower" aria-hidden="true" />;
}
