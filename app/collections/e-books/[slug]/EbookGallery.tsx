"use client";

import { useState } from "react";

type Props = { title: string; images: string[] };

export default function EbookGallery({ title, images }: Props) {
  const [active, setActive] = useState(0);
  const main = images[active] || images[0];
  return (
    <div>
      <div className="aspect-[4/5] bg-gradient-to-br from-[#EFEAE2] via-[#F4EFE6] to-[#E8DFCF] rounded-[6px] flex items-center justify-center p-8 sm:p-10 md:p-14 shadow-[0_24px_60px_rgba(27,36,48,0.10)]">
        {main && (
          <img
            src={main}
            alt={title}
            className="max-h-full max-w-full object-contain drop-shadow-[0_24px_40px_rgba(27,36,48,0.22)] transition-opacity duration-300"
          />
        )}
      </div>
      {images.length > 1 && (
        <div className="mt-3 sm:mt-4 grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
          {images.slice(0, 5).map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Image ${i + 1}`}
              aria-pressed={i === active}
              className={`aspect-square bg-[#EFEAE2] rounded-[3px] overflow-hidden flex items-center justify-center p-1.5 transition-all ${
                i === active
                  ? "ring-2 ring-forest"
                  : "ring-1 ring-ink/10 opacity-80 hover:opacity-100"
              }`}
            >
              <img
                src={src}
                alt=""
                className="max-h-full max-w-full object-contain"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
