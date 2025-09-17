const pool = require('./pool');

async function getAllCategories() {
  const results = await pool.query(`
    SELECT 
      c.id, 
      c.title, 
      c.description, 
      c.slug, 
      COUNT(p.id) AS post_count 
    FROM categories c 
    LEFT JOIN posts p ON p.category_id = c.id 
    GROUP BY c.id, c.title, c.description, c.slug 
    ORDER BY c.title
  `);
  return results.rows;
}

async function getTopCategories() {
  const results = await pool.query(`
    SELECT 
      c.id, 
      c.title, 
      c.description, 
      c.slug, 
      COUNT(p.id) AS post_count 
    FROM categories c 
    LEFT JOIN posts p ON p.category_id = c.id 
    GROUP BY c.id, c.title, c.description, c.slug 
    ORDER BY post_count DESC 
    LIMIT 3
  `);
  return results.rows;
}

module.exports = { getAllCategories, getTopCategories };
