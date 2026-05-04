// Required by the App Router. The real root layout — including <html>
// and <body> — lives in app/[locale]/layout.tsx so the lang attribute
// can be set per locale.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
