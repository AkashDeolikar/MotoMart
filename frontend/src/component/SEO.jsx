// components/SEO.jsx
import Head from 'next/head';

export default function SEO({ 
  title, 
  description, 
  url, 
  image, 
  type = "website" 
}) {
  return (
    <Head>
      {/* Basic Meta */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content="index, follow" />

      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Structured Data (JSON-LD) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "article" ? "Article" : "WebSite",
            "name": title,
            "url": url,
            "description": description,
            "publisher": {
              "@type": "Organization",
              "name": "MotoMart"
            }
          }),
        }}
      />
    </Head>
  );
}
