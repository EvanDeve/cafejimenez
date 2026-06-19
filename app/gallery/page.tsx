import type { Metadata } from "next";
import Lightbox, { type GalleryImage } from "@/components/Lightbox";
import "./gallery.css";

export const metadata: Metadata = {
  title: "Gallery",
};

const GALLERY_IMAGES: GalleryImage[] = [
  {
    src: "/gallery-mountains.png",
    alt: "Beautiful coffee plantation highlands in Costa Rica's Tarrazú region",
    caption: "Highlands of Tarrazú",
  },
  {
    src: "/gallery-roasting.png",
    alt: "Artisan coffee roasting process focusing on whole beans",
    caption: "Artisan Roasting",
  },
  {
    src: "/gallery-barista.png",
    alt: "Barista pulling a fresh double shot of espresso with rich golden crema",
    caption: "Perfect Extraction",
  },
  {
    src: "/hero.png",
    alt: "A freshly sealed bag of Café Jiménez Single Origin on a rustic wooden table",
    caption: "Ready Package",
  },
  {
    src: "/product-tarrazu.png",
    alt: "Freshly roasted whole coffee beans scattered on a table",
    caption: "Premium Beans",
  },
  {
    src: "/gallery-barista.png",
    alt: "Barista pouring steamed milk to make latte art in a coffee cup",
    caption: "Latte Art Ritual",
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
