const posts = [
  { title: 'Intro to CSS', content: 'Learn the basics of styling with CSS...', slug: 'frontend' },
  {
    title: 'Working with APIs',
    content: 'Understanding REST vs GraphQL for backend dev...',
    slug: 'backend',
  },
  {
    title: 'SQL vs NoSQL',
    content: 'When to use relational vs document databases...',
    slug: 'databases',
  },
  {
    title: 'Designing REST APIs',
    content: 'Best practices for building scalable APIs...',
    slug: 'architecture-apis',
  },
  {
    title: 'CI/CD Pipelines',
    content: 'Automating deployments with GitHub Actions...',
    slug: 'devops-deployment',
  },
  {
    title: 'Intro to Web Security',
    content: 'Top 10 OWASP vulnerabilities explained...',
    slug: 'security',
  },
  {
    title: 'Writing Unit Tests',
    content: 'How to test JavaScript functions with Jest...',
    slug: 'testing-qa',
  },
  {
    title: 'Mastering Git Branching',
    content: 'Feature branches, pull requests, and rebasing...',
    slug: 'version-control',
  },
  {
    title: 'Getting Started with React Native',
    content: 'Build your first cross-platform mobile app...',
    slug: 'mobile-development',
  },
  {
    title: 'Neural Networks Basics',
    content: 'How deep learning models learn from data...',
    slug: 'ai-ml',
  },
  {
    title: 'Ace Your Tech Interview',
    content: 'Tips for system design and coding interviews...',
    slug: 'career-interviews',
  },
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
