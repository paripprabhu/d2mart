import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";
import { initDB } from "@/app/lib/schema";
import { runSeed } from "@/app/lib/seed";
import { runGrocerySeed } from "@/app/lib/grocery-seed";

async function seed() {
  const db = getDb();
  initDB(db);
  const restaurants = runSeed(db);
  const groceryCategories = runGrocerySeed(db);
  return { ok: true, restaurants, groceryCategories };
}

export async function GET() {
  try {
    return NextResponse.json(await seed());
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

export async function POST() {
  try {
    return NextResponse.json(await seed());
  } catch (err) {
    console.error("Seed error:", err);
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}
