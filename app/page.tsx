import HeroBanner from "@/app/components/HeroBanner";
import CategoryPills from "@/app/components/CategoryPills";
import OffersBanner from "@/app/components/OffersBanner";
import RestaurantGrid from "@/app/components/RestaurantGrid";
import SeedBanner from "@/app/components/SeedBanner";
import { Restaurant } from "@/app/lib/types";

interface PageProps {
  searchParams: Promise<{ category?: string; search?: string }>;
}

async function getRestaurants(category?: string, search?: string): Promise<Restaurant[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (search) params.set("search", search);

  try {
    const res = await fetch(
      `http://localhost:3000/api/restaurants?${params.toString()}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home({ searchParams }: PageProps) {
  const { category, search } = await searchParams;
  const restaurants = await getRestaurants(category, search);
  const isEmpty = restaurants.length === 0 && !search && !category;

  return (
    <div>
      <HeroBanner />

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-8">
        {isEmpty && <SeedBanner />}

        <section>
          <h2 className="text-xl font-bold text-[#3d4152] mb-3">
            What&apos;s on your mind?
          </h2>
          <CategoryPills />
        </section>

        <OffersBanner />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#3d4152]">
              {search
                ? `Results for "${search}"`
                : category && category !== "All"
                ? `${category} Restaurants`
                : "Top restaurants near you"}
            </h2>
            <span className="text-sm text-[#93959f]">{restaurants.length} places</span>
          </div>
          <RestaurantGrid restaurants={restaurants} />
        </section>
      </div>

      <footer className="mt-16 bg-[#3d4152] text-white py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <p className="text-2xl font-black text-[#FC8019] mb-1">swiggy</p>
          <p className="text-sm text-gray-400">© 2024 Swiggy Clone — Design Thinking Demo</p>
        </div>
      </footer>
    </div>
  );
}
