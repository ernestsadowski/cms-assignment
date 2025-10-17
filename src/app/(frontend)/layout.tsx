import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Figtree, Inter } from "next/font/google";
import { ConsentManagerProvider, CookieBanner, ConsentManagerDialog } from "@c15t/nextjs";

import Root from "@/ui/Root";
import SkipToContent from "@/ui/SkipToContent";
import Header from "@/ui/header";
import Footer from "@/ui/footer";
import VisualEditingControls from "@/ui/VisualEditingControls";

import "@/styles/app.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const RootLayout = async ({ children }: { children: React.ReactNode }) => (
  <Root>
    <body
      className={`bg-canvas text-ink antialiased ${figtree.variable} ${inter.variable}`}
    >
      <ConsentManagerProvider
        options={{
          // mode: "c15t",
          // backendURL: "/api/c15t",
          mode: "offline",
        }}
      >
        <SkipToContent />
        <Header />
        <main id="main-content" role="main" tabIndex={-1}>
          {children}
        </main>
        <Footer />

        <VisualEditingControls />

        <Analytics />
        <SpeedInsights />
        <CookieBanner />
        <ConsentManagerDialog />
      </ConsentManagerProvider>
    </body>
  </Root >
);

export default RootLayout;
