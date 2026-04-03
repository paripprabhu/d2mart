import Database from "better-sqlite3";

interface SeedCategory {
  name: string;
  emoji: string;
  slug: string;
  sort_order: number;
  products: SeedProduct[];
}

interface SeedProduct {
  name: string;
  weight: string;
  price: number;
  original_price: number;
  in_stock: number;
  is_featured: number;
}

const GROCERY_DATA: SeedCategory[] = [
  {
    name: "Fruits & Vegetables",
    emoji: "🥦",
    slug: "fruits-vegetables",
    sort_order: 0,
    products: [
      { name: "Onions", weight: "1 kg", price: 39, original_price: 49, in_stock: 1, is_featured: 1 },
      { name: "Tomatoes", weight: "500 g", price: 29, original_price: 35, in_stock: 1, is_featured: 1 },
      { name: "Potatoes", weight: "1 kg", price: 35, original_price: 45, in_stock: 1, is_featured: 0 },
      { name: "Spinach", weight: "250 g", price: 25, original_price: 30, in_stock: 1, is_featured: 0 },
      { name: "Banana", weight: "6 pcs", price: 45, original_price: 55, in_stock: 1, is_featured: 1 },
      { name: "Apple (Shimla)", weight: "4 pcs (~500 g)", price: 99, original_price: 120, in_stock: 1, is_featured: 0 },
      { name: "Capsicum (Green)", weight: "250 g", price: 35, original_price: 40, in_stock: 1, is_featured: 0 },
      { name: "Cucumber", weight: "2 pcs", price: 25, original_price: 30, in_stock: 0, is_featured: 0 },
    ],
  },
  {
    name: "Dairy, Bread & Eggs",
    emoji: "🥛",
    slug: "dairy-bread-eggs",
    sort_order: 1,
    products: [
      { name: "Amul Toned Milk", weight: "500 ml", price: 28, original_price: 28, in_stock: 1, is_featured: 1 },
      { name: "Amul Butter", weight: "100 g", price: 55, original_price: 58, in_stock: 1, is_featured: 1 },
      { name: "Eggs (White)", weight: "6 pcs", price: 58, original_price: 65, in_stock: 1, is_featured: 1 },
      { name: "Britannia Bread", weight: "400 g", price: 42, original_price: 45, in_stock: 1, is_featured: 0 },
      { name: "Amul Dahi", weight: "400 g", price: 45, original_price: 50, in_stock: 1, is_featured: 0 },
      { name: "Amul Cheese Slices", weight: "200 g (10 slices)", price: 99, original_price: 110, in_stock: 1, is_featured: 0 },
      { name: "Nandini Paneer", weight: "200 g", price: 79, original_price: 85, in_stock: 1, is_featured: 0 },
      { name: "Curd (Nestle)", weight: "200 g", price: 35, original_price: 38, in_stock: 1, is_featured: 0 },
    ],
  },
  {
    name: "Snacks & Munchies",
    emoji: "🍿",
    slug: "snacks-munchies",
    sort_order: 2,
    products: [
      { name: "Lay's Classic Salted", weight: "52 g", price: 20, original_price: 20, in_stock: 1, is_featured: 1 },
      { name: "Doritos Nacho Cheese", weight: "64 g", price: 30, original_price: 30, in_stock: 1, is_featured: 1 },
      { name: "Kurkure Masala Munch", weight: "70 g", price: 20, original_price: 20, in_stock: 1, is_featured: 0 },
      { name: "Hide & Seek Biscuits", weight: "200 g", price: 45, original_price: 50, in_stock: 1, is_featured: 0 },
      { name: "Oreo Chocolate", weight: "120 g", price: 35, original_price: 40, in_stock: 1, is_featured: 1 },
      { name: "Pringles Original", weight: "107 g", price: 179, original_price: 199, in_stock: 1, is_featured: 0 },
      { name: "Cornitos Nachos", weight: "150 g", price: 79, original_price: 89, in_stock: 0, is_featured: 0 },
      { name: "Haldiram's Aloo Bhujia", weight: "200 g", price: 69, original_price: 75, in_stock: 1, is_featured: 0 },
    ],
  },
  {
    name: "Cold Drinks & Juices",
    emoji: "🥤",
    slug: "cold-drinks-juices",
    sort_order: 3,
    products: [
      { name: "Coca-Cola", weight: "750 ml", price: 42, original_price: 45, in_stock: 1, is_featured: 1 },
      { name: "Tropicana Orange", weight: "1 L", price: 99, original_price: 110, in_stock: 1, is_featured: 1 },
      { name: "Sprite", weight: "750 ml", price: 42, original_price: 45, in_stock: 1, is_featured: 0 },
      { name: "Red Bull Energy Drink", weight: "250 ml", price: 115, original_price: 125, in_stock: 1, is_featured: 1 },
      { name: "Paper Boat Aamras", weight: "200 ml", price: 30, original_price: 35, in_stock: 1, is_featured: 0 },
      { name: "Minute Maid Guava", weight: "1 L", price: 95, original_price: 105, in_stock: 1, is_featured: 0 },
      { name: "Mountain Dew", weight: "750 ml", price: 42, original_price: 45, in_stock: 0, is_featured: 0 },
      { name: "Maaza Mango", weight: "600 ml", price: 50, original_price: 55, in_stock: 1, is_featured: 0 },
    ],
  },
  {
    name: "Instant & Frozen",
    emoji: "🍜",
    slug: "instant-frozen",
    sort_order: 4,
    products: [
      { name: "Maggi 2-Minute Noodles", weight: "4 × 70 g", price: 60, original_price: 68, in_stock: 1, is_featured: 1 },
      { name: "McCain Smiles (Frozen)", weight: "415 g", price: 175, original_price: 199, in_stock: 1, is_featured: 1 },
      { name: "Yippee Noodles", weight: "3 × 70 g", price: 42, original_price: 48, in_stock: 1, is_featured: 0 },
      { name: "Top Ramen Curry", weight: "70 g", price: 15, original_price: 15, in_stock: 1, is_featured: 0 },
      { name: "MTR Ready to Eat Palak Paneer", weight: "300 g", price: 99, original_price: 115, in_stock: 1, is_featured: 0 },
      { name: "Haldiram Frozen Samosa", weight: "400 g (20 pcs)", price: 149, original_price: 165, in_stock: 1, is_featured: 0 },
      { name: "Knorr Soupy Noodles", weight: "66 g", price: 25, original_price: 28, in_stock: 0, is_featured: 0 },
    ],
  },
  {
    name: "Packaged Foods",
    emoji: "🛒",
    slug: "packaged-foods",
    sort_order: 5,
    products: [
      { name: "Tata Salt", weight: "1 kg", price: 28, original_price: 30, in_stock: 1, is_featured: 1 },
      { name: "Fortune Sunflower Oil", weight: "1 L", price: 145, original_price: 165, in_stock: 1, is_featured: 0 },
      { name: "India Gate Basmati Rice", weight: "1 kg", price: 120, original_price: 135, in_stock: 1, is_featured: 1 },
      { name: "Tata Tea Premium", weight: "250 g", price: 105, original_price: 115, in_stock: 1, is_featured: 0 },
      { name: "Nescafé Classic", weight: "50 g", price: 135, original_price: 150, in_stock: 1, is_featured: 1 },
      { name: "Horlicks Classic Malt", weight: "500 g", price: 265, original_price: 299, in_stock: 1, is_featured: 0 },
      { name: "Atta (Aashirvaad Whole Wheat)", weight: "5 kg", price: 290, original_price: 320, in_stock: 1, is_featured: 0 },
      { name: "Sugar (Refined)", weight: "1 kg", price: 48, original_price: 52, in_stock: 1, is_featured: 0 },
    ],
  },
  {
    name: "Personal Care",
    emoji: "🧴",
    slug: "personal-care",
    sort_order: 6,
    products: [
      { name: "Dove Body Wash", weight: "200 ml", price: 189, original_price: 219, in_stock: 1, is_featured: 1 },
      { name: "Colgate MaxFresh Toothpaste", weight: "150 g", price: 89, original_price: 99, in_stock: 1, is_featured: 0 },
      { name: "Head & Shoulders Shampoo", weight: "180 ml", price: 185, original_price: 210, in_stock: 1, is_featured: 1 },
      { name: "Dettol Handwash", weight: "200 ml", price: 79, original_price: 89, in_stock: 1, is_featured: 0 },
      { name: "Gillette Guard Razor", weight: "1 pc", price: 35, original_price: 39, in_stock: 1, is_featured: 0 },
      { name: "Nivea Lip Balm", weight: "4.8 g", price: 115, original_price: 130, in_stock: 0, is_featured: 0 },
      { name: "Whisper Ultra Pads", weight: "7 pcs", price: 69, original_price: 79, in_stock: 1, is_featured: 0 },
    ],
  },
  {
    name: "Household",
    emoji: "🧹",
    slug: "household",
    sort_order: 7,
    products: [
      { name: "Vim Dishwash Bar", weight: "200 g", price: 29, original_price: 32, in_stock: 1, is_featured: 0 },
      { name: "Harpic Toilet Cleaner", weight: "500 ml", price: 89, original_price: 99, in_stock: 1, is_featured: 1 },
      { name: "Surf Excel Matic Liquid", weight: "500 ml", price: 195, original_price: 220, in_stock: 1, is_featured: 0 },
      { name: "Scotch-Brite Scrub Pad", weight: "3 pcs", price: 65, original_price: 75, in_stock: 1, is_featured: 0 },
      { name: "Good Knight Fast Card", weight: "1 pack (3 cards)", price: 79, original_price: 89, in_stock: 1, is_featured: 0 },
      { name: "Lizol Surface Cleaner", weight: "500 ml", price: 119, original_price: 135, in_stock: 1, is_featured: 1 },
      { name: "Freshbag Garbage Bags", weight: "30 pcs (medium)", price: 99, original_price: 110, in_stock: 1, is_featured: 0 },
    ],
  },
];

