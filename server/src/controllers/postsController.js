const { validationResult } = require('express-validator');
const {
  getAllPosts,
  getPostsByCategorySlug,
  getTopPosts,
  getSearchedPosts,
  insertPost,
} = require('../db/postsQueries');
const { findVote, insertVote, adjustCounters, getPostVotes } = require('../db/votesQueries');

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

async function voteOnPost(req, res) {
  try {
    const postId = req.params.id;
    const { voteType } = req.body;
    const { ip } = req;

    const existingVote = await findVote(postId, ip);

    if (!existingVote) {
      await insertVote(postId, ip, voteType);

      if (voteType === 1) {
        await adjustCounters(postId, 1, 0);
      } else {
        await adjustCounters(postId, 0, 1);
      }
    } else if (existingVote.voteType !== voteType) {
      if (voteType === 1) {
        await adjustCounters(postId, 1, -1);
      } else {
        await adjustCounters(postId, -1, 1);
      }
    }

    const updatedVotes = await getPostVotes(postId);
    res.status(200).json(updatedVotes);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function addPost(req, res) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { categoryId, title, content } = req.body;

    if (!categoryId || !title || !content) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const newPost = await insertPost(categoryId, title, content);

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  fetchPostsByCategory,
  searchPostsByCategory,
  fetchAllPosts,
  fetchTopPosts,
  voteOnPost,
  addPost,
};
