export const getFinancialServiceSchema = (name: string, ifsc: string, address: string, city: string, state: string) => ({
  "@context": "https://schema.org",
  "@type": "FinancialService",
  "name": name,
  "branchCode": ifsc,
  "address": {
    "@type": "PostalAddress",
    "streetAddress": address,
    "addressLocality": city,
    "addressRegion": state,
    "addressCountry": "IN"
  }
});

export const getPostalAddressSchema = (pincode: string) => ({
  "@context": "https://schema.org",
  "@type": "PostalAddress",
  "postalCode": pincode,
  "addressCountry": "IN",
});

export const getArticleSchema = (title: string, dateModified: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "dateModified": dateModified,
});

export const getFAQPageSchema = (questions: { question: string; answer: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": questions.map((q) => ({
    "@type": "Question",
    "name": q.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": q.answer,
    },
  })),
});

export const getWebApplicationSchema = (name: string) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": name,
  "applicationCategory": "Utilities",
});
