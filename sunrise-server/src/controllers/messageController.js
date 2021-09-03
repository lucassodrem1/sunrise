const catchAsync = require('../utils/catchAsync');
const messageService = require('../services/messageService');

exports.getMessages = catchAsync(async (req, res, next) => {
  const messages = await messageService.getMessages(req.query);

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: messages,
  });
});

exports.getBestMessagesOf = catchAsync(async (req, res, next) => {
  const messages = await messageService.getBestMessagesOf(req.query);

  res.status(200).json({
    status: 'success',
    results: messages.length,
    data: messages,
  });
});

exports.addMessage = catchAsync(async (req, res, next) => {
  await messageService.addMessage(req.body);

  res.status(201).json({
    status: 'success',
    message: 'Mensagem adicionada!',
  });
});

exports.upvote = catchAsync(async (req, res, next) => {
  await messageService.upvote(req.params.messageId);

  res.status(200).json({
    status: 'success',
    message: 'Upvote adicionado!',
  });
});

exports.downvote = catchAsync(async (req, res, next) => {
  await messageService.downvote(req.params.messageId);

  res.status(200).json({
    status: 'success',
    message: 'Downvote adicionado!',
  });
});
