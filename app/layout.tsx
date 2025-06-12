import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PX to REM Converter",
  keywords: ["px to rem", "css converter", "responsive design"],
  description: "Instant bi-directional conversion between pixels and rem units",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
