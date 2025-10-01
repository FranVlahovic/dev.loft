async function seedVotes(client) {
  await client.query(`
    CREATE TABLE IF NOT EXISTS votes (
    id SERIAL PRIMARY KEY,
    post_id INT REFERENCES posts(id) ON DELETE CASCADE,
    ip_address TEXT NOT NULL,
    vote_type SMALLINT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(post_id, ip_address)
    );`);
}

module.exports = { seedVotes };
