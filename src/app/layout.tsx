import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Big Tree Cafe | Outdoor Dining & Cabanas | Golf Course Road Gurgaon",
  description: "Gurgaon's most stunning outdoor cafe on Golf Course Road. Private cabanas, live music, fairy lights. 4.6★ · 2800+ reviews. Book your table online.",
  keywords: "outdoor cafe Gurgaon, cabana restaurant, live music cafe, Golf Course Road cafe, Big Tree Cafe",
  openGraph: {
    title: "The Big Tree Cafe | Outdoor Dining & Cabanas",
    description: "Gurgaon's most stunning outdoor cafe. Private cabanas, live music, fairy lights.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=DM+Mono&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "The Big Tree Cafe",
              "telephone": "+91-8183959595",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Pillar 174, Golf Course Road, Opposite Rapid Metro",
                "addressLocality": "Gurugram",
                "addressRegion": "Haryana",
                "postalCode": "122011",
                "addressCountry": "IN"
              },
              "geo": { "@type": "GeoCoordinates", "latitude": 28.4301, "longitude": 77.0938 },
              "servesCuisine": ["Continental", "North Indian", "Italian"],
              "priceRange": "₹₹₹",
              "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.6", "reviewCount": "2800" },
              "acceptsReservations": "True"
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
