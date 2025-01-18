'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { BoardProvider } from '@/context/BoardContext';
import { LanguageProvider } from '@/context/LanguageContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { TourProvider } from '@/context/TourContext';
import { TooltipProvider } from '@/context/TooltipContext';
import { use } from 'react';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

interface LayoutParams {
  locale: string;
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<LayoutParams>;
}) {
  const { locale } = use(params);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
        <ThemeProvider>
          <LanguageProvider locale={locale}>
            <TooltipProvider>
              <TourProvider>
                <BoardProvider>
                  {children}
                </BoardProvider>
              </TourProvider>
            </TooltipProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 