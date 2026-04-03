import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { MenuSection, MenuItem } from "@/app/lib/types";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ restaurantId: string }> }
) {
  try {
    const { restaurantId } = await params;
    const db = getDb();

    const categories = db
      .prepare(
        "SELECT * FROM menu_categories WHERE restaurant_id = ? ORDER BY sort_order"
      )
      .all(restaurantId) as { id: number; restaurant_id: number; name: string; sort_order: number }[];

    const items = db
      .prepare("SELECT * FROM menu_items WHERE restaurant_id = ?")
      .all(restaurantId) as MenuItem[];

    const sections: MenuSection[] = categories.map((cat) => ({
      id: cat.id,
      name: cat.name,
      items: items
        .filter((item) => item.category_id === cat.id)
        .map((item) => ({
          ...item,
          is_veg: Number(item.is_veg),
          is_bestseller: Number(item.is_bestseller),
        })),
    }));

    return NextResponse.json(sections);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
