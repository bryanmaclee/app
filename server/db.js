import { Database } from "bun:sqlite";

export const db = new Database("db.sqlite");

db.run(`
   CREATE TABLE IF NOT EXISTS users (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   type TEXT NOT NULL,
   email TEXT UNIQUE NOT NULL
   )
`);

db.run(`
   CREATE TABLE IF NOT EXISTS msgs (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   text TEXT NOT NULL,
   recip TEXT NOT NULL
   )
`);

export const insertItem = db.prepare(
   "INSERT INTO msgs (user, text, recip) VALUES (?,?,?)",
);

export const createUser = db.prepare(
   "INSERT INTO users (user, type, email) VALUES (?,?,?)",
);

export function createUserMsgs(userId) {
   db.run(`
   CREATE TABLE IF NOT EXISTS msgs${userId} (
   id INTEGER PRIMARY KEY AUTOINCREMENT,
   user TEXT NOT NULL,
   type TEXT NOT NULL,
   email TEXT NOT NULL
   )
`);
}
