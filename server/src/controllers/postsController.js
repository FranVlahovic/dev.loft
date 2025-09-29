const {
  getAllPosts,
  getPostsByCategorySlug,
  getTopPosts,
  getSearchedPosts,
} = require('../db/postsQueries');

async function fetchAllPosts(req, res) {
  try {
    const posts = await getAllPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchPostsByCategory(req, res) {
  const { slug } = req.params;
  try {
    const categoryPosts = await getPostsByCategorySlug(slug);
    if (categoryPosts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this category' });
    }
    res.status(200).json(categoryPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function fetchTopPosts(req, res) {
  try {
    const topPosts = await getTopPosts();
    res.status(200).json(topPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function searchPostsByCategory(req, res) {
  const { slug } = req.params;
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Query parameter is required' });
  }

  try {
    const searchedPosts = await getSearchedPosts(slug, q);

    if (searchedPosts.length === 0) {
      return res.status(404).json({ message: 'No posts found for this query' });
    }

    res.status(200).json(searchedPosts);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { fetchPostsByCategory, searchPostsByCategory, fetchAllPosts, fetchTopPosts };
