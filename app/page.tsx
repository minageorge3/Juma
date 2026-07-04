"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);
  
  // الجمل اللي عايزها تتكتب وتتمسح
  const phrases = ["JuMa Store", "أفضل المنتجات", "تسوق بسهولة", "أسرع توصيل"];

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % phrases.length;
      const fullText = phrases[i];

      setText(isDeleting 
        ? fullText.substring(0, text.length - 1) 
        : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 150);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 2000); // استنى ثانيتين قبل ما تمسح
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum]);

  return (
    <div className="bg-gray-800 flex flex-col py-20 justify-center items-center h-[50vh]">
      {/* هنا النص اللي بيتكتب مع المؤشر */}
      <h1 className="text-white text-4xl font-bold h-16">
        {text}
        <span className="animate-blink">|</span>
      </h1>

      <button 
        onClick={() => window.dispatchEvent(new Event("toggleMenu"))}
        className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-700 transition-all cursor-pointer"
      >
        افتح القائمة
      </button>

      {/* استايل المؤشر اللي بينور ويطفي */}
      <style jsx global>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
          margin-left: 5px;
          color: #3b82f6; /* لون أزرق للمؤشر */
        }
      `}</style>
    </div>
  );
}