import { cities, faq, site } from "@/lib/site";

// Dados estruturados para o Google (negócio local + FAQ).
export default function JsonLd({ withFaq = true }: { withFaq?: boolean }) {
  const business = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: site.name,
    slogan: site.tagline,
    url: site.url,
    telephone: "+55 47 99900-7120",
    email: site.email,
    image: `${site.url}/img/fachada-1920.webp`,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressRegion: site.address.state,
      addressCountry: "BR",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "13:00" },
    ],
    areaServed: cities.map((c) => ({ "@type": "City", name: `${c}, SC` })),
    sameAs: [site.instagram.url],
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }} />
      {withFaq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />}
    </>
  );
}
