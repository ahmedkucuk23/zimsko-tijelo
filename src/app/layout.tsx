import type { Metadata } from "next";
import { Onest, Playfair_Display } from "next/font/google";
import "./globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Zimsko Tijelo | by Ana & Bezdrob",
  description:
    "Transformacija pocinje ove zime. Program treninga i ishrane kreiran da te transformise. Ne cekaj proljece - pocni sada.",
  openGraph: {
    title: "Zimsko Tijelo | by Ana & Bezdrob",
    description:
      "Transformacija pocinje ove zime. Program treninga i ishrane kreiran da te transformise.",
    images: ["/cover3.png"],
  },
  icons: {
    icon: "/icon-color.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="hr"
      className={`${onest.variable} ${playfair.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
