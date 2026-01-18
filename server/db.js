import { Database } from "bun:sqlite";

export const msgs = new Database("data.sqlite");
export const users = new Database("data.sqlite");
export const fill = new Database("data.sqlite");

users.run(`
   CREATE TABLE IF NOT EXISTS msgs (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   type TEXT NOT NULL,
   email TEXT NOT NULL
   )
`);

msgs.run(`
   CREATE TABLE IF NOT EXISTS msgs (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   text TEXT NOT NULL,
   recip TEXT NOT NULL
   )
`);

fill.run(`
   CREATE TABLE IF NOT EXISTS msgs (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   text TEXT NOT NULL,
   recip TEXT NOT NULL
   )
`);

export const insertItem = msgs.prepare(
   "INSERT INTO items (text, sender, recip) VALUES (?,?,?)",
);
