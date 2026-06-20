import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import "./work-with-us.css";

export const metadata: Metadata = {
  title: "Work With Us - Personalized Coffee for Companies",
};

export default function WorkWithUsPage() {
  return (
    <main className="subpage">
      <section className="work-hero">
        <div className="work-hero-bg" aria-hidden="true" />
        <div className="work-hero-gradient" aria-hidden="true" />
        
        <div className="work-hero-content">
          <h1>Work With Us</h1>
          <p>
            Create a coffee experience that reflects your brand. We partner with businesses to produce custom coffee
            bags featuring your company’s logo, colors, and messaging.
          </p>
        </div>
      </section>

      <section className="section work-section">
        <div className="section-container">
          <div className="work-grid">
            <div className="work-text-block">
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
            </div>
            <div className="work-image-block">
              <Image
                src="/mockup-montana-provisions.png"
                alt="Montana Provisions Branded Coffee Bag Mockup"
                width={800}
                height={800}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="offer-section">
        <div className="section-container">
          <header className="section-header">
            <span className="section-badge">WHAT WE OFFER</span>
            <h2>Tailored To Your Needs</h2>
          </header>
          
          <div className="offer-grid">
            <div className="offer-card">
              <div className="offer-icon">
                <i className="fa-solid fa-pen-nib"></i>
              </div>
              <h4>Custom-branded Design</h4>
              <p>Coffee bags designed specifically with your logo, typography, and brand colors.</p>
            </div>
            
            <div className="offer-card">
              <div className="offer-icon">
                <i className="fa-solid fa-seedling"></i>
              </div>
              <h4>Premium Coffee Blend</h4>
              <p>Selection of the finest high-altitude single origin beans from Tarrazú, Costa Rica.</p>
            </div>

            <div className="offer-card">
              <div className="offer-icon">
                <i className="fa-solid fa-gift"></i>
              </div>
              <h4>Corporate Gifts</h4>
              <p>Ideal for client welcome kits, employee appreciation packages, and promotional products.</p>
            </div>

            <div className="offer-card">
              <div className="offer-icon">
                <i className="fa-solid fa-people-group"></i>
              </div>
              <h4>Event Packages</h4>
              <p>Perfect for conferences, weddings, and special events to leave a lasting impression.</p>
            </div>

            <div className="offer-card">
              <div className="offer-icon">
                <i className="fa-solid fa-box-open"></i>
              </div>
              <h4>Flexible Quantities</h4>
              <p>We work with orders of various sizes, allowing small businesses to get custom coffee too.</p>
            </div>

            <div className="offer-card">
              <div className="offer-icon">
                <i className="fa-solid fa-truck-fast"></i>
              </div>
              <h4>End-to-End Support</h4>
              <p>Full production, roasting, packaging, and logistical support from start to finish.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="work-cta">
        <div className="section-container">
          <h2>Turn every cup into a branded experience</h2>
          <Link href="/contact" className="btn btn-primary">
            Start Your Project
          </Link>
        </div>
      </section>
    </main>
  );
}
