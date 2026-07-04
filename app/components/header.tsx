"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleToggle = () => setOpen(true);
    window.addEventListener("toggleMenu", handleToggle);
    return () => window.removeEventListener("toggleMenu", handleToggle);
  }, []);

  return (
    <>
      <header className="bg-blue-500 flex justify-between p-4 items-center text-white">
        <button
          onClick={() => setOpen(true)}
          className="text-white font-bold text-2xl animate-bounce-side"
        >
          ☰ القائمة
        </button>
        <h4 className="font-bold">JuMa Store</h4>
      </header>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-gray-900 text-white z-[60] shadow-2xl transform transition-transform duration-300 ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="p-5">
          <div className="flex justify-between mb-10">
            <h2 className="text-xl font-bold">لوحة التحكم</h2>
            <button onClick={() => setOpen(false)} className="text-2xl">
              ✕
            </button>
          </div>
          {/* هنا التعديل: ضفنا كلاس animate-bounce-side مع delay لكل واحد */}
          <ul className="space-y-6 font-bold text-lg ">
            <li
              className="animate-bounce-side"
              style={{ animationDelay: "0s" }}
            >
              <Link href="/" onClick={() => setOpen(false)}>
                🏠 الرئيسية
              </Link>
            </li>
            <li
              className="animate-bounce-side"
              style={{ animationDelay: "0.4s" }}
            >
              <Link href="/store" onClick={() => setOpen(false)}>
                📦 المنتجات
              </Link>
            </li>
            <li
              className="animate-bounce-side"
              style={{ animationDelay: "0.8s" }}
            >
              <Link href="/checkout" onClick={() => setOpen(false)}>
                💰 مشترياتى
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ستايل الأنيميشن عشان ميبقاش فيه ملفات خارجية كتير */}
      <style jsx global>{`
        @keyframes bounceSide {
          0%,
          100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(15px);
          }
        }
        .animate-bounce-side {
          animation: bounceSide 2s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Header;
