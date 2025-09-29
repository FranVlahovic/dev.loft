const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/categoryController');
const postsController = require('../controllers/postsController');

// category
router.get('/', categoryController.fetchCategories);
router.get('/top', categoryController.fetchTopCategories);

// posts
router.get('/:slug/posts', postsController.fetchPostsByCategory);
router.get('/:slug/search', postsController.searchPostsByCategory);

module.exports = router;
