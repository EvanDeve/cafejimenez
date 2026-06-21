import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import "./buy.css";

export const metadata: Metadata = {
  title: "Buy Single Origin Tarrazú Coffee",
};

const PLANS = [
  {
    badge: "STANDARD PLAN",
    name: "Single Ritual",
    volume: "1 Bag of Coffee",
    desc: "For those who consider morning coffee sacred. Perfect for a steady, personal supply.",
    price: "$18.00",
    features: [
      "1x 12oz Whole Bean Bag",
      "Exclusive Hacienda La Minita Lot",
      "Scheduled monthly shipping",
      "Cancel or pause anytime",
    ],
    href: "https://buy.stripe.com/fZu8wQeiIeXrfg690QfEk0a?",
    btnClass: "btn-outline",
    popular: false,
  },
  {
    badge: "SAVE ON SHIPPING",
    name: "Double Ritual",
    volume: "2 Bags of Coffee",
    desc: "The favorite choice for active households and daily connoisseurs. Includes a preferred shipping rate.",
    price: "$34.00",
    features: [
      "2x 12oz Bags to preserve peak freshness",
      "Optimal roast from the current harvest",
      "Priority shipping with reduced rates",
      "Cancel or pause anytime",
    ],
    href: "https://buy.stripe.com/dRmcN67Uk9D7fg690QfEk0c?",
    btnClass: "btn-primary",
    popular: true,
  },
  {
    badge: "BULK PLAN",
    name: "Bulk Connoisseur",
    volume: "2 Bags of 5 lbs",
    desc: "Designed for boutique offices, large families, or creative studios where the grinder never rests.",
    price: "$130.00",
    features: [
      "10 lbs total in premium packaging",
      "Ideal for preserving in whole bean form",
      "Free express shipping included",
      "Cancel or pause anytime",
    ],
    href: "https://buy.stripe.com/aEU15F1N4beB6sM4gj?",
    btnClass: "btn-outline",
    popular: false,
  },
];

export default function BuyPage() {
  return (
    <main className="subpage">
      {/* Product Showcase Section */}
      <section id="product-showcase" className="section product-showcase-section">
        <div className="section-container">
          <div className="product-detail-grid">
            <FadeIn direction="right" className="product-gallery">
              <Image
                src="/hero.png"
                alt="Café Jiménez Single Origin Bag"
                width={800}
                height={1000}
                className="product-featured-image"
                priority
              />
            </FadeIn>

            <FadeIn direction="left" delay={0.2} className="product-info-column">
              <span className="product-location-meta">COFFEE FROM TARRAZÚ, COSTA RICA</span>
              <h1 className="product-title">
                Café Jiménez
                <br />
                Single Origin
              </h1>
              
              <div className="product-description">
                <p>
                  An exceptional high-altitude coffee, hand-picked between 1,200 and 2,000 meters. This selection
                  stands out for its deep notes of dark cocoa, subtle hints of sweet citrus, and a brilliantly balanced
                  acidity—fully washed in pure mountain spring water and artisan-roasted in micro-lots.
                </p>
              </div>

              <div className="product-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">ROAST</span>
                  <span className="spec-value">Medium Artisan</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">PROCESS</span>
                  <span className="spec-value">Fully Washed</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">ORIGIN</span>
                  <span className="spec-value">100% Tarrazú</span>
                </div>
              </div>

              <div className="product-action-block">
                <Link href="#subscriptions" className="btn btn-primary">
                  View Subscription Plans
                </Link>
                <p className="cta-note">Freshly roasted whole beans delivered monthly starting from $18.00.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Coffee Subscriptions Section */}
      <section id="subscriptions" className="section subscription-section">
        <div className="section-container">
          <header className="section-header">
            <span className="section-badge">SUBSCRIBE & SAVE</span>
            <h2>Coffee Subscriptions</h2>
            <p>
              Join our Coffee Club and receive freshly roasted single-origin Café Jiménez direct to your door
              every month. Pause or cancel anytime.
            </p>
          </header>

          <div className="subscription-grid">
            {PLANS.map((plan) => (
              <div className={`subscription-card ${plan.popular ? "popular" : ""}`} key={plan.name}>
                {plan.popular && <div className="popular-tag">ROASTER&apos;S CHOICE</div>}
                <div className="plan-header">
                  <span
                    className="plan-badge-top"
                    style={plan.popular ? { color: "var(--color-accent)" } : undefined}
                  >
                    {plan.badge}
                  </span>
                  <h3 className="plan-name">{plan.name}</h3>
                  <div className="plan-volume">{plan.volume}</div>
                  <p className="plan-desc">{plan.desc}</p>
                </div>
                <div className="plan-price">
                  {plan.price}
                  <span> / mo</span>
                </div>
                <ul className="plan-features">
                  {plan.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <div className="plan-footer">
                  <a href={plan.href} target="_blank" rel="noopener noreferrer" className={`btn ${plan.btnClass}`}>
                    Subscribe Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="stripe-badge">
            <i className="fa-brands fa-stripe" /> Secure checkout powered by Stripe
          </div>
        </div>
      </section>
    </main>
  );
}
