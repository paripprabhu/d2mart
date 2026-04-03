import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const db = getDb();
    const row = db.prepare("SELECT * FROM restaurants WHERE id = ?").get(id);
    if (!row) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const r = row as any;
    return NextResponse.json({
      ...r,
      categories: JSON.parse(r.categories),
      is_pure_veg: Boolean(r.is_pure_veg),
    });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
