const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Stock Book",
  "url": "https://stock-book-eight.vercel.app/",
  "description": "Stock Book is a simple inventory ledger for photographing stock, tagging prices, and tracking items in one searchable place.",
  "publisher": {
    "@type": "Organization",
    "name": "Stock Book"
  }
};

export default function SeoJsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
