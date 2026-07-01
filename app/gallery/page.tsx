import type { Metadata } from "next";
import Lightbox, { type GalleryImage } from "@/components/Lightbox";
import "./gallery.css";

export const metadata: Metadata = {
  title: "Gallery",
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/gallery/1.jpeg",
    alt: "Café Jiménez gallery image 1",
    caption: "Café Jiménez",
  },
  {
    src: "/gallery/2.jpeg",
    alt: "Café Jiménez gallery image 2",
    caption: "Café Jiménez",
  },
  {
    src: "/gallery/3.jpeg",
    alt: "Café Jiménez gallery image 3",
    caption: "Café Jiménez",
  },
  {
    src: "/gallery/4.jpeg",
    alt: "Café Jiménez gallery image 4",
    caption: "Café Jiménez",
  },
  {
    src: "/gallery/5.jpeg",
    alt: "Café Jiménez gallery image 5",
    caption: "Café Jiménez",
  },
];

export default function GalleryPage() {
  return (
    <main className="subpage">
      <section id="gallery" className="section gallery-section">
        <div className="section-container">
          <header className="section-header">
            <span className="section-badge">Our Journey</span>
            <h2>Gallery</h2>
            <p>Take a virtual tour through our coffee farm, harvest process, and final roast.</p>
          </header>

          <Lightbox images={GALLERY_IMAGES} />
        </div>
      </section>
    </main>
  );
}
