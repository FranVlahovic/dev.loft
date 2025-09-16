const { getAllCategories } = require('../db/categoryQueries');

async function fetchCategories(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { fetchCategories };
