const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.fetchCategories);
router.get('/top', categoryController.fetchTopCategories);

module.exports = router;
