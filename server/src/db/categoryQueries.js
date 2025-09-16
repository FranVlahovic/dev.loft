const pool = require('./pool');

async function getAllCategories() {
  const results = await pool.query('SELECT * FROM categories');
  return results.rows;
}

// SELECT ALL WITH POST COUNT
// SELECT
//   c.id,
//   c.title,
//   c.description,
//   c.slug,
//   COUNT(p.id) AS post_count
// FROM categories c
// LEFT JOIN posts p ON p.category_id = c.id
// GROUP BY c.id;

module.exports = { getAllCategories };
