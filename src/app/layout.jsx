import "./globals.css";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import ProvidersWrapper from "@/components/ProvidersWraper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kalamkunja - Explore The Core",
  description: "Dive deep into insightful articles and share your knowledge.",
  openGraph: {
    title: "Kalamkunja - Explore The Core",
    description: "Dive deep into insightful articles and share your knowledge.",
    url: "https://kalamkunja.vercel.app",
    siteName: "Kalamkunja",
    images: [
      {
        url: "https://res.cloudinary.com/dnh6hzxuh/image/upload/v1754571700/gbu4itwsz5wwwfaotppz.png",
        width: 1200,
        height: 630,
        alt: "Kalamkunja - Explore The Core",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gray-50 flex flex-col min-h-screen`}
      >
        <ProvidersWrapper>
          <div className="flex flex-1">
            <div className="flex-1 flex flex-col">
              <Navbar />
              <Toaster />
              <main className="flex-1 pb-8">{children}</main>
            </div>
          </div>
        </ProvidersWrapper>
        <Footer />
      </body>
    </html>
  );
}
