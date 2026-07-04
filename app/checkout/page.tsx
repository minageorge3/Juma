'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

// 1. هنا عرفنا شكل المنتج عشان TypeScript يفهمنا
interface CartItem {
  id: string;
  name: string;
  price: number;
}

export default function CheckoutPage() {
  const router = useRouter();
  
  // 2. هنا حددنا إن الـ cart هي عبارة عن مصفوفة من النوع CartItem
  const [cart, setCart] = useState<CartItem[]>([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    const savedCart = localStorage.getItem("myCart");
    if (savedCart) {
      // استخدمنا 'as CartItem[]' عشان نطمن الـ TypeScript إن البيانات اللي جاية هي منتجاتنا
      setCart(JSON.parse(savedCart) as CartItem[]);
    }
  }, []);

  // دلوقتي الـ reduce هتعرف إن الـ item فيه price
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  const sendToWhatsApp = () => {
    if (!name || !phone) {
      alert("من فضلك اكتب اسمك ورقم تليفونك!");
      return;
    }

    const message = `طلب جديد من JuMa Store:%0A%0A` +
      `الاسم: ${name}%0A` +
      `التليفون: ${phone}%0A%0A` +
      `المنتجات:%0A${cart.map(i => `- ${i.name} (${i.price} ج.م)`).join('%0A')}%0A%0A` +
      `الإجمالي: ${total} ج.م`;

    const myWhatsApp = "2000000"; // تأكد من وضع رقمك هنا
    window.open(`https://wa.me/${myWhatsApp}?text=${message}`, "_blank");
  };

  return (
    <div className="p-10 text-black max-w-2xl mx-auto">
      <h1 className="text-amber-50 text-3xl font-bold mb-6 text-center">بيانات الطلب 📝</h1>
      
      {cart.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <p className="text-xl mb-6">سلتك فارغة حالياً 🛒</p>
          <button 
            onClick={() => router.push('/store')} 
            className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700"
          >
            العودة للمنتجات
          </button>
        </div>
      ) : (
        <>
          <div className="bg-gray-100 p-6 rounded-xl mb-6">
            <input 
              className="w-full p-3 mb-3 border rounded" 
              placeholder="اسمك الكريم" 
              onChange={(e) => setName(e.target.value)} 
            />
            <input 
              className="w-full p-3 border rounded" 
              type="tel" 
              placeholder="رقم تليفونك (للتواصل)" 
              onChange={(e) => setPhone(e.target.value)} 
            />
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg border">
            {cart.map((item, index) => (
              <div key={index} className="flex justify-between border-b py-3">
                <span>{item.name}</span>
                <span className="font-bold">{item.price} ج.م</span>
              </div>
            ))}
            <div className="flex justify-between mt-6 pt-6 border-t-2 font-bold text-xl">
              <span>الإجمالي:</span>
              <span className="text-blue-600">{total} ج.م</span>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <button onClick={() => router.push('/store')} className="flex-1 bg-gray-500 text-white py-3 rounded-xl font-bold">رجوع</button>
            <button onClick={sendToWhatsApp} className="flex-1 bg-green-500 text-white py-3 rounded-xl font-bold hover:bg-green-600">
              إتمام عبر واتساب 📲
            </button>
          </div>
        </>
      )}
    </div>
  );
}