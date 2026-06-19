"use client";

import { useState } from "react";
import Image from "next/image";

export default function YoutubeFacade({
  videoId,
  title,
  thumbnailAlt,
}: {
  videoId: string;
  title: string;
  thumbnailAlt: string;
}) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="video-wrapper">
      <div
        className="video-facade"
        tabIndex={0}
        role="button"
        aria-label={`Play video: ${title}`}
        onClick={() => setLoaded(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLoaded(true);
          }
        }}
      >
        <Image
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
          alt={thumbnailAlt}
          fill
          className="video-thumbnail"
        />
        <span className="play-btn" aria-hidden="true">
          <i className="fa-solid fa-play" />
        </span>
      </div>
    </div>
  );
}
