import Database from "better-sqlite3";

export function initDB(db: Database.Database) {
  db.exec(`
    DROP TABLE IF EXISTS menu_items;
    DROP TABLE IF EXISTS menu_categories;
    DROP TABLE IF EXISTS restaurants;
    DROP TABLE IF EXISTS grocery_products;
    DROP TABLE IF EXISTS grocery_categories;
    DROP TABLE IF EXISTS scheduled_orders;

    CREATE TABLE restaurants (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      name          TEXT    NOT NULL,
      cuisine       TEXT    NOT NULL,
      image         TEXT    NOT NULL,
      rating        REAL    NOT NULL DEFAULT 4.0,
      delivery_time INTEGER NOT NULL DEFAULT 30,
      min_order     INTEGER NOT NULL DEFAULT 149,
      delivery_fee  INTEGER NOT NULL DEFAULT 40,
      offer         TEXT,
      area          TEXT    NOT NULL DEFAULT 'Indiranagar',
      is_pure_veg   INTEGER NOT NULL DEFAULT 0,
      categories    TEXT    NOT NULL
    );

    CREATE TABLE menu_categories (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
      name          TEXT    NOT NULL,
      sort_order    INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE menu_items (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      restaurant_id INTEGER NOT NULL REFERENCES restaurants(id) ON DELETE CASCADE,
      category_id   INTEGER NOT NULL REFERENCES menu_categories(id) ON DELETE CASCADE,
      name          TEXT    NOT NULL,
      description   TEXT,
      price         INTEGER NOT NULL,
      image         TEXT,
      is_veg        INTEGER NOT NULL DEFAULT 1,
      is_bestseller INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE grocery_categories (
      id         INTEGER PRIMARY KEY AUTOINCREMENT,
      name       TEXT    NOT NULL,
      emoji      TEXT    NOT NULL DEFAULT '🛒',
      slug       TEXT    NOT NULL UNIQUE,
      sort_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE grocery_products (
      id             INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id    INTEGER NOT NULL REFERENCES grocery_categories(id) ON DELETE CASCADE,
      name           TEXT    NOT NULL,
      weight         TEXT    NOT NULL,
      image          TEXT    NOT NULL,
      price          INTEGER NOT NULL,
      original_price INTEGER NOT NULL,
      in_stock       INTEGER NOT NULL DEFAULT 1,
      is_featured    INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE scheduled_orders (
      id                   TEXT    PRIMARY KEY,
      items                TEXT    NOT NULL,
      days                 TEXT    NOT NULL,
      time_slot            TEXT    NOT NULL,
      time_slot_label      TEXT    NOT NULL,
      payment_type         TEXT    NOT NULL,
      price_per_delivery   INTEGER NOT NULL,
      total_price          INTEGER NOT NULL,
      delivery_address     TEXT    NOT NULL,
      status               TEXT    NOT NULL DEFAULT 'active',
      created_at           TEXT    NOT NULL
    );
  `);
}
