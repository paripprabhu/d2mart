"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Check, Lock, Unlock } from "lucide-react";
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
  const [commitTier, setCommitTier] = useState(0);

  const tierDiscounts = [0, 25, 50, 100];
  const COMMIT_TIERS = [
    { label: "On-Demand", duration: "No commitment", discount: 0, color: "text-[#93959f]", borderActive: "border-[#0c831f]" },
    { label: "1 Week",    duration: "7 days",         discount: 25,  color: "text-amber-500",   borderActive: "border-amber-400" },
    { label: "2 Weeks",   duration: "14 days",        discount: 50,  color: "text-[#0c831f]",   borderActive: "border-[#0c831f]" },
    { label: "1 Month",   duration: "30 days",        discount: 100, color: "text-violet-500",  borderActive: "border-violet-400" },
  ];
  const RUPEE_STORE = [
    { status: "Locked",          items: "Schedule for 1+ week to unlock access to ₹1 deals", examples: "",                                                                      borderCls: "border-gray-200",   bgCls: "bg-gray-50",    labelCls: "text-[#93959f]" },
    { status: "12 Items Unlocked",  items: "12 selected high-demand items available at ₹1 each", examples: "e.g. salt, sugar, tea bags, bread — items we forecast you'll need",  borderCls: "border-amber-300",  bgCls: "bg-amber-50",   labelCls: "text-amber-600" },
    { status: "28 Items Unlocked",  items: "28 selected high-demand items available at ₹1 each", examples: "e.g. grains, oils, dairy basics, hygiene essentials",                borderCls: "border-green-300",  bgCls: "bg-green-50",   labelCls: "text-[#0c831f]" },
    { status: "50+ Items Unlocked", items: "50+ selected high-demand items available at ₹1 each", examples: "Our broadest forecast list — updated based on ordering patterns",   borderCls: "border-violet-300", bgCls: "bg-violet-50",  labelCls: "text-violet-600" },
  ];

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
          <div className="space-y-4">

            {/* ── Commitment Tier Cards ── */}
            <div className="bg-white rounded-2xl shadow-sm p-4">
              <p className="text-xs font-bold text-[#93959f] uppercase tracking-wider mb-3">Schedule Commitment</p>
              <div className="grid grid-cols-2 gap-2.5">
                {COMMIT_TIERS.map((tier, i) => {
                  const isActive = commitTier === i;
                  return (
                    <button
                      key={i}
                      onClick={() => setCommitTier(i)}
                      className={`flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all ${
                        isActive ? `${tier.borderActive} bg-white` : "border-gray-200 bg-white hover:border-gray-300"
                      }`}
                    >
                      <div className="flex items-center justify-between w-full mb-1.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          isActive ? tier.borderActive : "border-gray-300"
                        }`}>
                          {isActive && <span className="w-2 h-2 rounded-full bg-current" />}
                        </div>
                        {tier.discount > 0 && (
                          <span className="text-[9px] font-black bg-amber-400 text-amber-900 px-1.5 py-0.5 rounded-full leading-none">
                            ₹{tier.discount} off
                          </span>
                        )}
                      </div>
                      <p className={`text-[11px] font-black leading-none mb-0.5 ${isActive ? tier.color : "text-[#3d4152]"}`}>
                        {tier.label}
                      </p>
                      <p className="text-[10px] text-[#93959f]">{tier.duration}</p>
                      {i > 0 && (
                        <p className={`text-[9px] mt-1 font-semibold ${isActive ? tier.color : "text-[#93959f]"}`}>
                          + {[0, 12, 28, 50][i]}{i === 3 ? "+" : ""} items at ₹1
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
              {commitTier > 0 && (
                <div className="mt-3 flex items-center gap-1.5 bg-green-50 border border-green-200 rounded-xl px-3 py-2">
                  <Check size={13} className="text-[#0c831f] shrink-0" />
                  <p className="text-xs font-bold text-[#0c831f]">₹{tierDiscounts[commitTier]} off applied to this schedule</p>
                </div>
              )}
            </div>

            {/* ── Payment Plan ── */}
            <PaymentPlanPicker
              cart={cart}
              days={days}
              selectedPlan={plan}
              selectedAddress={address}
              onChange={setPlan}
              onAddressChange={setAddress}
            />

            {/* ── ₹1 Rupee Store Access Panel ── */}
            {(() => {
              const cfg = RUPEE_STORE[commitTier];
              return (
                <div className={`rounded-2xl border-2 ${cfg.borderCls} ${cfg.bgCls} p-4 text-center transition-all`}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {commitTier === 0
                      ? <Lock size={16} className="text-[#93959f]" />
                      : <Unlock size={16} className={cfg.labelCls} />
                    }
                    <p className={`text-xs font-black uppercase tracking-wider ${cfg.labelCls}`}>₹1 Deals · {cfg.status}</p>
                  </div>
                  <p className={`text-sm font-bold ${cfg.labelCls}`}>{cfg.items}</p>
                  {cfg.examples && (
                    <p className="text-[11px] text-[#93959f] mt-1 italic">{cfg.examples}</p>
                  )}
                  {commitTier === 0 && (
                    <p className="text-[11px] text-[#93959f] mt-2">Choose 1 Week or longer to unlock access to selected high-demand items at ₹1 — curated based on what schedulers in Manipal order most</p>
                  )}
                </div>
              );
            })()}

          </div>
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
