import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

type QRCodeOverlayProps = {
  data: string;
  size: number;
  className?: string;
};

export default function QRCodeOverlay({ data, size, className }: QRCodeOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }

    const qrCode = new QRCodeStyling({
      width: size,
      height: size,
      type: "svg",
      data,
      dotsOptions: {
        type: "rounded",
        color: "#000000",
      },
      cornersSquareOptions: {
        type: "extra-rounded",
        color: "#000000",
      },
      cornersDotOptions: {
        type: "dot",
        color: "#000000",
      },
      backgroundOptions: {
        color: "transparent",
      },
    });

    containerRef.current.innerHTML = "";
    qrCode.append(containerRef.current);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [data, size]);

  return <div ref={containerRef} className={className} />;
}