// Curated Unsplash photo IDs per product — more relevant than random placeholders
const PRODUCT_IMAGES: Record<string, string> = {
  // Fruits & Vegetables
  "Onions":            "1518977956812-cd3dbadaaf31",
  "Tomatoes":          "1546470427-0d4351cf5ef8",
  "Potatoes":          "1518977676601-b53f82aba655",
  "Spinach":           "1576045057995-568f588f82fb",
  "Banana":            "1528821128474-27f963b062bf",
  "Apple (Shimla)":    "1567306226416-28f0efdc88ce",
  "Capsicum (Green)":  "1563565375-f3fdfdbefa83",
  "Cucumber":          "1449300079323-02e209d9d3a6",
  // Dairy, Bread & Eggs
  "Amul Toned Milk":   "1550583724-b2692b85b150",
  "Amul Butter":       "1589985270826-4b7bb135bc9d",
  "Eggs (White)":      "1506976785307-8732e854ad03",
  "Britannia Bread":   "1509440159596-0249088772ff",
  "Amul Dahi":         "1563636619-e9143da7973b",
  "Amul Cheese Slices":"1486297678162-eb2a19b0a32d",
  "Nandini Paneer":    "1631452180519-c014fe946bc7",
  "Curd (Nestle)":     "1563636619-e9143da7973b",
  // Snacks & Munchies
  "Lay's Classic Salted":      "1566478989037-eec170784d0b",
  "Doritos Nacho Cheese":      "1566478989037-eec170784d0b",
  "Kurkure Masala Munch":      "1566478989037-eec170784d0b",
  "Hide & Seek Biscuits":      "1558961363-fa8fdf82db35",
  "Oreo Chocolate":            "1548767797-d8c844163c4c",
  "Pringles Original":         "1575377427642-087a04313045",
  "Cornitos Nachos":           "1566478989037-eec170784d0b",
  "Haldiram's Aloo Bhujia":    "1566478989037-eec170784d0b",
  // Cold Drinks & Juices
  "Coca-Cola":                 "1554866585-cd94860890b7",
  "Tropicana Orange":          "1621506289937-a8e4df240d0b",
  "Sprite":                    "1554866585-cd94860890b7",
  "Red Bull Energy Drink":     "1504674900247-0877df9cc836",
  "Paper Boat Aamras":         "1587015990127-424b954571c3",
  "Minute Maid Guava":         "1587015990127-424b954571c3",
  "Mountain Dew":              "1554866585-cd94860890b7",
  "Maaza Mango":               "1601493700631-2b16ec4b4716",
  // Instant & Frozen
  "Maggi 2-Minute Noodles":          "1612929633738-8fe44f7ec841",
  "McCain Smiles (Frozen)":          "1568901346375-831cd1bde69d",
  "Yippee Noodles":                  "1612929633738-8fe44f7ec841",
  "Top Ramen Curry":                 "1612929633738-8fe44f7ec841",
  "MTR Ready to Eat Palak Paneer":   "1631452180519-c014fe946bc7",
  "Haldiram Frozen Samosa":          "1601050690597-df0568f70950",
  "Knorr Soupy Noodles":             "1612929633738-8fe44f7ec841",
  // Packaged Foods
  "Tata Salt":                        "1518977676601-b53f82aba655",
  "Fortune Sunflower Oil":            "1559181567-c3190ca9959b",
  "India Gate Basmati Rice":          "1536304929831-ee1ca9d44906",
  "Tata Tea Premium":                 "1544787219-7f47ccb76574",
  "Nescafé Classic":                  "1559056199-641a0ac8b55e",
  "Horlicks Classic Malt":            "1563227812-0ea4c22e6cc8",
  "Atta (Aashirvaad Whole Wheat)":    "1574323347407-f5e1ad6d020b",
  "Sugar (Refined)":                  "1587049352851-8d4be89bc536",
  // Personal Care
  "Dove Body Wash":                   "1631729371254-42c2892f0e6e",
  "Colgate MaxFresh Toothpaste":      "1593866104316-1f47bec9f39c",
  "Head & Shoulders Shampoo":         "1556228720-da41547b9b2d",
  "Dettol Handwash":                  "1584017911766-d2d67eba9e30",
  "Gillette Guard Razor":             "1503951914875-452162b0f3f1",
  "Nivea Lip Balm":                   "1586201375761-83865001e31c",
  "Whisper Ultra Pads":               "1617625802912-cde586faf331",
  // Household
  "Vim Dishwash Bar":                 "1563453392212-326f5e854473",
  "Harpic Toilet Cleaner":            "1585771724684-38269d6639fd",
  "Surf Excel Matic Liquid":          "1626806787461-102c1bfaaea1",
  "Scotch-Brite Scrub Pad":           "1563453392212-326f5e854473",
  "Good Knight Fast Card":            "1618160702438-9b02ab6515c9",
  "Lizol Surface Cleaner":            "1585771724684-38269d6639fd",
  "Freshbag Garbage Bags":            "1563453392212-326f5e854473",
};

