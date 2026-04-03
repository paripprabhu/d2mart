"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MapPin, Phone, Package, Zap } from "lucide-react";
import { useGroceryCart } from "@/app/context/GroceryCartContext";
import { Suspense } from "react";

const STEPS = [
  { label: "Order Placed",   icon: "✅", state: "done"   },
  { label: "Picking items",  icon: "📦", state: "done"   },
  { label: "On the way",     icon: "🛵", state: "active" },
  { label: "Delivered",      icon: "🏠", state: "upcoming" },
];

const PAYMENT_LABELS: Record<string, string> = {
  upi: "UPI / GPay",
  card: "Credit / Debit Card",
  cod: "Cash on Delivery",
};

function OrderConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { clearCart } = useGroceryCart();
  const clearedRef = useRef(false);

  const grandTotal = searchParams.get("total") || "0";
  const itemCount  = searchParams.get("items") || "0";
  const payment    = searchParams.get("payment") || "upi";

  // Generate stable order ID for this session
  const [orderId] = useState(
    () => "D2-" + Math.random().toString(36).slice(2, 8).toUpperCase()
  );

  // Clear cart exactly once on mount
  useEffect(() => {
    if (!clearedRef.current) {
      clearedRef.current = true;
      clearCart();
    }
  }, [clearCart]);

  return (
    <div className="min-h-screen bg-[#f0f0f5] pb-10">
      {/* Green top bar */}
      <div className="bg-[#0c831f] text-white px-4 py-3.5 flex items-center gap-3">
        <Zap size={18} className="fill-white" />
        <span className="font-bold">D2mart — Order Confirmed</span>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-4">

        {/* ── Hero confirm card ── */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">🎉</span>
          </div>
          <h1 className="text-xl font-black text-[#3d4152]">Order Confirmed!</h1>
          <p className="text-[#93959f] text-sm mt-1">
            {itemCount} item{Number(itemCount) > 1 ? "s" : ""} · ₹{grandTotal} paid via{" "}
            {PAYMENT_LABELS[payment] ?? payment}
          </p>
          <p className="text-xs text-[#93959f] font-mono mt-1">Order ID: {orderId}</p>

          {/* ETA pill */}
          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
            <Zap size={14} className="text-[#0c831f] fill-[#0c831f]" />
            <span className="text-sm font-bold text-[#0c831f]">
              Arriving in ~8 minutes
            </span>
          </div>
        </div>

        {/* ── Live tracker ── */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-[#3d4152] mb-5 flex items-center gap-2">
            <Package size={15} className="text-[#0c831f]" />
            Live Order Tracking
          </h2>

          {/* Stepper */}
          <div className="flex items-start">
            {STEPS.map((step, i) => (
              <div key={step.label} className="flex items-start flex-1 last:flex-none">
                <div className="flex flex-col items-center w-full">
                  <div
                    className={`w-11 h-11 rounded-full flex items-center justify-center text-xl border-2 transition-all ${
                      step.state === "active"
                        ? "border-[#0c831f] bg-green-50 animate-pulse shadow-md shadow-green-200"
                        : step.state === "done"
                        ? "border-[#0c831f] bg-[#0c831f]"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`text-xs font-semibold text-center mt-1.5 leading-tight px-1 ${
                      step.state === "active"
                        ? "text-[#0c831f]"
                        : step.state === "done"
                        ? "text-[#3d4152]"
                        : "text-[#93959f]"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-none w-full h-0.5 mt-5 rounded-full ${
                      step.state === "done" ? "bg-[#0c831f]" : "bg-gray-200"
                    }`}
                    style={{ maxWidth: "calc(100% - 44px)", margin: "20px -8px 0" }}
                  />
                )}
              </div>
            ))}
          </div>

          {/* Active step callout */}
          <div className="mt-5 bg-green-50 border border-green-100 rounded-xl px-4 py-3 flex items-center gap-3">
            <span className="text-2xl animate-bounce">🛵</span>
            <div>
              <p className="text-sm font-bold text-[#3d4152]">
                Delivery partner is on the way!
              </p>
              <p className="text-xs text-[#93959f]">
                Estimated arrival in 6–10 minutes
              </p>
            </div>
          </div>
        </div>

        {/* ── Delivery partner ── */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-[#3d4152] text-sm mb-4">Delivery Partner</h2>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-xl shrink-0">
              👤
            </div>
            <div className="flex-1">
              <p className="font-semibold text-[#3d4152] text-sm">Rajesh Kumar</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-[#93959f]">⭐ 4.9</span>
                <span className="text-xs text-[#93959f]">·</span>
                <span className="text-xs text-[#93959f]">2,340 deliveries</span>
              </div>
            </div>
            <button className="flex items-center gap-1.5 border-2 border-[#0c831f] text-[#0c831f] text-sm font-bold px-3 py-1.5 rounded-xl hover:bg-green-50 active:bg-green-100 transition">
              <Phone size={13} />
              Call
            </button>
          </div>
        </div>

        {/* ── Delivery address ── */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-[#3d4152] text-sm mb-3">Delivering to</h2>
          <div className="flex items-start gap-3">
            <MapPin size={16} className="text-[#0c831f] shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-[#3d4152] text-sm">Home</p>
              <p className="text-xs text-[#93959f] mt-0.5 leading-relaxed">
                T.A. Pai Management Institute, Manipal<br />
                Udupi District, Karnataka — 576104
              </p>
            </div>
          </div>
        </div>

        {/* ── Actions ── */}
        <Link
          href="/instamart"
          className="block w-full text-center bg-[#0c831f] text-white py-4 rounded-xl font-black text-base hover:bg-green-800 active:scale-[0.98] transition-all"
        >
          Continue Shopping
        </Link>

        <button
          onClick={() => router.push("/instamart")}
          className="block w-full text-center text-sm text-[#93959f] hover:text-[#3d4152] py-2 transition"
        >
          Back to D2mart home
        </button>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f0f0f5] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-3">🛵</div>
          <p className="text-[#0c831f] font-bold">Placing your order…</p>
        </div>
      </div>
    }>
      <OrderConfirmation />
    </Suspense>
  );
}
