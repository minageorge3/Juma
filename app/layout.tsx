import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JuMa Store",
  description: "متجر JuMa Store لأفضل المنتجات",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 1. عرفنا السنة هنا جوه الدالة
  const currentYear = new Date().getFullYear();

  return (
    // 2. غيرنا اللغة للـ العربية والاتجاه لـ اليمين
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <Header />
        
        <main className="grow">{children}</main>
        
        <footer className="bg-gray-950 text-gray-400 py-8 border-t border-gray-800 text-center">
          <div className="mb-4">
            <h3 className="text-white font-bold text-lg">JuMa Store</h3>
            <p className="text-sm">أفضل المنتجات بأفضل الأسعار</p>
          </div>
          
          <div className="text-sm">
            {/* دلوقتي هيتعرف عليها عادي */}
            <p>&copy; {currentYear} جميع الحقوق محفوظة لـ JuMa Store</p>
          </div>
          
          <div className="mt-2 text-xs opacity-50">
            Design & Developed by Mina-S-George
          </div>
        </footer>
      </body>
    </html>
  );
}