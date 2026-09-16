"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Props = {
  src: string;
  poster: string;
  alt: string;
  sizes: string;
  className?: string;
  playbackRate?: number;
};

/** Keep a real image visible until a nearby, visible video starts playing. */
export function ProjectVideo({ src, poster, alt, sizes, className = "", playbackRate = 1 }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !("IntersectionObserver" in window)) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let nearby = false;
    let visible = false;
    let failed = false;
    let disposed = false;

    const canPlay = () => visible && !document.hidden && !motion.matches && !failed && !disposed;
    const showImage = () => { video.style.opacity = "0"; };
    const sync = () => {
      if (nearby && !document.hidden && !motion.matches && !failed && !video.hasAttribute("src")) {
        video.src = src;
        video.preload = "metadata";
        video.load();
      }
      if (canPlay() && video.hasAttribute("src")) {
        video.playbackRate = playbackRate;
        void video.play().catch(() => {
          // Interrupted play requests and autoplay restrictions retain the image.
          if (video.paused) showImage();
        });
      } else {
        video.pause();
        if (motion.matches) showImage();
      }
    };
    const onPlaying = () => {
      if (canPlay()) video.style.opacity = "1";
      else video.pause();
    };
    const onError = () => {
      failed = true;
      video.pause();
      showImage();
    };
    const loadObserver = new IntersectionObserver(([entry]) => {
      nearby = entry.isIntersecting;
      sync();
    }, { rootMargin: "200px 0px" });
    const playObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
      sync();
    }, { threshold: [0, 0.1] });

    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    loadObserver.observe(video);
    playObserver.observe(video);

    return () => {
      disposed = true;
      loadObserver.disconnect();
      playObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      video.pause();
      video.removeAttribute("src");
      video.load();
      showImage();
    };
  }, [src, playbackRate]);

  return (
    <>
      <Image src={poster} alt={alt} fill sizes={sizes} className={`object-cover ${className}`} />
      <video
        ref={videoRef}
        aria-hidden="true"
        muted
        loop
        playsInline
        preload="none"
        poster={poster}
        className={`absolute inset-0 size-full object-cover ${className}`}
        style={{ opacity: 0 }}
      />
    </>
  );
}
