import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import "./work-with-us.css";

export const metadata = {
  title: "Made For You - Personalized Coffee for Companies",
};

export default function WorkWithUsPage() {
  return (
    <main className="subpage">
      <section className="work-hero">
        <div className="work-hero-bg" aria-hidden="true" />
        <div className="work-hero-gradient" aria-hidden="true" />
        
        <div className="work-hero-content">
          <h1>Made For You</h1>
          <p>
            Create a coffee experience that reflects your brand. We partner with businesses to produce custom coffee
            bags featuring your company’s logo, colors, and messaging.
          </p>
          <div className="work-hero-buttons">
            <Link href="/contact" className="btn btn-primary">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="section work-section">
        <div className="section-container">
          <div className="work-grid">
            <FadeIn direction="up" className="work-text-block">
              <h3>A Unique Brand Experience</h3>
              <p>
                Whether you're looking for corporate gifts, employee appreciation packages, event giveaways, client
                welcome kits, or retail products, we handle the entire process—from selecting premium single origin
                costarican coffee to designing and packaging your personalized bags.
              </p>
              <p>
                Our team works closely with you to ensure every detail aligns with your brand identity, delivering a
                unique and memorable product that leaves a lasting impression with customers, employees, and partners.
              </p>
            </FadeIn>
            <FadeIn direction="up" delay={0.2} className="work-image-block">
              <Image
                src="/screen.png"
                alt="Café Jiménez Branded Coffee Bag Front"
                width={800}
                height={1000}
                priority
              />
              <Image
                src="/screen-back.png"
                alt="Café Jiménez Branded Coffee Bag Back"
                width={800}
                height={1000}
                priority
              />
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="section offer-section">
        <div className="section-container">
          <header className="section-header">
            <span className="section-badge">WHAT WE OFFER</span>
            <h2>Tailored To Your Needs</h2>
          </header>
          
          <div className="offer-grid">
            {[
              {
                icon: "fa-pen-nib",
                title: "Custom-branded Design",
                desc: "Coffee bags designed specifically with your logo, typography, and brand colors."
              },
              {
                icon: "fa-seedling",
                title: "Premium Coffee Blend",
                desc: "Selection of the finest high-altitude single origin beans from Tarrazú, Costa Rica."
              },
              {
                icon: "fa-gift",
                title: "Corporate Gifts",
                desc: "Ideal for client welcome kits, employee appreciation packages, and promotional products."
              },
              {
                icon: "fa-people-group",
                title: "Event Packages",
                desc: "Perfect for conferences, weddings, and special events to leave a lasting impression."
              },
              {
                icon: "fa-box-open",
                title: "Flexible Quantities",
                desc: "We work with orders of 12oz bags, allowing small businesses to get custom coffee too."
              },
              {
                icon: "fa-truck-fast",
                title: "End-to-End Support",
                desc: "Full production, roasting, packaging, and logistical support from start to finish."
              }
            ].map((offer, i) => (
              <FadeIn direction="up" delay={i * 0.1} key={offer.title}>
                <div className="offer-card">
                  <div className="offer-icon">
                    <i className={`fa-solid ${offer.icon}`}></i>
                  </div>
                  <h4>{offer.title}</h4>
                  <p>{offer.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <FadeIn direction="up" className="section work-cta">
        <div className="section-container">
          <h2>Turn every cup into a branded experience</h2>
          <Link href="/contact" className="btn btn-primary">
            Start Your Project
          </Link>
        </div>
      </FadeIn>
    </main>
  );
}
