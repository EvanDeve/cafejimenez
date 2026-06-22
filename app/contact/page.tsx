import type { Metadata } from "next";
import "./contact.css";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <main className="subpage">
      <section id="contact" className="section contact-section">
        <div className="section-container">
          <header className="section-header">
            <span className="section-badge">Get In Touch</span>
            <h2>Contact Us</h2>
            <p>Have questions about our beans, bulk orders, or shipping? Reach out directly to our team.</p>
          </header>

          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-card-icon">
                <i className="fa-solid fa-envelope" />
              </div>
              <h3>Email Us</h3>
              <p>
                <a href="mailto:jorge.jimenez@costaricafe.com" className="contact-link">
                  jorge.jimenez@costaricafe.com
                </a>
              </p>
            </div>

            <div className="contact-card highlighted">
              <div className="contact-card-icon">
                <i className="fa-solid fa-phone" />
              </div>
              <h3>Call Us</h3>
              <p>
                <a href="tel:+17079184422" className="contact-link">
                  +1 (707) 918 4422
                </a>
              </p>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon">
                <i className="fa-solid fa-location-dot" />
              </div>
              <h3>Location</h3>
              <p>Lakeside, Montana, USA</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
