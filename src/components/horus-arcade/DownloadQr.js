import Image from "next/image";

// The QR points at the canonical subdomain download URL. Error level H keeps
// it scannable beneath the centred app icon; the white card is its quiet zone.
export default function DownloadQr({ size = 168, caption = "Scan to download" }) {
  return (
    <figure className="ha-qr m-0 flex flex-col items-center">
      <div className="ha-qr-frame rounded-[1.6rem] p-[3px]">
        <div className="relative rounded-[1.45rem] bg-white p-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/horus-arcade/download-qr.svg"
            alt="QR code that opens Horus Arcade on the App Store or Google Play"
            width={size}
            height={size}
            className="block"
          />
          <Image
            src="/images/horus-arcade/icon-512.png"
            alt="Horus Arcade app icon"
            width={512}
            height={512}
            sizes="48px"
            className="absolute left-1/2 top-1/2 h-[19%] w-[19%] -translate-x-1/2 -translate-y-1/2 rounded-[22%] ring-[3px] ring-white"
          />
        </div>
      </div>
      <figcaption className="mt-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[color:var(--ha-muted)]">
        {caption}
      </figcaption>
      <style jsx>{`
        .ha-qr-frame {
          background: linear-gradient(135deg, #f5c04a, #ff3ec8 50%, #29e6ff);
          box-shadow: 0 0 36px rgba(255, 62, 200, 0.35), 0 0 70px rgba(41, 230, 255, 0.18);
        }
      `}</style>
    </figure>
  );
}
