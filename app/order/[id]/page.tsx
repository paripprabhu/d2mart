import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import OrderTracker from "@/app/components/OrderTracker";

export default function OrderPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Order confirmed header */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 text-center">
        <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
          <span className="text-3xl">🎉</span>
        </div>
        <h1 className="text-2xl font-bold text-[#3d4152]">Order Confirmed!</h1>
        <p className="text-[#93959f] text-sm mt-1">Your order has been placed successfully</p>
        <p className="text-xs text-[#93959f] mt-0.5">Order ID: #SWG-{Math.random().toString(36).slice(2, 8).toUpperCase()}</p>
      </div>

      {/* Tracker */}
      <div className="bg-white rounded-2xl shadow-sm p-6 mb-6">
        <h2 className="text-base font-bold text-[#3d4152] mb-6">Order Status</h2>
        <OrderTracker currentStep={1} />
        <div className="mt-6 bg-orange-50 rounded-xl px-4 py-3 flex items-center gap-3">
          <span className="text-2xl animate-bounce">🛵</span>
          <div>
            <p className="text-sm font-bold text-[#3d4152]">Chef is preparing your order</p>
            <p className="text-xs text-[#93959f]">Estimated delivery in 25–35 minutes</p>
          </div>
        </div>
      </div>

      {/* Delivery partner */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <h2 className="text-base font-bold text-[#3d4152] mb-4">Delivery Partner</h2>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-xl">
            👤
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[#3d4152]">Ravi Kumar</p>
            <div className="flex items-center gap-1 text-xs text-[#93959f]">
              <span>⭐ 4.8</span>
              <span>•</span>
              <span>1,240 deliveries</span>
            </div>
          </div>
          <button className="flex items-center gap-1.5 border border-[#FC8019] text-[#FC8019] text-sm font-semibold px-3 py-2 rounded-lg hover:bg-orange-50 transition">
            <Phone size={14} />
            Call
          </button>
        </div>
      </div>

      {/* Delivery address */}
      <div className="bg-white rounded-2xl shadow-sm p-5 mb-6">
        <h2 className="text-base font-bold text-[#3d4152] mb-3">Delivery Address</h2>
        <div className="flex items-start gap-3">
          <MapPin size={18} className="text-[#FC8019] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-[#3d4152] text-sm">Home</p>
            <p className="text-xs text-[#93959f] mt-0.5 leading-relaxed">
              123, 5th Cross, Indiranagar<br />
              Bengaluru, Karnataka — 560038
            </p>
          </div>
        </div>
      </div>

      {/* CTA */}
      <Link
        href="/"
        className="block w-full text-center bg-[#FC8019] text-white py-3.5 rounded-xl font-bold hover:bg-orange-600 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
