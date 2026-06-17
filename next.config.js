/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // E-books : ancienne URL /products/* → nouvelle URL canonique
      {
        source: "/products/e-book-reussir-son-expatriation-en-suede",
        destination:
          "/collections/e-books/e-book-reussir-son-expatriation-en-suede",
        permanent: true,
      },
      {
        source: "/products/acheter-une-maison-en-suede-le-guide-ultime",
        destination:
          "/collections/e-books/acheter-une-maison-en-suede-le-guide-ultime",
        permanent: true,
      },

      // Affiches Shopify absentes du catalogue local → fallback collection
      {
        source: "/products/vinter-ren",
        destination: "/collections/affiches-murales",
        permanent: true,
      },
      {
        source: "/products/gamla-lappland",
        destination: "/collections/affiches-murales",
        permanent: true,
      },
      {
        source: "/products/vinterdrom",
        destination: "/collections/affiches-murales",
        permanent: true,
      },

      // Anciennes formes d'URL / alias défensifs
      { source: "/blog", destination: "/blogs/infos", permanent: true },
      {
        source: "/blog/:slug",
        destination: "/blogs/infos/:slug",
        permanent: true,
      },
      { source: "/blogs", destination: "/blogs/infos", permanent: true },
      {
        source: "/collections",
        destination: "/collections/affiches-murales",
        permanent: true,
      },
      {
        source: "/products",
        destination: "/collections/affiches-murales",
        permanent: true,
      },

      // Panier / compte Shopify pas encore branchés → contact
      { source: "/cart", destination: "/pages/contact", permanent: false },
      {
        source: "/account/:path*",
        destination: "/pages/contact",
        permanent: false,
      },

      // JSON Shopify legacy
      { source: "/search.json", destination: "/search", permanent: true },
      {
        source: "/products.json",
        destination: "/collections/affiches-murales",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
