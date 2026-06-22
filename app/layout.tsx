import type { Metadata } from "next";
import { dmSans, playfairDisplay } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Café Jiménez",
    template: "%s — Café Jiménez",
  },
  description:
    "Specialty Costa Rican coffee roasted with purpose. 100% single-origin from Hacienda La Minita, Tarrazú Valley. Subscribe and taste the difference.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${dmSans.variable} ${playfairDisplay.variable}`}>
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        
        {/* WhatsApp Float Button */}
        <a
          href="https://wa.me/17079184422"
          target="_blank"
          rel="noopener noreferrer"
          className="whatsapp-float"
          aria-label="Chat with us on WhatsApp"
        >
          <i className="fa-brands fa-whatsapp"></i>
        </a>
      </body>
    </html>
  );
}
