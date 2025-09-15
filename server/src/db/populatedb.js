const { Client } = require('pg');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const categories = [
  { title: 'All Posts', description: 'Browse everything', slug: 'all-posts' },
  {
    title: 'Frontend Development',
    description: 'UI, UX, HTML, CSS, JS frameworks',
    slug: 'frontend',
  },
  {
    title: 'Backend Development',
    description: 'Servers, APIs, business logic',
    slug: 'backend',
  },
  {
    title: 'Databases',
    description: 'SQL, NoSQL, data modeling',
    slug: 'databases',
  },
  {
    title: 'Architecture & APIs',
    description: 'System design, REST, GraphQL',
    slug: 'architecture-apis',
  },
  {
    title: 'DevOps & Deployment',
    description: 'CI/CD, containers, cloud hosting',
    slug: 'devops-deployment',
  },
  {
    title: 'Security',
    description: 'Auth, encryption, vulnerabilities',
    slug: 'security',
  },
  {
    title: 'Testing & QA',
    description: 'Unit, integration, E2E testing',
    slug: 'testing-qa',
  },
  {
    title: 'Version Control',
    description: 'Git, branching strategies, workflows',
    slug: 'version-control',
  },
  {
    title: 'Mobile Development',
    description: 'iOS, Android, cross-platform tools',
    slug: 'mobile-development',
  },
  {
    title: 'AI & Machine Learning',
    description: 'Models, data science, tools',
    slug: 'ai-ml',
  },
  {
    title: 'Career & Interviews',
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
