const db = require('../db');
const AppError = require('../utils/AppError');

exports.getCategoryById = async categoryId => {
  const {
    rows: [category],
  } = await db.query('SELECT * FROM categories WHERE id = $1', [categoryId]);

  if (!category) throw new AppError('Categoria inválida!', 404);

  return category;
};
