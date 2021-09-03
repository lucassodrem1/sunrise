const express = require('express');
const rateLimit = require('express-rate-limit');
const messageController = require('../controllers/messageController');

const router = express.Router();

const limiter = rateLimit({
  max: 2,
  windowMs: 60 * 1000,
  message: 'AEEE',
});

router
  .route('/')
  .get(messageController.getMessages)
  .post(messageController.addMessage);

router.route('/best-of').get(messageController.getBestMessagesOf);

router.route('/:messageId/upvote').patch(limiter, messageController.upvote);
router.route('/:messageId/downvote').patch(limiter, messageController.downvote);

module.exports = router;
