import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Weather App - Current Weather & 5-Day Forecast",
  description: "Get current weather conditions and 5-day forecasts for cities worldwide",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
