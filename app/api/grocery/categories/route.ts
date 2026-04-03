import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

export async function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare("SELECT * FROM grocery_categories ORDER BY sort_order")
      .all();
    return NextResponse.json(rows);
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
