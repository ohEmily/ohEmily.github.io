import { useEffect, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

type QRCodeOverlayProps = {
  data: string;
  size: number;
  className?: string;
};

export default function QRCodeOverlay({ data, size, className }: QRCodeOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (!qrRef.current) {
      qrRef.current = new QRCodeStyling({
        width: size,
        height: size,
        type: "svg",
        data,
        margin: 12,
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
          color: "rgba(255, 255, 255, 0)",
        },
      });
      qrRef.current.append(containerRef.current);
    } else {
      qrRef.current.update({ data, width: size, height: size });
    }
  }, [data, size]);

  useEffect(() => {
    const node = containerRef.current;
    return () => {
      if (node) {
        while (node.firstChild) {
          node.removeChild(node.firstChild);
        }
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
}
