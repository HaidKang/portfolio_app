import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "포트폴리오 | 개발자 이름",
    template: "%s | 포트폴리오",
  },
  description: "웹 개발자의 포트폴리오 웹사이트입니다. 다양한 프로젝트와 기술 스택을 확인해보세요.",
  keywords: ["웹", "개발자", "포트폴리오", "React", "Next.js", "TypeScript"],
  authors: [{ name: "개발자 이름" }],
  creator: "개발자 이름",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://your-portfolio.com",
    title: "포트폴리오 | 개발자 이름",
    description: "웹 개발자의 포트폴리오 웹사이트입니다.",
    siteName: "포트폴리오",
  },
  twitter: {
    card: "summary_large_image",
    title: "포트폴리오 | 개발자 이름",
    description: "웹 개발자의 포트폴리오 웹사이트입니다.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
