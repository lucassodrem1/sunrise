const db = require('../db/index');
const AppError = require('../utils/AppError');
const categoryService = require('./categoryService');

exports.getMessages = async () => {
  const { rows: messages } = await db.query(
    `SELECT messages.*, cat.name AS category_name FROM messages 
    INNER JOIN categories cat ON cat.id = messages.category_id
    ORDER BY upvotes DESC`
  );

  return messages;
};

exports.getBestMessagesOf = async query => {
  let { time } = query;
  let messages = [];

  // If user pass an allowed time, filter the messages
  // before send it to the client.
  const allowedTimes = {
    day: '24 HOURS',
    week: '7 DAYS',
  };

  if (time && allowedTimes[time]) {
    const { rows } = await db.query(
      `SELECT * FROM messages 
      INNER JOIN categories cat ON cat.id = messages.category_id
      WHERE created_at BETWEEN NOW() - INTERVAL '${allowedTimes[time]}' AND NOW()
      ORDER BY upvotes DESC`
    );

    messages = rows;
  }

  return messages;
};

exports.addMessage = async body => {
  const { user_id: userId, text, category_id: categoryId } = body;

  await categoryService.getCategoryById(categoryId);

  await db.query(
    'INSERT INTO messages (user_id, text, category_id) VALUES ($1, $2, $3)',
    [userId, text, categoryId]
  );
};

exports.upvote = async messageId => {
  const { rowCount } = await db.query(
    'UPDATE messages SET upvotes = upvotes + 1 WHERE id = $1',
    [messageId]
  );

  if (!rowCount) throw new AppError('Este comentário não existe.', 404);
};

exports.downvote = async messageId => {
  const { rowCount } = await db.query(
    'UPDATE messages SET downvotes = downvotes + 1 WHERE id = $1',
    [messageId]
  );

  if (!rowCount) throw new AppError('Este comentário não existe.', 404);
};
