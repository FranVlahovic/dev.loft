const express = require('express');

const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.fetchAllPosts);
router.get('/top', postsController.fetchTopPosts);

module.exports = router;
