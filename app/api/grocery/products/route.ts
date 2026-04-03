import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get("category");
    const search = searchParams.get("search");
    const featured = searchParams.get("featured");

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug, c.emoji as category_emoji
      FROM grocery_products p
      JOIN grocery_categories c ON p.category_id = c.id
    `;
    const conditions: string[] = [];
    const params: (string | number)[] = [];

    if (slug) {
      conditions.push("c.slug = ?");
      params.push(slug);
    }
    if (search) {
      conditions.push("LOWER(p.name) LIKE ?");
      params.push(`%${search.toLowerCase()}%`);
    }
    if (featured === "true") {
      conditions.push("p.is_featured = 1");
    }

    if (conditions.length) sql += " WHERE " + conditions.join(" AND ");
    sql += " ORDER BY c.sort_order, p.id";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const rows = db.prepare(sql).all(...params) as any[];
    const products = rows.map((r) => ({
      ...r,
      in_stock: Boolean(r.in_stock),
      is_featured: Boolean(r.is_featured),
      discount_pct:
        r.original_price > r.price
          ? Math.round(((r.original_price - r.price) / r.original_price) * 100)
          : 0,
    }));

    return NextResponse.json(products);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
