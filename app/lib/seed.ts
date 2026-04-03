import Database from "better-sqlite3";

interface SeedRestaurant {
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
  categories: string;
  menu: { category: string; items: SeedItem[] }[];
}

interface SeedItem {
  name: string;
  description: string;
  price: number;
  is_veg: number;
  is_bestseller: number;
}

const RESTAURANTS: SeedRestaurant[] = [
  {
    name: "Behrouz Biryani",
    cuisine: "Biryani, Mughlai",
    image: "https://picsum.photos/seed/behrouz/600/400",
    rating: 4.4,
    delivery_time: 35,
    min_order: 299,
    delivery_fee: 0,
    offer: "50% OFF up to ₹100",
    area: "Indiranagar",
    is_pure_veg: 0,
    categories: JSON.stringify(["Biryani", "North Indian"]),
    menu: [
      {
        category: "Biryani",
        items: [
          { name: "Chicken Dum Biryani", description: "Slow-cooked in a sealed handi with whole spices", price: 349, is_veg: 0, is_bestseller: 1 },
          { name: "Mutton Dum Biryani", description: "Tender mutton pieces with saffron-infused rice", price: 429, is_veg: 0, is_bestseller: 1 },
          { name: "Paneer Biryani", description: "Cottage cheese marinated in yogurt and spices", price: 299, is_veg: 1, is_bestseller: 0 },
          { name: "Egg Biryani", description: "Classic biryani topped with boiled eggs", price: 279, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Kebabs & Starters",
        items: [
          { name: "Seekh Kebab (4 pcs)", description: "Minced lamb skewered and chargrilled", price: 249, is_veg: 0, is_bestseller: 1 },
          { name: "Shammi Kebab", description: "Melt-in-mouth patties of minced meat and chana dal", price: 219, is_veg: 0, is_bestseller: 0 },
          { name: "Paneer Tikka", description: "Smoky cottage cheese cubes in tandoor marinade", price: 229, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Breads",
        items: [
          { name: "Butter Naan", description: "Soft leavened bread slathered with butter", price: 59, is_veg: 1, is_bestseller: 0 },
          { name: "Tandoori Roti", description: "Whole wheat bread baked in tandoor", price: 39, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Desserts",
        items: [
          { name: "Shahi Tukda", description: "Fried bread with rabdi and dry fruits", price: 119, is_veg: 1, is_bestseller: 0 },
          { name: "Gulab Jamun (2 pcs)", description: "Soft milk-solid dumplings soaked in rose syrup", price: 89, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Beverages",
        items: [
          { name: "Masala Lassi", description: "Chilled yogurt drink with spices", price: 89, is_veg: 1, is_bestseller: 0 },
          { name: "Rose Sharbat", description: "Chilled rose-flavoured drink", price: 69, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "Pizza Hut",
    cuisine: "Pizzas, Italian",
    image: "https://picsum.photos/seed/pizzahut/600/400",
    rating: 4.1,
    delivery_time: 30,
    min_order: 199,
    delivery_fee: 40,
    offer: "Buy 1 Get 1 Free",
    area: "Koramangala",
    is_pure_veg: 0,
    categories: JSON.stringify(["Pizza"]),
    menu: [
      {
        category: "Veg Pizzas",
        items: [
          { name: "Margherita", description: "Classic tomato base with mozzarella and fresh basil", price: 199, is_veg: 1, is_bestseller: 0 },
          { name: "Farm House", description: "Onion, capsicum, tomato, mushroom on a cheesy base", price: 259, is_veg: 1, is_bestseller: 1 },
          { name: "Peri Peri Veg", description: "Fiery peri peri sauce with bell peppers and jalapenos", price: 279, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Non-Veg Pizzas",
        items: [
          { name: "Chicken Tikka", description: "Tandoori chicken tikka with onion and capsicum", price: 329, is_veg: 0, is_bestseller: 1 },
          { name: "Pepperoni Feast", description: "Loaded with double pepperoni and cheese", price: 359, is_veg: 0, is_bestseller: 1 },
          { name: "BBQ Chicken", description: "Smoky BBQ sauce with grilled chicken strips", price: 319, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Sides & Dips",
        items: [
          { name: "Garlic Breadsticks (4 pcs)", description: "Crispy breadsticks with garlic butter", price: 99, is_veg: 1, is_bestseller: 0 },
          { name: "Cheesy Dip", description: "Rich melted cheese dipping sauce", price: 49, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Beverages",
        items: [
          { name: "Pepsi (300ml)", description: "Chilled soft drink", price: 59, is_veg: 1, is_bestseller: 0 },
          { name: "Mineral Water", description: "500ml chilled water", price: 29, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "McDonald's",
    cuisine: "Burgers, American",
    image: "https://picsum.photos/seed/mcdonalds/600/400",
    rating: 4.2,
    delivery_time: 25,
    min_order: 149,
    delivery_fee: 30,
    offer: "Free delivery on ₹249+",
    area: "Whitefield",
    is_pure_veg: 0,
    categories: JSON.stringify(["Burger", "Chicken"]),
    menu: [
      {
        category: "Burgers",
        items: [
          { name: "McAloo Tikki", description: "Spiced potato patty with fresh veggies and sauce", price: 99, is_veg: 1, is_bestseller: 1 },
          { name: "McSpicy Paneer", description: "Crispy spiced paneer patty with lettuce and mayo", price: 159, is_veg: 1, is_bestseller: 0 },
          { name: "McSpicy Chicken", description: "Fiery crispy chicken fillet with jalapeno mayo", price: 179, is_veg: 0, is_bestseller: 1 },
          { name: "Big Spicy Chicken Wrap", description: "Juicy chicken with smoky chipotle in a soft wrap", price: 199, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "McSavers",
        items: [
          { name: "Small Fries", description: "Golden crispy fries lightly salted", price: 79, is_veg: 1, is_bestseller: 0 },
          { name: "Soft Serve Cone", description: "Classic vanilla soft serve", price: 30, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Chicken",
        items: [
          { name: "McNuggets 6 pcs", description: "Crispy golden chicken nuggets", price: 149, is_veg: 0, is_bestseller: 1 },
          { name: "McNuggets 9 pcs", description: "More of the crispy golden nuggets", price: 199, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Beverages",
        items: [
          { name: "Coke (Medium)", description: "Chilled Coca-Cola", price: 79, is_veg: 1, is_bestseller: 0 },
          { name: "McCafé Cold Coffee", description: "Smooth cold coffee blend", price: 119, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "Meghana Foods",
    cuisine: "Biryani, Andhra",
    image: "https://picsum.photos/seed/meghana/600/400",
    rating: 4.6,
    delivery_time: 40,
    min_order: 199,
    delivery_fee: 0,
    offer: null,
    area: "Residency Road",
    is_pure_veg: 0,
    categories: JSON.stringify(["Biryani", "South Indian"]),
    menu: [
      {
        category: "Biryani",
        items: [
          { name: "Chicken Biryani (Full)", description: "Legendary Meghana-style biryani with bone-in chicken", price: 280, is_veg: 0, is_bestseller: 1 },
          { name: "Mutton Biryani (Full)", description: "Rich mutton pieces slow-cooked with basmati", price: 360, is_veg: 0, is_bestseller: 1 },
          { name: "Veg Biryani (Full)", description: "Fragrant basmati with seasonal vegetables", price: 200, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Curries",
        items: [
          { name: "Chicken Curry", description: "Spicy Andhra-style chicken curry", price: 220, is_veg: 0, is_bestseller: 0 },
          { name: "Dal Tadka", description: "Yellow lentils tempered with ghee and cumin", price: 140, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Starters",
        items: [
          { name: "Chicken 65", description: "Deep-fried spicy chicken bites", price: 199, is_veg: 0, is_bestseller: 1 },
          { name: "Gobi 65", description: "Crispy spiced cauliflower fritters", price: 159, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Beverages",
        items: [
          { name: "Buttermilk", description: "Chilled spiced yogurt drink", price: 50, is_veg: 1, is_bestseller: 0 },
          { name: "Fresh Lime Soda", description: "Lime, soda, salt — refreshing", price: 60, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "Truffles",
    cuisine: "Burgers, Continental",
    image: "https://picsum.photos/seed/truffles/600/400",
    rating: 4.5,
    delivery_time: 35,
    min_order: 249,
    delivery_fee: 50,
    offer: "20% OFF on orders above ₹499",
    area: "Koramangala",
    is_pure_veg: 0,
    categories: JSON.stringify(["Burger", "Chicken"]),
    menu: [
      {
        category: "Burgers",
        items: [
          { name: "The Truffles Burger", description: "Double patty, caramelised onions, truffle aioli", price: 349, is_veg: 0, is_bestseller: 1 },
          { name: "Mushroom Swiss Burger", description: "Sautéed mushrooms, Swiss cheese, garlic sauce", price: 299, is_veg: 1, is_bestseller: 1 },
          { name: "Crispy Chicken Burger", description: "Buttermilk fried chicken with coleslaw", price: 279, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Loaded Fries",
        items: [
          { name: "Cheese Fries", description: "Thick-cut fries smothered in cheddar sauce", price: 179, is_veg: 1, is_bestseller: 1 },
          { name: "Bacon Cheese Fries", description: "Crispy bacon bits with melted cheese", price: 219, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Grill & Steaks",
        items: [
          { name: "Grilled Chicken Breast", description: "Herb-marinated grilled chicken with salad", price: 329, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Beverages",
        items: [
          { name: "Oreo Milkshake", description: "Thick blended Oreo milkshake", price: 149, is_veg: 1, is_bestseller: 1 },
          { name: "Fresh Lime Soda", description: "Sweet or salted lime soda", price: 79, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "Saravanaa Bhavan",
    cuisine: "South Indian, Tamil",
    image: "https://picsum.photos/seed/saravanaa/600/400",
    rating: 4.3,
    delivery_time: 30,
    min_order: 149,
    delivery_fee: 0,
    offer: "Free delivery",
    area: "Jayanagar",
    is_pure_veg: 1,
    categories: JSON.stringify(["South Indian"]),
    menu: [
      {
        category: "Dosas",
        items: [
          { name: "Masala Dosa", description: "Crispy crepe filled with spiced potato", price: 120, is_veg: 1, is_bestseller: 1 },
          { name: "Paper Roast Dosa", description: "Ultra-thin crispy dosa served with chutneys", price: 140, is_veg: 1, is_bestseller: 1 },
          { name: "Ghee Podi Dosa", description: "Crispy dosa with spicy podi and generous ghee", price: 160, is_veg: 1, is_bestseller: 0 },
          { name: "Uttapam", description: "Thick savoury pancake topped with onion and tomato", price: 130, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Idli & Vada",
        items: [
          { name: "Idli (2 pcs)", description: "Steamed rice cakes with sambar and chutney", price: 80, is_veg: 1, is_bestseller: 0 },
          { name: "Medu Vada (2 pcs)", description: "Crispy lentil doughnuts with sambar", price: 90, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Rice Meals",
        items: [
          { name: "Meals (Full)", description: "Rice, sambar, rasam, curries, payasam — the works", price: 199, is_veg: 1, is_bestseller: 1 },
          { name: "Curd Rice", description: "Cool yogurt rice with tempering and pomegranate", price: 99, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Beverages",
        items: [
          { name: "Filter Coffee", description: "Authentic South Indian drip coffee with milk", price: 60, is_veg: 1, is_bestseller: 1 },
          { name: "Masala Chai", description: "Spiced tea with ginger and cardamom", price: 40, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "Chili's",
    cuisine: "Mexican, American, Continental",
    image: "https://picsum.photos/seed/chilis/600/400",
    rating: 4.2,
    delivery_time: 45,
    min_order: 399,
    delivery_fee: 60,
    offer: "15% OFF with HDFC cards",
    area: "UB City",
    is_pure_veg: 0,
    categories: JSON.stringify(["Burger", "North Indian", "Chinese"]),
    menu: [
      {
        category: "Starters",
        items: [
          { name: "Chicken Quesadilla", description: "Grilled tortilla with chicken, cheese and chipotle", price: 449, is_veg: 0, is_bestseller: 1 },
          { name: "Spinach & Artichoke Dip", description: "Warm cheesy dip with tortilla chips", price: 399, is_veg: 1, is_bestseller: 0 },
          { name: "Chicken Wings (6 pcs)", description: "Buffalo-sauced crispy wings", price: 499, is_veg: 0, is_bestseller: 1 },
        ],
      },
      {
        category: "Burgers & Sandwiches",
        items: [
          { name: "Classic Bacon Burger", description: "Beef patty, crispy bacon, cheddar, pickles", price: 549, is_veg: 0, is_bestseller: 0 },
          { name: "Crispy Chicken Sandwich", description: "Buttermilk-fried chicken with avocado ranch", price: 499, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Mains",
        items: [
          { name: "Grilled Chicken Fajitas", description: "Sizzling chicken with peppers and warm tortillas", price: 649, is_veg: 0, is_bestseller: 1 },
          { name: "Pasta Primavera", description: "Penne with seasonal vegetables in tomato basil sauce", price: 499, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Desserts",
        items: [
          { name: "Molten Chocolate Cake", description: "Warm lava cake with vanilla ice cream", price: 349, is_veg: 1, is_bestseller: 1 },
          { name: "Skillet Cookie", description: "Giant warm cookie with whipped cream", price: 299, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "Rolls Mania",
    cuisine: "Rolls, Wraps, Kathi Rolls",
    image: "https://picsum.photos/seed/rollsmania/600/400",
    rating: 4.0,
    delivery_time: 20,
    min_order: 99,
    delivery_fee: 20,
    offer: "50% OFF up to ₹75",
    area: "HSR Layout",
    is_pure_veg: 0,
    categories: JSON.stringify(["Rolls", "Chicken"]),
    menu: [
      {
        category: "Veg Rolls",
        items: [
          { name: "Paneer Tikka Roll", description: "Chargrilled paneer with onion and mint chutney in a paratha", price: 129, is_veg: 1, is_bestseller: 1 },
          { name: "Aloo Tikki Roll", description: "Spiced potato patty with pickled onions and tamarind", price: 99, is_veg: 1, is_bestseller: 0 },
          { name: "Cheese Veg Roll", description: "Mixed veg filling loaded with melted cheese", price: 149, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Chicken Rolls",
        items: [
          { name: "Chicken Seekh Roll", description: "Minced chicken seekh with yogurt and green chutney", price: 159, is_veg: 0, is_bestseller: 1 },
          { name: "Chicken Tikka Roll", description: "Marinated grilled chicken pieces in a crispy paratha", price: 169, is_veg: 0, is_bestseller: 1 },
          { name: "Peri Peri Chicken Roll", description: "Spicy peri peri chicken with coleslaw", price: 179, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Combos",
        items: [
          { name: "2 Rolls + Fries Combo", description: "Any 2 rolls with a serving of masala fries", price: 279, is_veg: 0, is_bestseller: 0 },
          { name: "Roll + Drink Combo", description: "Any roll with a cold beverage", price: 199, is_veg: 0, is_bestseller: 0 },
        ],
      },
      {
        category: "Beverages",
        items: [
          { name: "Masala Lemonade", description: "Freshly squeezed lime with chaat masala", price: 69, is_veg: 1, is_bestseller: 0 },
          { name: "Cold Coffee", description: "Chilled blended coffee", price: 89, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
  {
    name: "Frozen Bottle",
    cuisine: "Desserts, Ice Cream, Shakes",
    image: "https://picsum.photos/seed/frozenbottle/600/400",
    rating: 4.3,
    delivery_time: 25,
    min_order: 149,
    delivery_fee: 0,
    offer: "Buy 2 Get 1 Free on Shakes",
    area: "JP Nagar",
    is_pure_veg: 1,
    categories: JSON.stringify(["Desserts"]),
    menu: [
      {
        category: "Milkshakes",
        items: [
          { name: "Ferrero Rocher Shake", description: "Thick blended shake with Ferrero Rocher and hazelnuts", price: 199, is_veg: 1, is_bestseller: 1 },
          { name: "Nutella Shake", description: "Rich Nutella blended with milk and ice cream", price: 189, is_veg: 1, is_bestseller: 1 },
          { name: "Strawberry Shake", description: "Fresh strawberry blended to perfection", price: 159, is_veg: 1, is_bestseller: 0 },
          { name: "Cold Coffee Shake", description: "Strong cold coffee with vanilla ice cream", price: 169, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Ice Cream",
        items: [
          { name: "Brownie Sundae", description: "Warm fudge brownie with vanilla ice cream and caramel drizzle", price: 179, is_veg: 1, is_bestseller: 1 },
          { name: "Belgian Chocolate Tub", description: "Premium Belgian chocolate ice cream 500ml", price: 299, is_veg: 1, is_bestseller: 0 },
        ],
      },
      {
        category: "Waffles",
        items: [
          { name: "Classic Butter Waffle", description: "Golden waffle with maple syrup and butter", price: 149, is_veg: 1, is_bestseller: 0 },
          { name: "Nutella Waffle", description: "Warm waffle spread with Nutella and banana", price: 179, is_veg: 1, is_bestseller: 1 },
        ],
      },
      {
        category: "Hot Beverages",
        items: [
          { name: "Hot Chocolate", description: "Rich creamy hot chocolate", price: 129, is_veg: 1, is_bestseller: 0 },
          { name: "Cappuccino", description: "Espresso with frothy steamed milk", price: 109, is_veg: 1, is_bestseller: 0 },
        ],
      },
    ],
  },
];

export function runSeed(db: Database.Database) {
  const insertRestaurant = db.prepare(`
    INSERT INTO restaurants (name, cuisine, image, rating, delivery_time, min_order, delivery_fee, offer, area, is_pure_veg, categories)
    VALUES (@name, @cuisine, @image, @rating, @delivery_time, @min_order, @delivery_fee, @offer, @area, @is_pure_veg, @categories)
  `);

  const insertCategory = db.prepare(`
    INSERT INTO menu_categories (restaurant_id, name, sort_order)
    VALUES (@restaurant_id, @name, @sort_order)
  `);

  const insertItem = db.prepare(`
    INSERT INTO menu_items (restaurant_id, category_id, name, description, price, image, is_veg, is_bestseller)
    VALUES (@restaurant_id, @category_id, @name, @description, @price, @image, @is_veg, @is_bestseller)
  `);

  const seedAll = db.transaction(() => {
    for (const restaurant of RESTAURANTS) {
      const { menu, ...restaurantData } = restaurant;
      const result = insertRestaurant.run(restaurantData);
      const restaurantId = result.lastInsertRowid as number;

      menu.forEach((section, catIndex) => {
        const catResult = insertCategory.run({
          restaurant_id: restaurantId,
          name: section.category,
          sort_order: catIndex,
        });
        const categoryId = catResult.lastInsertRowid as number;

        section.items.forEach((item) => {
          const slug = item.name.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
          insertItem.run({
            restaurant_id: restaurantId,
            category_id: categoryId,
            name: item.name,
            description: item.description,
            price: item.price,
            image: `https://picsum.photos/seed/${slug}/300/200`,
            is_veg: item.is_veg,
            is_bestseller: item.is_bestseller,
          });
        });
      });
    }
  });

  seedAll();
  return RESTAURANTS.length;
}
