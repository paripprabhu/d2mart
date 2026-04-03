"use client";

import { CheckCircle, ChefHat, Bike, Home } from "lucide-react";

const STEPS = [
  { label: "Order Placed", sublabel: "We received your order", icon: CheckCircle },
  { label: "Preparing", sublabel: "Chef is cooking your food", icon: ChefHat },
  { label: "On the Way", sublabel: "Delivery partner is coming", icon: Bike },
  { label: "Delivered", sublabel: "Enjoy your meal!", icon: Home },
];

export default function OrderTracker({ currentStep = 1 }: { currentStep?: number }) {
  return (
    <div className="w-full">
      {/* Desktop: horizontal stepper */}
      <div className="hidden md:flex items-center">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={step.label} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center">
                <div
                  className={`w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all ${
                    done
                      ? "bg-[#FC8019] border-[#FC8019] text-white"
                      : active
                      ? "bg-white border-[#FC8019] text-[#FC8019] animate-pulse"
                      : "bg-white border-gray-200 text-gray-300"
                  }`}
                >
                  <Icon size={24} />
                </div>
                <p className={`mt-2 text-xs font-bold text-center ${active ? "text-[#FC8019]" : done ? "text-[#3d4152]" : "text-[#93959f]"}`}>
                  {step.label}
                </p>
                <p className="text-xs text-[#93959f] text-center max-w-[90px] mt-0.5">
                  {step.sublabel}
                </p>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`flex-1 h-1 mx-2 rounded-full transition-all ${i < currentStep ? "bg-[#FC8019]" : "bg-gray-200"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile: vertical stepper */}
      <div className="md:hidden space-y-4">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const done = i < currentStep;
          const active = i === currentStep;
          return (
            <div key={step.label} className="flex items-start gap-4">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    done
                      ? "bg-[#FC8019] border-[#FC8019] text-white"
                      : active
                      ? "bg-white border-[#FC8019] text-[#FC8019] animate-pulse"
                      : "bg-white border-gray-200 text-gray-300"
                  }`}
                >
                  <Icon size={18} />
                </div>
                {i < STEPS.length - 1 && (
                  <div className={`w-0.5 h-8 mt-1 ${i < currentStep ? "bg-[#FC8019]" : "bg-gray-200"}`} />
                )}
              </div>
              <div className="pt-1.5">
                <p className={`text-sm font-bold ${active ? "text-[#FC8019]" : done ? "text-[#3d4152]" : "text-[#93959f]"}`}>
                  {step.label}
                </p>
                <p className="text-xs text-[#93959f]">{step.sublabel}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
