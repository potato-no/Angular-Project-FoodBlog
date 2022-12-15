const express = require('express');
const router = express.Router();
const { auth } = require('../utils');
const { recipeController } = require('../controllers');

// middleware that is specific to this router

router.put('/:recipeId', auth(), recipeController.save);

module.exports = router
