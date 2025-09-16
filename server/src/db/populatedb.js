const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const categories = [
  { title: 'all posts', description: 'Browse everything', slug: 'all-posts' },
  {
    title: 'frontend development',
    description: 'UI, UX, HTML, CSS, JS frameworks',
    slug: 'frontend',
  },
  {
    title: 'backend development',
    description: 'Servers, APIs, business logic',
    slug: 'backend',
  },
  {
    title: 'databases',
    description: 'SQL, NoSQL, data modeling',
    slug: 'databases',
  },
  {
    title: 'architecture & api',
    description: 'System design, REST, GraphQL',
    slug: 'architecture-apis',
  },
  {
    title: 'devops & deployment',
    description: 'CI/CD, containers, cloud hosting',
    slug: 'devops-deployment',
  },
  {
    title: 'security',
    description: 'Auth, encryption, vulnerabilities',
    slug: 'security',
  },
  {
    title: 'testing & qa',
    description: 'Unit, integration, E2E testing',
    slug: 'testing-qa',
  },
  {
    title: 'version control',
    description: 'Git, branching strategies, workflows',
    slug: 'version-control',
  },
  {
    title: 'mobile development',
    description: 'iOS, Android, cross-platform tools',
    slug: 'mobile-development',
  },
  {
    title: 'ai & machine learning',
    description: 'Models, data science, tools',
    slug: 'ai-ml',
  },
  {
    title: 'career & interviews',
    description: 'Job search, resume tips, interview prep',
    slug: 'career-interviews',
  },
];

const insertValues = categories
  .map((c) => `('${c.title}', '${c.description}', '${c.slug}')`)
  .join(',');

const SQL = `
    CREATE TABLE IF NOT EXISTS categories (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        description TEXT,
        slug TEXT UNIQUE NOT NULL
    );

    INSERT INTO categories(title, description, slug)
    VALUES ${insertValues}
`;

async function main() {
  const client = new Client({
    connectionString: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`,
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
}

main();
