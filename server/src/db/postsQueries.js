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

async function getPostsByCategorySlug(slug) {
  const results = await pool.query(
    `
    SELECT 
      p.id, p.title, p.content, p.up_votes, p.down_votes, p.created_at,
      c.id AS category_id, c.title AS category_title, c.slug AS category_slug
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE c.slug = $1
    ORDER BY p.up_votes DESC, p.created_at DESC
    `,
    [slug]
  );
  return results.rows;
}

async function getTopPosts() {
  const results = await pool.query(`
    SELECT
      p.id,
      p.title,
      p.content,
      p.up_votes,
      p.down_votes,
      p.created_at,
      (up_votes - down_votes) AS vote_count
    FROM posts p
    ORDER BY vote_count DESC, p.created_at
    LIMIT 3
    `);
  return results.rows;
}

async function getSearchedPosts(slug, query) {
  const result = await pool.query(
    `
    SELECT 
      p.id, p.title, p.content, p.up_votes, p.down_votes, p.created_at,
      c.id AS category_id, c.title AS category_title, c.slug AS category_slug
    FROM posts p
    JOIN categories c ON p.category_id = c.id
    WHERE c.slug = $1
      AND (p.title ILIKE $2 OR p.content ILIKE $2)
    ORDER BY p.created_at DESC
  `,
    [slug, `%${query}%`]
  );

  return result.rows;
}

async function insertPost(categoryId, title, content) {
  const result = await pool.query(
    'INSERT INTO posts(category_id, title, content) VALUES($1, $2, $3) RETURNING id, category_id, title, content, created_at',
    [categoryId, title, content]
  );
  return result.rows[0];
}

module.exports = { getAllPosts, getPostsByCategorySlug, getTopPosts, getSearchedPosts, insertPost };
