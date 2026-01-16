import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Business & Brews Greenville",
  description:
    "Greenville's premier networking series with speakers, venues, and events.",
  icons: {
    icon: "/bnb-favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
