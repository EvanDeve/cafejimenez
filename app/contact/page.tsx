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

          <div className="contact-wrapper">
            <div className="contact-info-panel">
              <h3>Contact Information</h3>
              <p className="panel-desc">Connect with us via email or explore our operational locations.</p>

              <div className="info-list">
                <div className="info-item">
                  <span className="info-icon">
                    <i className="fa-solid fa-location-dot" />
                  </span>
                  <div>
                    <h4>Location</h4>
                    <p>San Marcos de Tarrazú, Costa Rica &amp; Montana, USA</p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">
                    <i className="fa-solid fa-envelope" />
                  </span>
                  <div>
                    <h4>Email Us</h4>
                    <p>
                      <a href="mailto:info@cafejimenez.com" className="contact-link">
                        info@cafejimenez.com
                      </a>
                    </p>
                  </div>
                </div>
                <div className="info-item">
                  <span className="info-icon">
                    <i className="fa-solid fa-globe" />
                  </span>
                  <div>
                    <h4>Website</h4>
                    <p>
                      <a href="https://cafejimenez.com" target="_blank" rel="noopener noreferrer" className="contact-link">
                        cafejimenez.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
