"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { GroceryCategory, GroceryProduct } from "@/app/lib/types";
import GroceryCategoryList from "./GroceryCategoryList";
import ProductCard from "./ProductCard";
import ProductSection from "./ProductSection";
import FeaturedCollections from "./FeaturedCollections";
import FloatingCartBar from "./FloatingCartBar";
import OfferPerception from "./OfferPerception";

interface SectionData {
  category: GroceryCategory;
  products: GroceryProduct[];
}

interface Props {
  sections: SectionData[];
  featuredProducts: GroceryProduct[];
}

const INDULGENCE_COLLECTIONS = [
  {
    title: "Weekend Snacking 🍿",
    subtitle: "Chips, dips, and everything in between",
    emoji: "🎉",
    color: "bg-orange-50",
    slugs: ["snacks-munchies"],
  },
  {
    title: "Cold Drink Fix 🥤",
    subtitle: "Colas, juices, and energy drinks",
    emoji: "❄️",
    color: "bg-blue-50",
    slugs: ["cold-drinks-juices"],
  },
  {
    title: "Quick Breakfast 🍳",
    subtitle: "Eggs, bread, dairy — sorted in minutes",
    emoji: "☀️",
    color: "bg-yellow-50",
    slugs: ["dairy-bread-eggs"],
  },
];

export default function InstamartShell({ sections, featuredProducts }: Props) {
  const [activeSlug, setActiveSlug] = useState<string | null>(
    sections[0]?.category.slug ?? null
  );
  const isScrollingRef = useRef(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sections.forEach(({ category }) => {
      const el = document.getElementById(`cat-${category.slug}`);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isScrollingRef.current) {
            setActiveSlug(category.slug);
          }
        },
        { rootMargin: "-30% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  const handleCategorySelect = useCallback((slug: string) => {
    setActiveSlug(slug);
    isScrollingRef.current = true;
    const el = document.getElementById(`cat-${slug}`);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 120;
      window.scrollTo({ top, behavior: "smooth" });
      setTimeout(() => {
        isScrollingRef.current = false;
      }, 900);
    }
  }, []);

  const indulgenceCollections = INDULGENCE_COLLECTIONS.map((col) => ({
    ...col,
    products: sections
      .filter((s) => col.slugs.includes(s.category.slug))
      .flatMap((s) => s.products)
      .filter((p) => p.in_stock)
      .slice(0, 6),
  })).filter((c) => c.products.length > 0);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-4 flex gap-3 pb-28">
        {/* Sticky category sidebar — desktop only */}
        <div className="hidden md:block">
          <GroceryCategoryList
            categories={sections.map((s) => s.category)}
            activeSlug={activeSlug}
            onSelect={handleCategorySelect}
          />
        </div>

        <div className="flex-1 min-w-0">
          {/* Mobile horizontal category pills */}
          <div className="md:hidden mb-4">
            <GroceryCategoryList
              categories={sections.map((s) => s.category)}
              activeSlug={activeSlug}
              onSelect={handleCategorySelect}
              variant="horizontal"
            />
          </div>

          <div className="space-y-10">
          {/* INTENT — Your Essentials */}
          {featuredProducts.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">⭐</span>
                <h2 className="text-base font-bold text-[#3d4152]">Your Essentials</h2>
                <span className="text-xs bg-[#0c831f] text-white px-2 py-0.5 rounded-full font-semibold">
                  Most ordered
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {featuredProducts.slice(0, 8).map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}

          {/* Offer perception widget */}
          <OfferPerception />

          {/* INDULGENCE — Curated collections */}
          {indulgenceCollections.length > 0 && (
            <section>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xl">✨</span>
                <h2 className="text-base font-bold text-[#3d4152]">Curated for you</h2>
              </div>
              <FeaturedCollections collections={indulgenceCollections} />
            </section>
          )}

          {/* INSPIRATION — Full category browse */}
          <section>
            <div className="flex items-center gap-2 mb-5">
              <span className="text-xl">🗂️</span>
              <h2 className="text-base font-bold text-[#3d4152]">Shop by category</h2>
            </div>
            <div className="space-y-10">
              {sections.map(({ category, products }) => (
                <ProductSection
                  key={category.id}
                  title={category.name}
                  emoji={category.emoji}
                  slug={category.slug}
                  products={products}
                />
              ))}
            </div>
          </section>
          </div>{/* end space-y-10 */}
        </div>
      </div>

      <FloatingCartBar />
    </>
  );
}
