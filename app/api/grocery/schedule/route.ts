import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      items,
      days,
      time_slot,
      time_slot_label,
      payment_type,
      price_per_delivery,
      total_price,
      delivery_address,
    } = body;

    if (!items?.length || !days?.length || !time_slot || !payment_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const id = "SCH-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    const created_at = new Date().toISOString();

    const db = getDb();
    db.prepare(`
      INSERT INTO scheduled_orders
        (id, items, days, time_slot, time_slot_label, payment_type, price_per_delivery, total_price, delivery_address, status, created_at)
      VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', ?)
    `).run(
      id,
      JSON.stringify(items),
      JSON.stringify(days),
      time_slot,
      time_slot_label,
      payment_type,
      price_per_delivery,
      total_price,
      delivery_address,
      created_at
    );

    return NextResponse.json({ ok: true, id, created_at });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}

export async function GET() {
  try {
    const db = getDb();
    const rows = db
      .prepare("SELECT * FROM scheduled_orders ORDER BY created_at DESC")
      .all();
    return NextResponse.json(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      rows.map((r: any) => ({
        ...r,
        items: JSON.parse(r.items),
        days: JSON.parse(r.days),
      }))
    );
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
