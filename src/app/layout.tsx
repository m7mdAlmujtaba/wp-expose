import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
// import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });
const josefin = Josefin_Sans({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Detect WordPress Sites and Themes | WP-EXPOSE",
  description: "Quickly detect if a website is using WordPress, and identify the active theme and plugins.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       {/* <Head>
        <title>Detect WordPress Sites and Themes | WP-EXPOSE</title>
        <meta name="description" content="Quickly detect if a website is using WordPress, and identify the active theme and plugins." />
        <meta property="og:title" content="Detect WordPress Sites and Themes" />
        <meta property="og:description" content="Easily detect WordPress themes and plugins." />
        <meta property="og:url" content="https://www.mywebsite.com" />
        <meta property="og:type" content="website" />
      </Head> */}
      <body className={`${josefin.className} bg-white`}>{children}</body>
    </html>
  );
}
