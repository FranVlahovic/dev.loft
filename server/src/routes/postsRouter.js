const express = require('express');
const { body } = require('express-validator');

const router = express.Router();
const postsController = require('../controllers/postsController');

router.get('/', postsController.fetchAllPosts);
router.get('/top', postsController.fetchTopPosts);
router.post(
  '/',
  [
    body('categoryId')
      .notEmpty()
      .withMessage('Category is required')
      .isInt()
      .withMessage('Category ID must be a number'),
    body('title')
      .notEmpty()
      .withMessage('Title is required')
      .isLength({ max: 30 })
      .withMessage('Title must be under 30 characters'),
    body('content')
      .notEmpty()
      .withMessage('Content is required')
      .isLength({ max: 150 })
      .withMessage('Content must be under 150 characters'),
  ],
  postsController.addPost
);
router.post('/:id/vote', postsController.voteOnPost);
module.exports = router;
