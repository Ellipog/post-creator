import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Post Creator",
  description: "Create your own posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
