import { Database } from "bun:sqlite";

export const db = new Database("data.sqlite");

db.run(`
   CREATE TABLE IF NOT EXISTS items (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   text TEXT NOT NULL
   )
`);

export const insertItem = db.prepare(
   "INSERT INTO items (text) VALUES (?)"
);
