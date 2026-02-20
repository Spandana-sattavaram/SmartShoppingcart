const db = require('../config/sqlite');

function initializeTables() {

  db.run(`
  CREATE TABLE IF NOT EXISTS products (
    product_id INTEGER PRIMARY KEY,
    barcode TEXT UNIQUE,
    name TEXT,
    category TEXT,
    price REAL,
    node_id INTEGER
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS shopping_list (
    product_id INTEGER PRIMARY KEY,
    quantity INTEGER DEFAULT 1,
    picked INTEGER DEFAULT 0,
    FOREIGN KEY (product_id)
      REFERENCES products(product_id)
      ON DELETE CASCADE
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER,
    quantity INTEGER DEFAULT 1,
    price_at_scan REAL,
    FOREIGN KEY (product_id)
      REFERENCES products(product_id)
      ON DELETE CASCADE
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS sync_meta (
    last_sync_time TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS user_session (
    session_id TEXT PRIMARY KEY,
    user_id INTEGER,
    started_at TEXT
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS beacons (
    beacon_id TEXT PRIMARY KEY,
    node_id INTEGER
  )
`);

db.get(`SELECT COUNT(*) AS c FROM sync_meta`, (err, row) => {
  if (!err && row.c === 0) {
    db.run(
      `INSERT INTO sync_meta (last_sync_time) VALUES (?)`,
      ["1970-01-01T00:00:00"]
    );
  }
});

console.log("Cart DB tables ready (with FKs)");
}

module.exports = initializeTables;