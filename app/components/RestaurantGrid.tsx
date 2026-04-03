import { Restaurant } from "@/app/lib/types";
import RestaurantCard from "./RestaurantCard";

function SkeletonCard() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm animate-pulse">
      <div className="h-44 bg-gray-200" />
      <div className="px-4 py-3 space-y-2">
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

interface Props {
  restaurants: Restaurant[];
  loading?: boolean;
}

export default function RestaurantGrid({ restaurants, loading }: Props) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
    );
  }

  if (restaurants.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-5xl mb-4">🍽️</p>
        <p className="text-[#3d4152] font-semibold text-lg">No restaurants found</p>
        <p className="text-[#93959f] text-sm mt-1">Try a different category or search term</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {restaurants.map((r) => (
        <RestaurantCard key={r.id} r={r} />
      ))}
    </div>
  );
}
