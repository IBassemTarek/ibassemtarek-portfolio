import { useReducedMotion } from "framer-motion";
import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// A muted, inline, looping clip that only plays while it is on screen, so the
// page never decodes several videos at once. With reduced motion it stays on
// its poster. `sources` is a list of { src, type }, best format first.
const LoopVideo = forwardRef(function LoopVideo(
  { sources, poster, className = "", label, preload = "none", muted = true },
  forwardedRef
) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  useImperativeHandle(forwardedRef, () => ref.current);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Autoplay can still be refused (data saver, low power); the poster
          // stays up in that case.
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, [reduce]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      preload={preload}
      muted={muted}
      loop
      playsInline
      aria-label={label}
    >
      {sources.map(({ src, type }) => (
        <source key={src} src={src} type={type} />
      ))}
    </video>
  );
});

export default LoopVideo;

export function videoSources(base, { webm = true } = {}) {
  return [
    ...(webm ? [{ src: `${base}.webm`, type: "video/webm" }] : []),
    { src: `${base}.mp4`, type: "video/mp4" },
  ];
}
