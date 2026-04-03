import { GroceryProduct } from "@/app/lib/types";
import ProductCard from "./ProductCard";

interface Props {
  title: string;
  emoji?: string;
  slug: string;
  products: GroceryProduct[];
}

export default function ProductSection({ title, emoji, slug, products }: Props) {
  if (products.length === 0) return null;
  return (
    <section id={`cat-${slug}`} className="scroll-mt-28">
      <div className="flex items-center gap-2 mb-3">
        {emoji && <span className="text-xl">{emoji}</span>}
        <h2 className="text-base font-bold text-[#3d4152]">{title}</h2>
        <span className="text-xs text-[#93959f] ml-auto">{products.length} items</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
