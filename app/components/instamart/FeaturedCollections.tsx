import ProductCard from "./ProductCard";
import { GroceryProduct } from "@/app/lib/types";

interface Collection {
  title: string;
  subtitle: string;
  emoji: string;
  color: string;
  products: GroceryProduct[];
}

export default function FeaturedCollections({ collections }: { collections: Collection[] }) {
  return (
    <div className="space-y-8">
      {collections.map((col) => (
        <section key={col.title}>
          {/* Collection header */}
          <div className={`rounded-2xl ${col.color} p-4 mb-4 flex items-center justify-between`}>
            <div>
              <p className="font-black text-lg text-[#3d4152]">{col.title}</p>
              <p className="text-sm text-[#93959f] mt-0.5">{col.subtitle}</p>
            </div>
            <span className="text-4xl">{col.emoji}</span>
          </div>

          {/* Horizontal scroll of product cards */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">
            {col.products.map((p) => (
              <div key={p.id} className="shrink-0 w-40">
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
