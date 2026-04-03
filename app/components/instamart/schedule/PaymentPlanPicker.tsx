"use client";

import { Check } from "lucide-react";
import { ScheduleCartItem } from "./ScheduleItemPicker";

interface Props {
  cart: ScheduleCartItem[];
  days: string[];
  selectedPlan: "per_day" | "at_once";
  selectedAddress: string;
  onChange: (plan: "per_day" | "at_once") => void;
  onAddressChange: (address: string) => void;
}

const ADDRESSES = [
  { id: "tapmi", label: "TAPMI", line: "T.A. Pai Management Institute, Manipal — 576104" },
  { id: "nih",   label: "NIH",   line: "Nitte Institute of Health Sciences, Manipal — 576104" },
];

export default function PaymentPlanPicker({
  cart, days, selectedPlan, selectedAddress, onChange, onAddressChange,
}: Props) {
  const perDelivery    = cart.reduce((s, i) => s + i.price * i.quantity, 0);
  const deliveries     = days.length;
  const weeklyFull     = perDelivery * deliveries;
  const weeklyDiscount = Math.round(weeklyFull * 0.05);
  const weeklyTotal    = weeklyFull - weeklyDiscount;

  const plans = [
    {
      id: "per_day" as const,
      title: "Per Delivery",
      price: perDelivery,
      unit: "/delivery",
      badge: null,
      perks: ["Charged on delivery day only", "Cancel anytime"],
    },
    {
      id: "at_once" as const,
      title: "Weekly",
      price: weeklyTotal,
      unit: "/week",
      badge: "5% off",
      perks: [`Save ₹${weeklyDiscount}`, "One payment"],
    },
  ];

  return (
    <div className="space-y-3">

      <p className="text-xs text-[#93959f]">
        {deliveries} deliver{deliveries === 1 ? "y" : "ies"}/week · ₹{perDelivery} per delivery
      </p>

      {/* Plan cards */}
      <div className="grid grid-cols-2 gap-2.5">
        {plans.map((plan) => {
          const isActive = selectedPlan === plan.id;
          return (
            <button
              key={plan.id}
              onClick={() => onChange(plan.id)}
              className={`flex flex-col items-start p-3 rounded-xl border-2 text-left transition-all ${
                isActive ? "border-[#0c831f] bg-white" : "border-gray-200 bg-white hover:border-gray-300"
              }`}
            >
              {/* Top row: radio + badge */}
              <div className="flex items-center justify-between w-full mb-2">
                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                  isActive ? "border-[#0c831f]" : "border-gray-300"
                }`}>
                  {isActive && <span className="w-2 h-2 rounded-full bg-[#0c831f]" />}
                </div>
                {plan.badge && (
                  <span className="text-[9px] font-black bg-yellow-400 text-[#3d4152] px-1.5 py-0.5 rounded-full leading-none">
                    {plan.badge}
                  </span>
                )}
              </div>

              {/* Title */}
              <p className={`text-[11px] font-bold leading-none mb-1.5 ${isActive ? "text-[#0c831f]" : "text-[#3d4152]"}`}>
                {plan.title}
              </p>

              {/* Price */}
              <div className="flex items-baseline gap-0.5 mb-2">
                <span className={`text-2xl font-black leading-none ${isActive ? "text-[#0c831f]" : "text-[#3d4152]"}`}>
                  ₹{plan.price}
                </span>
                <span className="text-[10px] text-[#93959f]">{plan.unit}</span>
              </div>

              {/* Perks */}
              <div className="space-y-1">
                {plan.perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-1">
                    <Check size={9} className={isActive ? "text-[#0c831f]" : "text-gray-400"} />
                    <span className="text-[10px] text-[#93959f] leading-tight">{perk}</span>
                  </div>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {/* Deliver to */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <p className="text-[10px] font-bold text-[#93959f] uppercase tracking-wider px-3 py-2 border-b border-gray-100">
          Deliver to
        </p>
        {ADDRESSES.map((addr, i) => {
          const isSelected = selectedAddress === addr.id;
          return (
            <button
              key={addr.id}
              onClick={() => onAddressChange(addr.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2.5 text-left transition-colors
                ${i < ADDRESSES.length - 1 ? "border-b border-gray-100" : ""}
                ${isSelected ? "bg-green-50" : "hover:bg-gray-50"}`}
            >
              <div className={`w-3.5 h-3.5 rounded-full border-2 shrink-0 flex items-center justify-center ${
                isSelected ? "border-[#0c831f]" : "border-gray-300"
              }`}>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-[#0c831f]" />}
              </div>
              <div className="min-w-0">
                <p className={`text-xs font-bold leading-none ${isSelected ? "text-[#0c831f]" : "text-[#3d4152]"}`}>
                  {addr.label}
                </p>
                <p className="text-[10px] text-[#93959f] mt-0.5 leading-snug">{addr.line}</p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Summary strip */}
      <div className="rounded-xl bg-[#0c831f] px-4 py-3 flex items-center justify-between">
        <div>
          <p className="text-white font-bold text-xs">
            {cart.reduce((s, i) => s + i.quantity, 0)} units · {deliveries} days/week
          </p>
          <p className="text-green-200 text-[10px] mt-0.5">
            {selectedPlan === "per_day" ? `₹${perDelivery} per delivery` : `₹${weeklyTotal} upfront`}
          </p>
        </div>
        <div className="text-right">
          <p className="text-white font-black text-lg leading-none">
            ₹{selectedPlan === "per_day" ? perDelivery : weeklyTotal}
          </p>
          <p className="text-green-300 text-[10px]">
            {selectedPlan === "per_day" ? "per delivery" : "per week"}
          </p>
        </div>
      </div>

    </div>
  );
}
