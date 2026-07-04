
'use client';
import { useState, useEffect } from 'react';

const categories = [
  {
    name: "ملابس",
    items: [
      { id: 1, name: "تيشيرت أنيق", price: 250, image: "👕" },
      { id: 2, name: "بنطلون جينز", price: 400, image: "👖" },
    ]
  },
  {
    name: "إكسسوارات",
    items: [
      { id: 3, name: "ساعة يد", price: 1200, image: "⌚" },
      { id: 4, name: "نظارة شمس", price: 600, image: "🕶️" },
      { id: 5, name: "قبعة", price: 150, image: "🧢" },
      { id: 6, name: "حزام", price: 200, image: "👜" },
    ]
  },
  {
    name: "أضافات",
    items: [
      { id: 7, name: "ساعة يد", price: 1200, image: "⌚" },
      { id: 8, name: "نظارة شمس", price: 600, image: "🕶️" },
      
    ]
  },
  {
    name: "أضافات",
    items: [
      { id: 9, name: "ساعة يد", price: 1200, image: "⌚" },
      { id: 10, name: "نظارة شمس", price: 600, image: "🕶️" },
      
    ]
  }
];

export default function StorePage() {
  const [openCategory, setOpenCategory] = useState(null);
  
  // تعديل ذكي: أول ما الصفحة تفتح، بنحاول نقرأ من الـ localStorage
  const [cart, setCart] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("myCart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const addToCart = (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    localStorage.setItem("myCart", JSON.stringify(newCart)); // حفظ التغيير فوراً
  };

  const removeFromCart = (productId) => {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
      const newCart = [...cart];
      newCart.splice(index, 1);
      setCart(newCart);
      localStorage.setItem("myCart", JSON.stringify(newCart)); // حفظ التغيير فوراً
    }
  };

  const isInCart = (productId) => cart.some(item => item.id === productId);

  return (
    <div className="p-10">
      <div className="fixed top-20 right-5 flex flex-col gap-2 z-40">
        <div className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-2xl font-bold text-center">
          🛒 السلة: {cart.length}
        </div>
        {cart.length > 0 && (
          <button 
            onClick={() => window.location.href = "/checkout"}
            className="bg-green-600 text-white px-6 py-3 rounded-full shadow-lg font-bold hover:bg-green-700 cursor-pointer transition-all"
          >
            احسب التكلفة 💰
          </button>
        )}
      </div>

      <h1 className="mb-20 text-3xl font-bold mb-8 text-center">JuMa منتجات</h1>

      {categories.map((cat, index) => (
        <div key={index} className="mb-6 border rounded-xl overflow-hidden text-black shadow-sm">
          <button 
            className="cursor-pointer w-full bg-gray-200 p-4 font-bold flex justify-between items-center hover:bg-gray-300 transition-colors"
            onClick={() => setOpenCategory(openCategory === index ? null : index)}
          >
            {cat.name} 
            <span className={`transform transition-transform duration-300 ${openCategory === index ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>

          <div 
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              openCategory === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-white">
              {cat.items.map((item) => (
                <div key={item.id} className="border p-4 rounded-lg flex flex-col gap-2 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{item.image}</div>
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-blue-600 font-bold">{item.price} ج.م</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 mt-2">
                    <button 
                      onClick={() => addToCart(item)}
                      className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all cursor-pointer font-bold"
                    >
                      أضف +
                    </button>
                    
                    {isInCart(item.id) && (
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all cursor-pointer font-bold"
                      >
                        حذف -
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}