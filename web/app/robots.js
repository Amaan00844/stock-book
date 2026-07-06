export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://stock-book-drab.vercel.app/sitemap.xml",
  };
}
