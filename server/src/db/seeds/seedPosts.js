const posts = [
  { title: 'Intro to CSS', content: 'CSS basics...', slug: 'frontend' },
  { title: 'Working with APIs', content: 'REST vs GraphQL...', slug: 'backend' },
];

async function seedPosts(client) {
  await client.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        category_id INT REFERENCES categories(id) ON DELETE CASCADE,
        up_votes INT DEFAULT 0,
        down_votes INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
  await Promise.all(
    posts.map(async (post) => {
      const results = await client.query('SELECT id FROM categories WHERE slug = $1', [post.slug]);

      if (!results.rows[0]) throw new Error(`Category not found for slug: ${post.slug}`);

      const categoryId = results.rows[0].id;

      await client.query(
        `INSERT INTO posts (title, content, category_id)
         VALUES ($1, $2, $3)
        `,
        [post.title, post.content, categoryId]
      );
    })
  );
}

module.exports = { seedPosts };
