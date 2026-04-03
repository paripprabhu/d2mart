import Link from "next/link";
import { Zap, CalendarDays, ShoppingBasket, MapPin, Clock, Tag } from "lucide-react";
import DeliveryBanner from "@/app/components/instamart/DeliveryBanner";

export default function InstamartLanding() {
  return (
    <div className="min-h-screen bg-[#f0f0f5]">
      <DeliveryBanner />

      {/* Hero */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-5 pt-10 pb-8 text-center">
          <div className="w-16 h-16 bg-[#0c831f] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200">
            <Zap size={32} className="text-white fill-white" />
          </div>
          <h1 className="text-3xl font-black text-[#3d4152] leading-tight">
            Welcome to <span className="text-[#0c831f]">D2mart</span>
          </h1>
          <p className="text-[#93959f] mt-2 text-sm leading-relaxed">
            Groceries &amp; essentials delivered in minutes — or schedule weekly so you never run out.
          </p>

          {/* Coverage pill */}
          <div className="inline-flex items-center gap-1.5 mt-4 bg-green-50 border border-green-200 rounded-full px-4 py-1.5">
            <MapPin size={12} className="text-[#0c831f]" />
            <span className="text-xs font-bold text-[#0c831f]">Delivering to TAPMI &amp; NIH, Manipal</span>
          </div>
        </div>
      </div>

      {/* Two action cards */}
      <div className="max-w-2xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-2 gap-4">

        {/* Shop Now */}
        <Link
          href="/instamart/shop"
          className="group bg-white rounded-3xl border-2 border-transparent hover:border-[#0c831f] shadow-sm hover:shadow-lg hover:shadow-green-100 transition-all overflow-hidden active:scale-[0.98]"
        >
          <div className="bg-gradient-to-br from-green-50 to-green-100 px-6 pt-6 pb-4 flex justify-between items-start">
            <div>
              <span className="text-4xl">🛒</span>
              <p className="mt-2 text-xs font-bold text-[#0c831f] uppercase tracking-wider">Instant Delivery</p>
            </div>
            <div className="bg-[#0c831f] rounded-full px-2.5 py-1">
              <Clock size={13} className="text-white" />
            </div>
          </div>
          <div className="px-6 py-4">
            <h2 className="text-lg font-black text-[#3d4152]">Shop Now</h2>
            <p className="text-xs text-[#93959f] mt-0.5 leading-relaxed">
              Browse 60+ products across 8 categories. Delivered to your door in ~8 minutes.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex-1 bg-[#0c831f] text-white text-sm font-black text-center py-2.5 rounded-xl group-hover:bg-green-800 transition">
                Start Shopping →
              </span>
            </div>
          </div>
        </Link>

        {/* Schedule */}
        <Link
          href="/instamart/schedule"
          className="group bg-white rounded-3xl border-2 border-transparent hover:border-[#0c831f] shadow-sm hover:shadow-lg hover:shadow-green-100 transition-all overflow-hidden active:scale-[0.98]"
        >
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 pt-6 pb-4 flex justify-between items-start">
            <div>
              <span className="text-4xl">📅</span>
              <p className="mt-2 text-xs font-bold text-indigo-500 uppercase tracking-wider">Weekly Recurring</p>
            </div>
            <div className="bg-indigo-400 rounded-full px-2.5 py-1">
              <CalendarDays size={13} className="text-white" />
            </div>
          </div>
          <div className="px-6 py-4">
            <h2 className="text-lg font-black text-[#3d4152]">Schedule Delivery</h2>
            <p className="text-xs text-[#93959f] mt-0.5 leading-relaxed">
              Pick items, choose days &amp; time slot. We deliver automatically every week.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <span className="flex-1 bg-indigo-500 text-white text-sm font-black text-center py-2.5 rounded-xl group-hover:bg-indigo-600 transition">
                Set Up Schedule →
              </span>
            </div>
          </div>
        </Link>
      </div>

      {/* Trust badges */}
      <div className="max-w-2xl mx-auto px-4 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { icon: "⚡", title: "8-min delivery", sub: "Lightning fast" },
            { icon: "🏷️", title: "Best prices", sub: "Lowest in Manipal" },
            { icon: "🔄", title: "Easy returns", sub: "No questions asked" },
          ].map((b) => (
            <div key={b.title} className="bg-white rounded-2xl p-3 text-center shadow-sm">
              <p className="text-2xl mb-1">{b.icon}</p>
              <p className="text-xs font-bold text-[#3d4152] leading-tight">{b.title}</p>
              <p className="text-[10px] text-[#93959f] mt-0.5">{b.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Popular categories teaser */}
      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingBasket size={16} className="text-[#0c831f]" />
            <p className="font-bold text-[#3d4152] text-sm">What&apos;s available</p>
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[
              { emoji: "🥦", name: "Fruits & Veg" },
              { emoji: "🥛", name: "Dairy & Eggs" },
              { emoji: "🍿", name: "Snacks" },
              { emoji: "🥤", name: "Drinks" },
              { emoji: "🍜", name: "Instant" },
              { emoji: "🛒", name: "Packaged" },
              { emoji: "🧴", name: "Personal Care" },
              { emoji: "🧹", name: "Household" },
            ].map((c) => (
              <Link
                key={c.name}
                href={`/instamart/shop`}
                className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-green-50 transition active:bg-green-100"
              >
                <span className="text-2xl">{c.emoji}</span>
                <span className="text-[10px] font-semibold text-[#3d4152] text-center leading-tight">{c.name}</span>
              </Link>
            ))}
          </div>
          <Link
            href="/instamart/shop"
            className="mt-4 block w-full text-center text-xs font-bold text-[#0c831f] hover:underline py-2"
          >
            View all 60+ products →
          </Link>
        </div>
      </div>

      {/* Coupon nudge */}
      <div className="max-w-2xl mx-auto px-4 pb-10">
        <div className="bg-[#0c831f] rounded-2xl px-5 py-4 flex items-center gap-4">
          <Tag size={20} className="text-yellow-300 shrink-0" />
          <div className="flex-1">
            <p className="text-white font-bold text-sm">Use code D2MART10</p>
            <p className="text-green-200 text-xs mt-0.5">Get 10% off on your first order</p>
          </div>
          <Link
            href="/instamart/shop"
            className="bg-yellow-300 text-[#0c831f] font-black text-xs px-4 py-2 rounded-xl hover:bg-yellow-200 transition shrink-0"
          >
            Shop Now
          </Link>
        </div>
      </div>

      <footer className="bg-[#1a1a2e] text-white py-8 px-4">
        <div className="max-w-2xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-lg font-black"><span className="text-[#0c831f]">D2</span>mart</p>
            <p className="text-xs text-gray-400 mt-0.5">Quick commerce · Design Thinking Demo</p>
          </div>
          <div className="text-right text-xs text-gray-400 space-y-0.5">
            <p>⚡ Delivery in 8 minutes</p>
            <p>📍 TAPMI &amp; NIH, Manipal</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
