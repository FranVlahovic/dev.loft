const express = require('express');

const router = express.Router();
const categoryController = require('../controllers/categoryController');

router.get('/', categoryController.fetchCategories);

module.exports = router;
