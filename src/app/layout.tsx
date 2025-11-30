import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PU Calculator - Tính Toán Polyurethane",
  description: "Ứng dụng tính toán chính xác lượng hóa chất Polyurethane trong sản xuất gối đỡ (pipe support)",
  keywords: "polyurethane, PU calculator, pipe support, gối đỡ, tính toán hóa chất",
  authors: [{ name: "PU Calculator Team" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#00E5FF",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased" style={{ background: '#0B1121' }}>
        {children}
      </body>
    </html>
  );
}