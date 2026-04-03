import { GroceryCategory, GroceryProduct } from "@/app/lib/types";
import InstamartShell from "@/app/components/instamart/InstamartShell";
import SeedBanner from "@/app/components/SeedBanner";

async function fetchCategories(): Promise<GroceryCategory[]> {
  try {
    const res = await fetch("http://localhost:3000/api/grocery/categories", {
      cache: "no-store",
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function fetchProducts(params?: string): Promise<GroceryProduct[]> {
  try {
    const res = await fetch(
      `http://localhost:3000/api/grocery/products${params ? `?${params}` : ""}`,
      { cache: "no-store" }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function InstamartPage() {
  const [categories, allProducts, featuredProducts] = await Promise.all([
    fetchCategories(),
    fetchProducts(),
    fetchProducts("featured=true"),
  ]);

  const isEmpty = categories.length === 0;

  const sections = categories.map((cat) => ({
    category: cat,
    products: allProducts.filter((p) => p.category_id === cat.id),
  }));

  return (
    <div className="bg-[#f0f0f5] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 pt-4 pb-2">
        {isEmpty && <div className="mb-4"><SeedBanner /></div>}
      </div>

      {!isEmpty && (
        <InstamartShell sections={sections} featuredProducts={featuredProducts} />
      )}

      <footer className="mt-8 bg-[#1a1a2e] text-white py-8 px-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <p className="text-lg font-black">
              <span className="text-[#0c831f]">D2</span>mart
            </p>
            <p className="text-xs text-gray-400 mt-0.5">
              Quick commerce · Design Thinking Demo
            </p>
          </div>
          <div className="text-right text-xs text-gray-400 space-y-0.5">
            <p>⚡ Delivery in 8 minutes</p>
            <p>🏷️ Best prices guaranteed</p>
            <p>🔄 Easy returns</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
