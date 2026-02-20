const db = require('../config/sqlite');

function seedProducts() {
  const insert = db.prepare(`
    INSERT OR IGNORE INTO products 
    (product_id, barcode, name, category, price, node_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insert.run(1, '890000000001', '5 star', 'Chocolate', 20.0, 7);
  insert.run(2, '890000000002', 'Apsara Pencil', 'Stationary', 30.0, 5);
  insert.run(3, '890000000003', 'Good Day', 'Biscuits', 10.0, 10);

  console.log("Sample products inserted.");
}

seedProducts();