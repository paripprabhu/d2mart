"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Plus, Minus, Trash2, MapPin, ChevronRight, Zap, Tag, CalendarDays } from "lucide-react";
import { useGroceryCart } from "@/app/context/GroceryCartContext";

const ADDRESSES = [
  { id: 1, label: "TAPMI", line: "T.A. Pai Management Institute, Manipal", city: "Udupi District, Karnataka — 576104" },
  { id: 2, label: "NIH",   line: "Nitte Institute of Health Sciences, Manipal", city: "Udupi District, Karnataka — 576104" },
];

const PAYMENT_OPTIONS = [
  { id: "upi", label: "UPI / GPay", icon: "📱" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "cod", label: "Cash on Delivery", icon: "💵" },
];

export default function CartPage() {
  const { items, itemCount, total, updateQuantity, clearCart } = useGroceryCart();
  const router = useRouter();

  const [selectedAddress, setSelectedAddress] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState("upi");
  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  const hour = new Date().getHours();
  const isLullHour = hour >= 5 && hour <= 17; // 5AM–5PM = lull window
  const freeDeliveryThreshold = isLullHour ? 149 : 249;
  const minOrderThreshold = isLullHour ? 179 : 199;

  const DELIVERY_FEE = total >= 199 ? 0 : 25;
  const DISCOUNT = appliedCoupon === "D2MART10" ? Math.round(total * 0.1) : 0;
  const TAXES = Math.round((total - DISCOUNT) * 0.05);
  const GRAND_TOTAL = total - DISCOUNT + DELIVERY_FEE + TAXES;

  function applyCode() {
    if (coupon.trim().toUpperCase() === "D2MART10") {
      setAppliedCoupon("D2MART10");
    }
  }

  function handlePlaceOrder() {
    setPlacingOrder(true);
    // Simulate brief processing then navigate to confirmation
    setTimeout(() => {
      router.push(
        `/instamart/order?total=${GRAND_TOTAL}&items=${itemCount}&payment=${selectedPayment}`
      );
    }, 1200);
  }

  if (itemCount === 0) {
    return (
      <div className="min-h-screen bg-[#f0f0f5] flex flex-col items-center justify-center px-4 text-center">
        <span className="text-6xl mb-4">🛒</span>
        <p className="text-xl font-bold text-[#3d4152]">Your cart is empty</p>
        <p className="text-sm text-[#93959f] mt-1 mb-6">Add items to get started</p>
        <Link
          href="/instamart"
          className="bg-[#0c831f] text-white px-8 py-3 rounded-xl font-bold hover:bg-green-800 transition"
        >
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f0f0f5]">
      {/* Header bar */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/instamart" className="p-1.5 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={18} className="text-[#3d4152]" />
          </Link>
          <div>
            <h1 className="font-bold text-[#3d4152] leading-none">Your Cart</h1>
            <p className="text-xs text-[#93959f] mt-0.5">{itemCount} item{itemCount > 1 ? "s" : ""} · D2mart</p>
          </div>
          <button
            onClick={clearCart}
            className="ml-auto flex items-center gap-1 text-xs text-red-400 hover:text-red-600 transition px-2 py-1 rounded-lg hover:bg-red-50"
          >
            <Trash2 size={13} />
            Clear
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-4 space-y-3 pb-8">

        {/* ── Delivery promise ── */}
        <div className="bg-green-50 border border-green-200 rounded-2xl px-4 py-3 flex items-center gap-3">
          <Zap size={18} className="text-[#0c831f] fill-[#0c831f] shrink-0" />
          <div>
            <p className="text-sm font-bold text-[#0c831f]">Delivery in ~8 minutes</p>
            <p className="text-xs text-green-600">Your order is ready to be picked</p>
          </div>
        </div>

        {/* ── Lull-hour deal banner ── */}
        {isLullHour ? (
          <div className="bg-amber-50 border border-amber-300 rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-lg shrink-0">🕐</span>
            <div className="flex-1">
              <p className="text-sm font-black text-amber-700">Lull Hour Deal Active</p>
              <p className="text-xs text-amber-600 mt-0.5">
                Free delivery above <strong>₹{freeDeliveryThreshold}</strong> · Min order <strong>₹{minOrderThreshold}</strong>
              </p>
            </div>
            <span className="text-[10px] font-black bg-amber-400 text-amber-900 px-2 py-1 rounded-full shrink-0">5AM–5PM</span>
          </div>
        ) : (
          <div className="bg-gray-50 border border-gray-200 rounded-2xl px-4 py-3 flex items-center gap-3">
            <span className="text-lg shrink-0">🌙</span>
            <div>
              <p className="text-sm font-bold text-[#3d4152]">Peak Hours</p>
              <p className="text-xs text-[#93959f] mt-0.5">
                Free delivery above <strong>₹{freeDeliveryThreshold}</strong> · Min order ₹{minOrderThreshold}
              </p>
            </div>
          </div>
        )}

        {/* ── Cart items ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-bold text-[#3d4152] text-sm">
              Items from D2mart
            </p>
          </div>

          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 px-4 py-3.5 ${idx < items.length - 1 ? "border-b border-gray-50" : ""}`}
            >
              {/* Image */}
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={56}
                  height={56}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Name + weight */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#3d4152] truncate">{item.name}</p>
                <p className="text-xs text-[#93959f]">{item.weight}</p>
                <p className="text-sm font-bold text-[#3d4152] mt-0.5">₹{item.price}</p>
              </div>

              {/* Stepper */}
              <div className="flex items-center bg-[#0c831f] text-white rounded-xl overflow-hidden shrink-0">
                <button
                  onClick={() => updateQuantity(item.id, -1)}
                  className="px-2.5 py-2 hover:bg-green-800 transition active:bg-green-900"
                >
                  {item.quantity === 1 ? <Trash2 size={13} /> : <Minus size={13} />}
                </button>
                <span className="px-2 text-sm font-black min-w-[1.75rem] text-center">
                  {item.quantity}
                </span>
                <button
                  onClick={() => updateQuantity(item.id, 1)}
                  className="px-2.5 py-2 hover:bg-green-800 transition active:bg-green-900"
                >
                  <Plus size={13} />
                </button>
              </div>

              {/* Line total */}
              <p className="text-sm font-bold text-[#3d4152] w-14 text-right shrink-0">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}

          {/* Add more */}
          <div className="px-4 py-3 border-t border-gray-100">
            <Link
              href="/instamart"
              className="text-xs font-semibold text-[#0c831f] hover:underline flex items-center gap-1"
            >
              <Plus size={13} />
              Add more items
            </Link>
          </div>
        </div>

        {/* ── Coupon code ── */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <Tag size={15} className="text-[#0c831f]" />
            <p className="font-bold text-[#3d4152] text-sm">Apply Coupon</p>
          </div>

          {appliedCoupon ? (
            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-xl px-3 py-2.5">
              <div>
                <p className="text-sm font-bold text-[#0c831f]">🎉 {appliedCoupon} applied!</p>
                <p className="text-xs text-green-600">You save ₹{DISCOUNT} on this order</p>
              </div>
              <button
                onClick={() => { setAppliedCoupon(null); setCoupon(""); }}
                className="text-xs text-red-400 hover:text-red-600 font-semibold"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value.toUpperCase())}
                placeholder="Enter code  (try D2MART10)"
                className="flex-1 bg-[#f0f0f5] rounded-xl px-3 py-2.5 text-sm text-[#3d4152] placeholder-[#93959f] focus:outline-none focus:ring-2 focus:ring-[#0c831f]/30"
              />
              <button
                onClick={applyCode}
                className="bg-[#0c831f] text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-green-800 transition"
              >
                Apply
              </button>
            </div>
          )}
        </div>

        {/* ── Delivery address ── */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-4">
          <div className="flex items-center gap-2 mb-3">
            <MapPin size={15} className="text-[#0c831f]" />
            <p className="font-bold text-[#3d4152] text-sm">Delivery Address</p>
          </div>
          <div className="space-y-2">
            {ADDRESSES.map((addr) => (
              <button
                key={addr.id}
                onClick={() => setSelectedAddress(addr.id)}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border-2 transition text-left ${
                  selectedAddress === addr.id
                    ? "border-[#0c831f] bg-green-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 flex items-center justify-center ${
                  selectedAddress === addr.id ? "border-[#0c831f]" : "border-gray-300"
                }`}>
                  {selectedAddress === addr.id && (
                    <div className="w-2 h-2 rounded-full bg-[#0c831f]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-bold text-[#3d4152]">{addr.label}</p>
                  <p className="text-xs text-[#93959f] mt-0.5">{addr.line}</p>
                  <p className="text-xs text-[#93959f]">{addr.city}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ── Payment method ── */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-4">
          <p className="font-bold text-[#3d4152] text-sm mb-3">Payment Method</p>
          <div className="space-y-2">
            {PAYMENT_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setSelectedPayment(opt.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border-2 transition ${
                  selectedPayment === opt.id
                    ? "border-[#0c831f] bg-green-50"
                    : "border-gray-100 hover:border-gray-200"
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                  selectedPayment === opt.id ? "border-[#0c831f]" : "border-gray-300"
                }`}>
                  {selectedPayment === opt.id && (
                    <div className="w-2 h-2 rounded-full bg-[#0c831f]" />
                  )}
                </div>
                <span className="text-lg">{opt.icon}</span>
                <span className="text-sm font-semibold text-[#3d4152]">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Bill details ── */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-4">
          <p className="font-bold text-[#3d4152] text-sm mb-3">Bill Details</p>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-[#93959f]">
              <span>Item total</span>
              <span>₹{total}</span>
            </div>
            {DISCOUNT > 0 && (
              <div className="flex justify-between text-[#0c831f] font-semibold">
                <span>Coupon discount (D2MART10)</span>
                <span>− ₹{DISCOUNT}</span>
              </div>
            )}
            <div className="flex justify-between text-[#93959f]">
              <span>Delivery fee</span>
              <span className={DELIVERY_FEE === 0 ? "text-[#0c831f] font-semibold" : ""}>
                {DELIVERY_FEE === 0 ? "FREE" : `₹${DELIVERY_FEE}`}
              </span>
            </div>
            {DELIVERY_FEE === 0 && (
              <p className="text-xs text-[#0c831f]">🎉 Free delivery on orders above ₹{freeDeliveryThreshold}</p>
            )}
            <div className="flex justify-between text-[#93959f]">
              <span>GST & charges</span>
              <span>₹{TAXES}</span>
            </div>
            <div className="flex justify-between font-black text-[#3d4152] text-base pt-2 border-t border-gray-100">
              <span>To Pay</span>
              <span>₹{GRAND_TOTAL}</span>
            </div>
          </div>
        </div>

        {/* ── Schedule upsell ── */}
        <Link
          href="/instamart/schedule"
          className="flex items-center gap-4 bg-white rounded-2xl shadow-sm border-2 border-dashed border-indigo-200 px-4 py-4 hover:border-indigo-400 hover:bg-indigo-50 transition-all group active:scale-[0.98]"
        >
          <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-indigo-200 transition-colors">
            <CalendarDays size={20} className="text-indigo-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[#3d4152]">Order these every week?</p>
            <p className="text-xs text-[#93959f] mt-0.5">
              Set up a recurring schedule — no need to reorder manually.
            </p>
          </div>
          <ChevronRight size={16} className="text-indigo-400 shrink-0" />
        </Link>

        {/* ── Place Order CTA ── */}
        <div className="bg-white rounded-2xl shadow-sm px-4 py-4">
          {/* Savings callout */}
          {DISCOUNT > 0 && (
            <div className="bg-green-50 rounded-xl px-3 py-2 mb-3 text-xs text-[#0c831f] font-semibold text-center">
              🎉 You&apos;re saving ₹{DISCOUNT} on this order!
            </div>
          )}

          <button
            onClick={handlePlaceOrder}
            disabled={placingOrder}
            className="w-full flex items-center justify-between bg-[#0c831f] text-white py-4 px-5 rounded-xl font-black text-base hover:bg-green-800 active:scale-[0.98] transition-all disabled:opacity-70"
          >
            <div className="text-left">
              <p className="leading-none">
                {placingOrder ? "Placing Order…" : "Place Order"}
              </p>
              <p className="text-xs text-green-200 mt-0.5 font-normal">
                {PAYMENT_OPTIONS.find((p) => p.id === selectedPayment)?.label}
              </p>
            </div>
            <div className="text-right">
              <p className="leading-none">₹{GRAND_TOTAL}</p>
              {!placingOrder && <ChevronRight size={16} className="inline" />}
              {placingOrder && (
                <span className="inline-block animate-spin ml-1">⏳</span>
              )}
            </div>
          </button>

          <p className="text-xs text-[#93959f] text-center mt-3">
            ⚡ Estimated delivery in <strong className="text-[#0c831f]">~8 minutes</strong>
          </p>
        </div>

      </div>
    </div>
  );
}