function productImage(name: string, slug: string): string {
  const id = PRODUCT_IMAGES[name];
  if (id) return `https://images.unsplash.com/photo-${id}?w=200&h=200&fit=crop&auto=format`;
  return `https://picsum.photos/seed/groc-${slug}/200/200`;
}

export function runGrocerySeed(db: Database.Database) {
  const insertCat = db.prepare(`
    INSERT INTO grocery_categories (name, emoji, slug, sort_order)
    VALUES (@name, @emoji, @slug, @sort_order)
  `);

  const insertProduct = db.prepare(`
    INSERT INTO grocery_products (category_id, name, weight, image, price, original_price, in_stock, is_featured)
    VALUES (@category_id, @name, @weight, @image, @price, @original_price, @in_stock, @is_featured)
  `);

  const seedAll = db.transaction(() => {
    for (const cat of GROCERY_DATA) {
      const { products, ...catData } = cat;
      const result = insertCat.run(catData);
      const categoryId = result.lastInsertRowid as number;

      for (const p of products) {
        const slug = p.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
        insertProduct.run({
          category_id: categoryId,
          name: p.name,
          weight: p.weight,
          image: productImage(p.name, slug),
          price: p.price,
          original_price: p.original_price,
          in_stock: p.in_stock,
          is_featured: p.is_featured,
        });
      }
    }
  });

  seedAll();
  return GROCERY_DATA.length;
}
