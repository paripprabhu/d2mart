"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Check } from "lucide-react";
import { GroceryProduct } from "@/app/lib/types";
import ScheduleItemPicker, { ScheduleCartItem } from "@/app/components/instamart/schedule/ScheduleItemPicker";
import DayPicker from "@/app/components/instamart/schedule/DayPicker";
import TimeSlotPicker, { TIME_SLOTS } from "@/app/components/instamart/schedule/TimeSlotPicker";
import PaymentPlanPicker from "@/app/components/instamart/schedule/PaymentPlanPicker";

const STEPS = [
  { num: 1, label: "Items",   icon: "🛒" },
  { num: 2, label: "Days",    icon: "📅" },
  { num: 3, label: "Time",    icon: "⏰" },
  { num: 4, label: "Payment", icon: "💳" },
];

export default function SchedulePage() {
  const router = useRouter();

  const [step, setStep]             = useState(1);
  const [products, setProducts]     = useState<GroceryProduct[]>([]);
  const [cart, setCart]             = useState<ScheduleCartItem[]>([]);
  const [days, setDays]             = useState<string[]>([]);
  const [timeSlot, setTimeSlot]     = useState("morning");
  const [plan, setPlan]             = useState<"per_day" | "at_once">("per_day");
  const [address, setAddress]       = useState("tapmi");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/grocery/products")
      .then((r) => r.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  const totalItems    = cart.reduce((s, i) => s + i.quantity, 0);
  const pricePerDelivery = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const atOnceTotal   = Math.round(pricePerDelivery * days.length * 0.95);
  const finalTotal    = plan === "at_once" ? atOnceTotal : pricePerDelivery * days.length;

  const canNext = () => {
    if (step === 1) return cart.length > 0;
    if (step === 2) return days.length > 0;
    if (step === 3) return !!timeSlot;
    return true;
  };

  async function handleConfirm() {
    setSubmitting(true);
    const slotObj = TIME_SLOTS.find((s) => s.id === timeSlot);
    try {
      const res = await fetch("/api/grocery/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: cart,
          days,
          time_slot: timeSlot,
          time_slot_label: slotObj ? `${slotObj.label} · ${slotObj.time}` : timeSlot,
          payment_type: plan,
          price_per_delivery: pricePerDelivery,
          total_price: plan === "at_once" ? atOnceTotal : pricePerDelivery * days.length,
          delivery_address: address === "tapmi"
            ? "T.A. Pai Management Institute, Manipal — 576104"
            : "Nitte Institute of Health Sciences, Manipal — 576104",
        }),
      });
      const data = await res.json();
      if (data.ok) {
        router.push(
          `/instamart/schedule/confirmed?id=${data.id}&plan=${plan}&total=${finalTotal}&days=${days.length}&items=${totalItems}&slot=${encodeURIComponent(slotObj?.time ?? timeSlot)}&address=${address}`
        );
      }
    } catch {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f0f5]">
      {/* Top bar */}
      <div className="bg-white shadow-sm sticky top-16 z-30">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center gap-3">
          <Link href="/instamart" className="p-1.5 rounded-full hover:bg-gray-100 transition">
            <ArrowLeft size={18} className="text-[#3d4152]" />
          </Link>
          <div className="flex-1">
            <h1 className="font-bold text-[#3d4152] leading-none">Schedule Delivery</h1>
            <p className="text-xs text-[#93959f] mt-0.5">Set it once, delivered every week</p>
          </div>
        </div>

        {/* Step progress bar */}
        <div className="max-w-2xl mx-auto px-4 pb-3">
          <div className="flex items-center gap-1">
            {STEPS.map((s, idx) => {
              const done   = step > s.num;
              const active = step === s.num;
              return (
                <div key={s.num} className="flex items-center flex-1 last:flex-none">
                  <button
                    onClick={() => done && setStep(s.num)}
                    className={`flex items-center gap-1.5 shrink-0 px-2.5 py-1.5 rounded-full text-xs font-bold transition ${
                      active  ? "bg-[#0c831f] text-white"
                      : done  ? "bg-green-100 text-[#0c831f] cursor-pointer hover:bg-green-200"
                              : "bg-gray-100 text-[#93959f] cursor-default"
                    }`}
                  >
                    {done ? <Check size={11} /> : <span>{s.icon}</span>}
                    <span className="hidden sm:inline">{s.label}</span>
                    <span className="sm:hidden">{s.num}</span>
                  </button>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 rounded-full ${done ? "bg-[#0c831f]" : "bg-gray-200"}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Step content */}
      <div className="max-w-2xl mx-auto px-4 py-5 pb-32">

        {/* Cart summary pill — always visible when items are added */}
        {cart.length > 0 && step === 1 && (
          <div className="mb-4 bg-green-50 border border-green-200 rounded-xl px-4 py-2.5 flex items-center gap-2 text-sm">
            <span className="text-[#0c831f] font-bold">{totalItems} item{totalItems > 1 ? "s" : ""} added</span>
            <span className="text-green-300">·</span>
            <span className="text-[#0c831f] font-bold">₹{pricePerDelivery} per delivery</span>
          </div>
        )}

        {step === 1 && (
          <ScheduleItemPicker products={products} cart={cart} onUpdate={setCart} />
        )}
        {step === 2 && (
          <DayPicker selected={days} onChange={setDays} />
        )}
        {step === 3 && (
          <TimeSlotPicker selected={timeSlot} onChange={setTimeSlot} />
        )}
        {step === 4 && (
          <PaymentPlanPicker
            cart={cart}
            days={days}
            selectedPlan={plan}
            selectedAddress={address}
            onChange={setPlan}
            onAddressChange={setAddress}
          />
        )}
      </div>

      {/* Fixed bottom navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 pt-4 pb-[max(1rem,env(safe-area-inset-bottom))] z-40">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="px-5 py-3 rounded-xl border-2 border-gray-200 font-bold text-sm text-[#3d4152] hover:border-gray-300 transition"
            >
              Back
            </button>
          )}

          {step < 4 ? (
            <button
              onClick={() => setStep(step + 1)}
              disabled={!canNext()}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0c831f] text-white py-3.5 rounded-xl font-black text-sm hover:bg-green-800 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {step === 1 && cart.length > 0 && (
                <span className="bg-green-700 rounded-lg px-2 py-0.5 text-xs mr-1">
                  {totalItems} item{totalItems > 1 ? "s" : ""}
                </span>
              )}
              Continue to{" "}
              {STEPS[step]?.label}
              <ChevronRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleConfirm}
              disabled={submitting || cart.length === 0 || days.length === 0}
              className="flex-1 flex items-center justify-center gap-2 bg-[#0c831f] text-white py-3.5 rounded-xl font-black text-sm hover:bg-green-800 active:scale-[0.98] transition-all disabled:opacity-50"
            >
              {submitting ? (
                <>
                  <span className="animate-spin">⏳</span> Confirming…
                </>
              ) : (
                <>
                  ✅ Confirm Schedule · ₹{plan === "at_once" ? atOnceTotal : pricePerDelivery}/{plan === "at_once" ? "week" : "delivery"}
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
