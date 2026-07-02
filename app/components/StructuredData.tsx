// app/components/StructuredData.tsx
export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Shaper",
    "url": "https://shaper.co.za",
    "logo": "https://shaper.co.za/logo.png",
    "description": "Discover and connect with top-tier, broadcast-ready specialized creative professionals and engineering talents.",
    "sameAs": [
      "https://www.linkedin.com/company/shaper-talent", // Adjust if you have a specific social link
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}