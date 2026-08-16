import type { Metadata } from "next";
import { Jost, Red_Hat_Text } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const redHat = Red_Hat_Text({
  variable: "--font-red-hat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const SITE = "https://quietloopdigital.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "Quiet Loop Digital — Design to deploy, for startups",
    template: "%s · Quiet Loop Digital",
  },
  description:
    "I build websites and web apps for startups — the interface, the code, and the infrastructure it runs on. Based in Ahmedabad, working with founders anywhere.",
  keywords: [
    "web development Ahmedabad",
    "UI UX designer Ahmedabad",
    "freelance web developer India",
    "startup website design",
    "DevOps freelancer India",
  ],
  authors: [{ name: "Jaydip Bhut" }],
  creator: "Jaydip Bhut",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE,
    siteName: "Quiet Loop Digital",
    title: "Quiet Loop Digital — Design to deploy, for startups",
    description:
      "Design, development and DevOps for startups. One person, the whole loop. Ahmedabad, India.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Quiet Loop Digital",
    description:
      "Design, development and DevOps for startups. One person, the whole loop.",
  },
  icons: {
    icon: "/brand/favicon.png",
    apple: "/brand/icon-dark.png",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${jost.variable} ${redHat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-ink focus:px-4 focus:py-2 focus:text-bg"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
