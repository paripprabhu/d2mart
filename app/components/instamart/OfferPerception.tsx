const PERKS = [
  { emoji: "⚡", title: "8-min delivery", sub: "Fastest in the city" },
  { emoji: "🏷️", title: "Best prices", sub: "Lowest price guarantee" },
  { emoji: "🔄", title: "Easy returns", sub: "No questions asked" },
  { emoji: "🎁", title: "Free delivery", sub: "On orders above ₹199" },
];

export default function OfferPerception() {
  return (
    <section className="bg-gradient-to-r from-green-600 to-[#0c831f] rounded-2xl p-5 text-white">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xl font-black">Save more with Instamart</p>
          <p className="text-green-200 text-sm mt-0.5">
            Best prices + fastest delivery in Manipal
          </p>
        </div>
        <span className="text-4xl">🛒</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {PERKS.map((p) => (
          <div key={p.title} className="bg-white/15 backdrop-blur-sm rounded-xl px-3 py-2.5">
            <span className="text-2xl">{p.emoji}</span>
            <p className="text-sm font-bold mt-1 leading-tight">{p.title}</p>
            <p className="text-xs text-green-100 mt-0.5">{p.sub}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
