import React from "react";

export default function Marquee({
  children,
  speed = 12,          // seconds (smaller = faster)
  pauseOnHover = true,
}) {
  return (
    <div
      style={{
        overflow: "hidden",
        whiteSpace: "nowrap",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "inline-block",
          paddingLeft: "100%",
          animation: `marquee ${speed}s linear infinite`,
          ...(pauseOnHover
            ? { willChange: "transform" }
            : {}),
        }}
        className={pauseOnHover ? "marquee-inner" : ""}
      >
        {children}
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
        .marquee-inner:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
