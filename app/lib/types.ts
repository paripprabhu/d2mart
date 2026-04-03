export interface Restaurant {
  id: number;
  name: string;
  cuisine: string;
  image: string;
  rating: number;
  delivery_time: number;
  min_order: number;
  delivery_fee: number;
  offer: string | null;
  area: string;
  is_pure_veg: number;
  categories: string[]; // parsed from JSON column
}

export interface MenuCategory {
  id: number;
  restaurant_id: number;
  name: string;
  sort_order: number;
}

export interface MenuItem {
  id: number;
  restaurant_id: number;
  category_id: number;
  name: string;
  description: string | null;
  price: number;
  image: string | null;
  is_veg: number;
  is_bestseller: number;
}

export interface MenuSection {
  id: number;
  name: string;
  items: MenuItem[];
}

export interface CartItem {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  quantity: number;
  is_veg: number;
}

// ── Grocery ────────────────────────────────────────────────

export interface GroceryCategory {
  id: number;
  name: string;
  emoji: string;
  slug: string;
  sort_order: number;
}

export interface GroceryProduct {
  id: number;
  category_id: number;
  name: string;
  weight: string;
  image: string;
  price: number;
  original_price: number;
  in_stock: number;
  is_featured: number;
  // computed client-side
  discount_pct?: number;
}

export interface GroceryCartItem {
  id: number;
  name: string;
  weight: string;
  price: number;
  image: string;
  quantity: number;
}

export interface GroceryProductSection {
  category: GroceryCategory;
  products: GroceryProduct[];
}
