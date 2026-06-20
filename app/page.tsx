import Link from "next/link";
import YoutubeFacade from "@/components/YoutubeFacade";
import "./home.css";

const CLIENT_LOGOS = [
  { src: "/logos/grace-community.svg", alt: "Grace Community Church", lines: ["Grace Community", "Church"] },
  { src: "/logos/bridger-mtn.svg", alt: "Bridger Mountain Coffee Co.", lines: ["Bridger Mountain", "Coffee Co."] },
  { src: "/logos/calvary-chapel.svg", alt: "Calvary Chapel Bozeman", lines: ["Calvary Chapel", "Bozeman"] },
  { src: "/logos/corner-roast.svg", alt: "The Corner Roast", lines: ["The Corner", "Roast"] },
  { src: "/logos/montana-provisions.svg", alt: "Montana Provisions", lines: ["Montana", "Provisions"] },
];

const TESTIMONIALS = [
  {
    quote:
      "This coffee has completely transformed our Sunday morning experience. The aroma fills the whole hall and the taste is unlike anything we've had before. Our congregation absolutely loves it.",
    name: "Pastor David R.",
    role: "Grace Community Church, Montana",
    featured: false,
  },
  {
    quote:
      "We've tried dozens of single-origin coffees. Café Jiménez stands apart — the citrus brightness, the clean finish, the story behind it. This is coffee with a soul. We order two bags every month without fail.",
    name: "Sarah M.",
    role: "Coffee enthusiast & subscriber",
    featured: true,
  },
  {
    quote:
      "We serve Café Jiménez in our office every day. The team noticed immediately — the quality is exceptional and knowing it's Rainforest Alliance certified makes it even better. Proud to support a mission-driven brand.",
    name: "Marcus T.",
    role: "Operations Manager, Montana Provisions",
    featured: false,
  },
];

export default function HomePage() {
  return (
    <>
      {/* HERO SECTION — background via CSS background-image on .hero-bg to avoid filter: blur() bleed */}
      <section className="hero" id="hero">
        <div className="hero-bg" aria-hidden="true" />
        <div className="gradient-overlay" aria-hidden="true" />

        <div className="container">
          <main className="hero-content">
            <h1>Pura Vida Coffee</h1>
            <p>Start your morning with a coffee with a mission!</p>

            <div className="hero-buttons">
              <Link href="/buy" className="btn btn-primary">
                Buy Now
              </Link>
              <a href="#about" className="btn btn-outline">
                Our Story
              </a>
            </div>
          </main>

          <div className="scroll-indicator" aria-hidden="true">
            <span className="mouse">
              <span className="wheel" />
            </span>
          </div>
        </div>
      </section>

      {/* TRUSTED BY — Client Logos */}
      <section className="clients-section" aria-label="Trusted by">
        <p className="clients-label">Trusted by</p>
        <div className="logos-static-row">
          {CLIENT_LOGOS.map((logo) => (
            <div className="logo-item" key={logo.src}>
              {/* plain <img>: tiny vector SVGs styled via CSS filter, no optimization benefit from next/image */}
              <img src={logo.src} alt={logo.alt} />
              <span>
                {logo.lines[0]}
                <br />
                {logo.lines[1]}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ABOUT / MISSION SECTION */}
      <section id="about" className="section about-section">
        <div className="section-container">
          <header className="section-header about-header">
            <span className="section-badge">Coffee with a Mission</span>
            <h2>Our Heritage &amp; Mission</h2>
            <p>
              From the highlands of Costa Rica&apos;s Tarrazú Valley to your cup — every bag carries the legacy of a
              family passionate about exceptional coffee.
            </p>
          </header>

          <div className="about-tags-row-container">
            <div className="about-tags">
              <span className="about-tag">
                <i className="fa-solid fa-mug-hot" /> Artisan Roasting
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-leaf" /> Rainforest Alliance
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-heart" /> Pura Vida
              </span>
              <span className="about-tag">
                <i className="fa-solid fa-mountain" /> 1,200–2,000m Altitude
              </span>
            </div>
          </div>

          <div className="about-main-grid">
            <div className="about-text-block about-text-1">
              <h3>Who We Are</h3>
              <p>
                Coffee is literally in the heritage of the Jiménez family. At the heart of our mission is a desire
                to roast excellent coffee and share hope in everything we do. This starts with our love for coffee
                — including the way we purchase our beans, how the farmers are treated, and how we serve those who
                purchase this product.
              </p>
            </div>

            <div className="about-text-block about-text-2">
              <h3>Hacienda La Minita</h3>
              <p>
                Café Jiménez sources 100% single-origin Costa Rican coffee from the legendary Hacienda La Minita —
                Rainforest Alliance certified and committed to strict environmental and social standards. The fruit
                comes from the Western part of Tarrazú Valley, one of the most celebrated coffee regions in the
                world.
              </p>
            </div>

            <div className="about-media-block about-media-2">
              <YoutubeFacade
                videoId="ksTG5ypLNI0"
                title="Café Jiménez — Costa Rica La Minita Tarrazú Coffee"
                thumbnailAlt="Costa Rica La Minita Tarrazú Coffee Fields"
              />
              <p className="video-caption">
                Costa Rica La Minita Tarrazú — The lighter side of a world-class bean.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section testimonials-section" aria-label="Customer testimonials">
        <div className="section-container">
          <header className="section-header">
            <span className="section-badge">What People Say</span>
            <h2>Loved by Coffee Lovers</h2>
            <p>Real stories from families and businesses who start their mornings with Café Jiménez.</p>
          </header>

          <div className="testimonials-grid">
            {TESTIMONIALS.map((t) => (
              <article
                key={t.name}
                className={`testimonial-card ${t.featured ? "featured-testimonial" : ""}`}
              >
                <div className="testimonial-stars" aria-label="5 stars">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <i className="fa-solid fa-star" key={i} />
                  ))}
                </div>
                <blockquote className="testimonial-quote">&quot;{t.quote}&quot;</blockquote>
                <footer className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true">
                    <i className="fa-solid fa-user" />
                  </div>
                  <div className="author-info">
                    <span className="author-name">{t.name}</span>
                    <span className="author-role">{t.role}</span>
                  </div>
                </footer>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
