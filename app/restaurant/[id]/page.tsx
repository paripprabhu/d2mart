import Image from "next/image";
import Link from "next/link";
import { Star, Clock, IndianRupee, ArrowLeft, Leaf } from "lucide-react";
import { Restaurant, MenuSection } from "@/app/lib/types";
import MenuSidebar from "@/app/components/MenuSidebar";
import MenuSectionComponent from "@/app/components/MenuSection";

async function getRestaurant(id: string): Promise<Restaurant | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/restaurants/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

async function getMenu(restaurantId: string): Promise<MenuSection[]> {
  try {
    const res = await fetch(`http://localhost:3000/api/menu/${restaurantId}`, {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function RestaurantPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const [restaurant, menu] = await Promise.all([getRestaurant(id), getMenu(id)]);

  if (!restaurant) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🍽️</p>
        <p className="text-[#3d4152] font-semibold text-xl">Restaurant not found</p>
        <Link href="/" className="text-[#FC8019] text-sm mt-3 inline-block hover:underline">
          ← Back to home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Hero image */}
      <div className="relative h-52 md:h-72 w-full">
        <Image
          src={restaurant.image}
          alt={restaurant.name}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <Link
          href="/"
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-white transition"
        >
          <ArrowLeft size={18} className="text-[#3d4152]" />
        </Link>
      </div>

      {/* Restaurant info card */}
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-5">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-[#3d4152]">{restaurant.name}</h1>
                {restaurant.is_pure_veg && (
                  <span className="flex items-center gap-1 bg-[#60b246] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    <Leaf size={10} /> Pure Veg
                  </span>
                )}
              </div>
              <p className="text-[#93959f] text-sm mt-0.5">{restaurant.cuisine}</p>
              <p className="text-xs text-[#93959f] mt-0.5">{restaurant.area}, Bengaluru</p>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 bg-[#60b246] text-white text-sm font-bold px-2.5 py-1 rounded-lg">
                  <Star size={13} className="fill-white" />
                  {restaurant.rating}
                </div>
                <div className="text-sm text-[#3d4152] flex items-center gap-1">
                  <Clock size={14} className="text-[#93959f]" />
                  {restaurant.delivery_time} mins
                </div>
                <div className="text-sm text-[#3d4152] flex items-center gap-1">
                  <IndianRupee size={13} className="text-[#93959f]" />
                  {restaurant.min_order} for two
                </div>
                <div className="text-sm">
                  {restaurant.delivery_fee === 0 ? (
                    <span className="text-[#60b246] font-semibold">Free delivery</span>
                  ) : (
                    <span className="text-[#93959f]">₹{restaurant.delivery_fee} delivery</span>
                  )}
                </div>
              </div>
            </div>

            {/* Offer pill */}
            {restaurant.offer && (
              <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 text-center shrink-0">
                <p className="text-xs text-[#93959f]">Offer</p>
                <p className="text-sm font-bold text-[#FC8019]">{restaurant.offer}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Three column layout */}
      <div className="max-w-6xl mx-auto px-4 py-6 flex gap-6">
        <MenuSidebar sections={menu} />

        {/* Menu */}
        <div className="flex-1 min-w-0 bg-white rounded-xl shadow-sm px-6 py-4">
          <h2 className="text-lg font-bold text-[#3d4152] mb-2">Menu</h2>
          {menu.length === 0 ? (
            <p className="text-[#93959f] py-10 text-center">No menu items found.</p>
          ) : (
            menu.map((section) => (
              <MenuSectionComponent
                key={section.id}
                section={section}
                restaurantId={restaurant.id}
                restaurantName={restaurant.name}
              />
            ))
          )}
        </div>

      </div>
    </div>
  );
}
