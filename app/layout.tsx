import type { Metadata } from "next";

import "./globals.css";

import { generalConfig } from "@/lib/app-config";
import { GlobalLayout } from "@/lib/components/layout";
import { fontInter } from "@/lib/constants";
import { getPageLayoutContent } from "@/lib/data/client";
import { LayoutMappers } from "@/lib/utils";

const layoutContent = await getPageLayoutContent();

export async function generateMetadata(): Promise<Metadata> {
  const { mapContentToMetadata } = LayoutMappers(layoutContent);

  try {
    const { title, description } = mapContentToMetadata();

    return {
      title,
      description,
    };
  } catch {
    return {
      title: generalConfig.fallbackTitle,
      description: generalConfig.fallbackDescription,
    };
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { mapContentToFaviconUrl } = LayoutMappers(layoutContent);
  const faviconUrl = mapContentToFaviconUrl();

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={faviconUrl} />
      </head>
      <body
        className={`${fontInter.variable} antialiased`}
        suppressHydrationWarning
      >
        <GlobalLayout content={layoutContent}>{children}</GlobalLayout>
      </body>
    </html>
  );
}
