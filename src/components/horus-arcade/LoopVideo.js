import { useReducedMotion } from "framer-motion";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

// A muted, inline, looping clip.
// - `eager` clips sit above the fold: their sources and the autoplay
//   attribute are in the server HTML, so the browser starts them while the
//   page is still hydrating.
// - Every other clip attaches its sources only when it comes within a screen
//   of the viewport, so the first load only fetches posters.
// Clips pause off screen, stay on their poster with reduced motion, and report
// a refused play() (iOS Low Power Mode, data saver) through `onBlocked`.
// `sources` is a list of { src, type, media }, the first match wins.
const LoopVideo = forwardRef(function LoopVideo(
  { sources, poster, className = "", label, eager = false, onBlocked },
  forwardedRef
) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const [attached, setAttached] = useState(eager);
  const [visible, setVisible] = useState(false);
  useImperativeHandle(forwardedRef, () => ref.current);

  useEffect(() => {
    const video = ref.current;
    if (!video) {
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAttached(true);
        }
        setVisible(entry.isIntersecting);
      },
      { rootMargin: "100% 0px" }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video || !attached) {
      return;
    }
    if (reduce || !visible) {
      video.pause();
      return;
    }
    // React only sets `muted` as a DOM property on client renders; set it
    // again so autoplay policies always see a muted clip.
    if (!video.dataset.unmuted) {
      video.muted = true;
    }
    video.play().catch((error) => {
      if (error?.name === "NotAllowedError") {
        onBlocked?.();
      }
    });
  }, [attached, visible, reduce, onBlocked]);

  return (
    <video
      ref={ref}
      className={className}
      poster={poster}
      preload={eager ? "auto" : "none"}
      autoPlay={eager}
      muted
      loop
      playsInline
      aria-label={label}
    >
      {attached &&
        sources.map(({ src, type = "video/mp4", media }) => (
          <source key={src} src={src} type={type} media={media} />
        ))}
    </video>
  );
});

export default LoopVideo;

export function videoSource(base) {
  return [{ src: `${base}.mp4` }];
}
