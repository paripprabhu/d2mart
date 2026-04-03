const OFFERS = [
  { title: "50% OFF", subtitle: "Up to ₹100 on your first order", color: "from-orange-400 to-orange-600", emoji: "🎉" },
  { title: "Free Delivery", subtitle: "On orders above ₹299", color: "from-emerald-400 to-emerald-600", emoji: "🛵" },
  { title: "Buy 1 Get 1", subtitle: "On selected restaurants", color: "from-purple-400 to-purple-600", emoji: "🎁" },
  { title: "Up to 60% OFF", subtitle: "Weekend special deals", color: "from-rose-400 to-rose-600", emoji: "🔥" },
];

export default function OffersBanner() {
  return (
    <section>
      <h2 className="text-xl font-bold text-[#3d4152] mb-3">Best Offers For You</h2>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-1">
        {OFFERS.map((offer) => (
          <div
            key={offer.title}
            className={`shrink-0 w-52 rounded-2xl bg-gradient-to-br ${offer.color} p-4 text-white cursor-pointer hover:scale-[1.02] transition-transform`}
          >
            <div className="text-3xl mb-2">{offer.emoji}</div>
            <p className="text-xl font-black">{offer.title}</p>
            <p className="text-xs opacity-90 mt-0.5">{offer.subtitle}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
