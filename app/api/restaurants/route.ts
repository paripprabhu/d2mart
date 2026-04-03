import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rows: any[] = db.prepare("SELECT * FROM restaurants").all();

    if (search) {
      const q = search.toLowerCase();
      rows = rows.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.cuisine.toLowerCase().includes(q)
      );
    }

    // Parse JSON columns and filter by category
    const restaurants = rows
      .map((r) => ({
        ...r,
        categories: JSON.parse(r.categories) as string[],
        is_pure_veg: Boolean(r.is_pure_veg),
      }))
      .filter((r) => {
        if (!category || category === "All") return true;
        return r.categories.includes(category);
      });

    return NextResponse.json(restaurants);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
