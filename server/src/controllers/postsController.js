const { getAllPosts } = require('../db/postsQueries');

async function fetchAllPosts(req, res) {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchPostsByCategoryId(req, res) {
  //
}

async function fetchTopPosts(req, res) {
  //
}

async function searchPostsByCategory(req, res) {
  //
}

module.exports = { fetchPostsByCategoryId, searchPostsByCategory, fetchAllPosts, fetchTopPosts };
