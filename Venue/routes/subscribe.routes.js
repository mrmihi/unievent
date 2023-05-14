const express = require('express');

const {
    manageSubscription,
    getSubscriptions
}
= require('../controllers/subscribe.controller');

const subscribeRouter = express.Router();

subscribeRouter.post('/venue/:id', manageSubscription);
subscribeRouter.get('/venue/:id', getSubscriptions);

module.exports = subscribeRouter;
