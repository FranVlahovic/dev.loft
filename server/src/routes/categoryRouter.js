const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/categoryController');
const postsController = require('../controllers/postsController');

// category
router.get('/', categoryController.fetchCategories);
router.get('/top', categoryController.fetchTopCategories);

// posts
router.get('/:id/posts', postsController.fetchPostsByCategoryId);
router.get('/:id/search', postsController.searchPostsByCategory);

module.exports = router;
