const pool = require('./pool');

async function getAllPosts() {
  const results = await pool.query(`
        SELECT 
            p.id, p.title, p.content, 
            p.up_votes, p.down_votes, p.created_at, 
            c.id AS category_id, c.title AS category_title, c.slug AS category_slug
        FROM posts p
        JOIN categories c ON p.category_id = c.id
        ORDER BY p.up_votes DESC
    `);

  return results.rows;
}

module.exports = { getAllPosts };
