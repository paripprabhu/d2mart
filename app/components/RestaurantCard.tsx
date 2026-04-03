import Link from "next/link";
import Image from "next/image";
import { Star, Clock, IndianRupee, Leaf } from "lucide-react";
import { Restaurant } from "@/app/lib/types";

export default function RestaurantCard({ r }: { r: Restaurant }) {
  return (
    <Link href={`/restaurant/${r.id}`} className="block group">
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        {/* Cover image */}
        <div className="relative h-44 overflow-hidden">
          <Image
            src={r.image}
            alt={r.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
          />
          {/* Offer badge */}
          {r.offer && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-3 py-2">
              <span className="text-white text-xs font-bold">{r.offer}</span>
            </div>
          )}
          {/* Pure veg badge */}
          {r.is_pure_veg && (
            <div className="absolute top-2 right-2 bg-[#60b246] text-white text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              <Leaf size={10} />
              Pure Veg
            </div>
          )}
        </div>

        {/* Card body */}
        <div className="px-4 py-3">
          <h3 className="font-bold text-[#3d4152] text-base truncate">{r.name}</h3>
          <p className="text-[#93959f] text-xs mt-0.5 truncate">{r.cuisine}</p>

          {/* Stats row */}
          <div className="flex items-center gap-3 mt-2 text-xs text-[#93959f]">
            <span className="flex items-center gap-1 font-semibold text-[#3d4152]">
              <Star size={12} className="fill-[#FC8019] text-[#FC8019]" />
              {r.rating}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <Clock size={12} />
              {r.delivery_time} mins
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5">
              <IndianRupee size={11} />
              {r.min_order} min
            </span>
          </div>

          {/* Delivery fee */}
          <p className="text-xs mt-1.5 font-medium">
            {r.delivery_fee === 0 ? (
              <span className="text-[#60b246]">Free delivery</span>
            ) : (
              <span className="text-[#93959f]">₹{r.delivery_fee} delivery</span>
            )}
          </p>
        </div>
      </div>
    </Link>
  );
}
