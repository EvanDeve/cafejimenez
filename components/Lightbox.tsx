"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type GalleryImage = {
  src: string;
  alt: string;
  caption: string;
};

export default function Lightbox({ images }: { images: GalleryImage[] }) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = "hidden";
      closeBtnRef.current?.focus();
    } else {
      document.body.style.overflow = "";
    }
  }, [currentIndex]);

  function show(index: number) {
    setCurrentIndex(((index % images.length) + images.length) % images.length);
  }

  function close() {
    const openedIndex = currentIndex;
    setCurrentIndex(null);
    if (openedIndex !== null) {
      itemRefs.current[openedIndex]?.focus();
    }
  }

  useEffect(() => {
    if (currentIndex === null) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        close();
      } else if (e.key === "ArrowLeft") {
        show((currentIndex! - 1 + images.length) % images.length);
      } else if (e.key === "ArrowRight") {
        show((currentIndex! + 1) % images.length);
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, images.length]);

  const current = currentIndex !== null ? images[currentIndex] : null;

  return (
    <>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={image.src + index}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="gallery-item"
            tabIndex={0}
            aria-label={image.caption}
            onClick={() => show(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                show(index);
              }
            }}
          >
            <Image src={image.src} alt={image.alt} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
            <div className="gallery-hover">
              <span>{image.caption}</span>
            </div>
          </div>
        ))}
      </div>

      <div
        id="lightbox"
        className={`lightbox ${current ? "open" : ""}`}
        aria-hidden={!current}
        role="dialog"
        aria-label="Image viewer"
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        <button ref={closeBtnRef} className="lightbox-close" aria-label="Close image viewer" onClick={close}>
          <i className="fa-solid fa-xmark" />
        </button>
        <button
          className="lightbox-prev"
          aria-label="Previous image"
          onClick={() => currentIndex !== null && show(currentIndex - 1)}
        >
          <i className="fa-solid fa-chevron-left" />
        </button>
        <button
          className="lightbox-next"
          aria-label="Next image"
          onClick={() => currentIndex !== null && show(currentIndex + 1)}
        >
          <i className="fa-solid fa-chevron-right" />
        </button>
        <div className="lightbox-content">
          {/* plain <img>: object-fit: contain with no fixed box needs the browser's natural
              intrinsic-aspect-ratio scaling that next/image's `fill` mode doesn't provide */}
          {current && <img src={current.src} alt={current.alt} className="lightbox-image" />}
          <p className="lightbox-caption">{current?.caption}</p>
        </div>
      </div>
    </>
  );
}
