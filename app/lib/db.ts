import Database from "better-sqlite3";
import fs from "fs";
import path from "path";

declare global {
  // eslint-disable-next-line no-var
  var _db: Database.Database | undefined;
}

export function getDb(): Database.Database {
  if (!global._db) {
    const dbPath = path.resolve(process.cwd(), "data/swiggy.db");
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    global._db = new Database(dbPath);
    global._db.pragma("journal_mode = WAL");
    global._db.pragma("foreign_keys = ON");
  }
  return global._db;
}
