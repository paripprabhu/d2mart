"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Calendar, MapPin, Clock, CreditCard, Zap } from "lucide-react";

const DAY_ORDER = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

function getNextDeliveryDates(dayKeys: string[], count = 4): string[] {
  const today = new Date();
  const dayIndexMap: Record<string, number> = {
    Sun:0, Mon:1, Tue:2, Wed:3, Thu:4, Fri:5, Sat:6,
  };
  const results: string[] = [];
  let d = new Date(today);
  let attempts = 0;

  while (results.length < count && attempts < 60) {
    attempts++;
    d = new Date(d.getTime() + 24 * 60 * 60 * 1000);
    const dayName = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][d.getDay()];
    if (dayKeys.includes(dayName)) {
      results.push(
        d.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "short" })
      );
    }
  }
  return results;
}

function ConfirmedContent() {
  const params     = useSearchParams();
  const id         = params.get("id")    ?? "SCH-XXXXXX";
  const plan       = params.get("plan")  ?? "per_day";
  const total      = params.get("total") ?? "0";
  const daysCount  = Number(params.get("days") ?? 1);
  const items      = params.get("items") ?? "0";
  const slot       = params.get("slot")  ?? "";
  const addrKey    = params.get("address") ?? "tapmi";

  // Reconstruct selected days from daysCount for upcoming dates
  // We don't know which exact days from the URL, so we approximate with the most common preset
  // In a real app you'd pass the actual day list. For demo, show daysCount placeholder dates.
  const placeholderDays = DAY_ORDER.slice(0, daysCount);
  const upcomingDates   = getNextDeliveryDates(placeholderDays, 4);

  const addressLabel = addrKey === "tapmi"
    ? "T.A. Pai Management Institute, Manipal"
    : "Nitte Institute of Health Sciences, Manipal";

  return (
    <div className="min-h-screen bg-[#f0f0f5] pb-10">
      {/* Green header */}
      <div className="bg-[#0c831f] text-white px-4 py-3.5 flex items-center gap-2">
        <Zap size={18} className="fill-white" />
        <span className="font-bold">D2mart — Schedule Confirmed</span>
      </div>

      <div className="max-w-lg mx-auto px-4 pt-6 space-y-4">

        {/* Hero card */}
        <div className="bg-white rounded-2xl shadow-sm p-6 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">📅</span>
          </div>
          <h1 className="text-xl font-black text-[#3d4152]">Schedule Confirmed!</h1>
          <p className="text-[#93959f] text-sm mt-1">
            Your weekly groceries are all set
          </p>
          <p className="text-xs font-mono text-[#93959f] mt-1">Schedule ID: {id}</p>

          <div className="mt-4 inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-full px-4 py-2">
            <Zap size={13} className="text-[#0c831f] fill-[#0c831f]" />
            <span className="text-sm font-bold text-[#0c831f]">
              Starts from next scheduled day
            </span>
          </div>
        </div>

        {/* Schedule details */}
        <div className="bg-white rounded-2xl shadow-sm p-5 space-y-4">
          <h2 className="font-bold text-[#3d4152] text-sm">Schedule Details</h2>

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Calendar size={13} className="text-[#0c831f]" />
                <p className="text-xs font-bold text-[#93959f] uppercase tracking-wide">Frequency</p>
              </div>
              <p className="text-sm font-bold text-[#3d4152]">
                {daysCount} day{daysCount !== 1 ? "s" : ""} / week
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Clock size={13} className="text-[#0c831f]" />
                <p className="text-xs font-bold text-[#93959f] uppercase tracking-wide">Time Slot</p>
              </div>
              <p className="text-sm font-bold text-[#3d4152] leading-snug">{slot || "Morning"}</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <CreditCard size={13} className="text-[#0c831f]" />
                <p className="text-xs font-bold text-[#93959f] uppercase tracking-wide">Payment</p>
              </div>
              <p className="text-sm font-bold text-[#3d4152]">
                {plan === "at_once" ? `₹${total} / week` : `₹${total} / delivery`}
              </p>
              <p className="text-xs text-[#93959f]">
                {plan === "at_once" ? "Paid upfront" : "Per delivery"}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center gap-1.5 mb-1">
                <Zap size={13} className="text-[#0c831f]" />
                <p className="text-xs font-bold text-[#93959f] uppercase tracking-wide">Items</p>
              </div>
              <p className="text-sm font-bold text-[#3d4152]">
                {items} unit{Number(items) !== 1 ? "s" : ""} / delivery
              </p>
            </div>
          </div>

          {/* Delivery address */}
          <div className="flex items-start gap-3 bg-gray-50 rounded-xl p-3">
            <MapPin size={15} className="text-[#0c831f] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-[#93959f] uppercase tracking-wide mb-0.5">Delivering to</p>
              <p className="text-sm font-bold text-[#3d4152]">{addressLabel}</p>
              <p className="text-xs text-[#93959f]">Udupi District, Karnataka — 576104</p>
            </div>
          </div>
        </div>

        {/* Upcoming deliveries */}
        <div className="bg-white rounded-2xl shadow-sm p-5">
          <h2 className="font-bold text-[#3d4152] text-sm mb-3">
            Upcoming Deliveries
          </h2>
          <div className="space-y-2">
            {upcomingDates.map((date, i) => (
              <div
                key={date}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                  i === 0 ? "bg-green-50 border border-green-200" : "bg-gray-50"
                }`}
              >
                <div className={`w-2 h-2 rounded-full shrink-0 ${
                  i === 0 ? "bg-[#0c831f]" : "bg-gray-300"
                }`} />
                <p className={`text-sm font-semibold ${
                  i === 0 ? "text-[#0c831f]" : "text-[#3d4152]"
                }`}>
                  {date}
                  {i === 0 && <span className="ml-2 text-xs font-bold bg-[#0c831f] text-white px-1.5 py-0.5 rounded-full">Next</span>}
                </p>
                <p className="text-xs text-[#93959f] ml-auto">{slot || "7:00 AM – 9:00 AM"}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Manage / cancel note */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-2xl px-4 py-3">
          <p className="text-xs font-semibold text-yellow-800">
            💡 You can pause or cancel this schedule anytime before the delivery day from your profile.
          </p>
        </div>

        {/* Actions */}
        <Link
          href="/instamart"
          className="block w-full text-center bg-[#0c831f] text-white py-4 rounded-xl font-black text-base hover:bg-green-800 active:scale-[0.98] transition-all"
        >
          Continue Shopping
        </Link>

        <Link
          href="/instamart/schedule"
          className="block w-full text-center text-sm text-[#0c831f] font-semibold hover:underline py-2"
        >
          + Create another schedule
        </Link>

      </div>
    </div>
  );
}

export default function ScheduleConfirmedPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#f0f0f5] flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl animate-bounce mb-3">📅</div>
          <p className="text-[#0c831f] font-bold">Confirming your schedule…</p>
        </div>
      </div>
    }>
      <ConfirmedContent />
    </Suspense>
  );
}
