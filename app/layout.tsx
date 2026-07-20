import type { Metadata } from "next";
import { JetBrains_Mono, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import SkipLink from "@/components/layout/SkipLink";
import MotionProvider from "@/components/providers/MotionProvider";
import AccessibilityProvider from "@/components/providers/AccessibilityProvider";
import AccessibilityToolbarWrapper from "@/components/layout/AccessibilityToolbarWrapper";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Antarip Debgupta — Frontend Developer / Accessibility Focus",
  description:
    "Antarip Debgupta — Frontend developer focused on performance, maintainability, and accessible, scalable web applications.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jetbrainsMono.variable} ${ibmPlexSans.variable} h-full antialiased`}
    >
      <body className="bg-bg text-ink flex min-h-full flex-col font-sans">
        <SkipLink />
        <AccessibilityProvider>
          <MotionProvider>{children}</MotionProvider>
          <AccessibilityToolbarWrapper />
        </AccessibilityProvider>
      </body>
    </html>
  );
}
