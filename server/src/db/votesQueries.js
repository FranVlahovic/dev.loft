const pool = require('./pool');

async function findVote(postId, ip) {
  const result = await pool.query('SELECT * FROM votes WHERE post_id = $1 AND ip_address = $2', [
    postId,
    ip,
  ]);
  return result.rows[0];
}

async function insertVote(postId, ip, voteType) {
  await pool.query('INSERT INTO votes(post_id, ip_address, vote_type) VALUES($1, $2, $3)', [
    postId,
    ip,
    voteType,
  ]);
}

async function adjustCounters(postId, voteUp, voteDown) {
  await pool.query(
    'UPDATE posts SET up_votes = up_votes + $2, down_votes = down_votes + $3 WHERE id = $1',
    [postId, voteUp, voteDown]
  );
}

async function getPostVotes(postId) {
  const result = await pool.query('SELECT up_votes, down_votes FROM posts WHERE id=$1', [postId]);
  return result.rows[0];
}

module.exports = { findVote, insertVote, adjustCounters, getPostVotes };
