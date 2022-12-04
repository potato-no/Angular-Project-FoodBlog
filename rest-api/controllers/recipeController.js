const { recipeModel } = require('../models');
const { newPost } = require('./postController')

function getRecipes(req, res, next) {
    recipeModel.find()
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipe(req, res, next) {
    const { recipeId } = req.params;

    recipeModel.findById(recipeId)
        .populate({
            path : 'posts',
            populate : {
              path : 'userId'
            }
          })
        .then(recipe => res.json(recipe))
        .catch(next);
}

function createRecipe(req, res, next) {
    const { recipeName, description, ingredients } = req.body;
    const { _id: userId } = req.user;

    recipeModel.create({ recipeName, description, ingredients, userId, saves: [], posts: [] })
        .then(recipe => {
            newPost(postText, userId, recipe._id)
                .then(([_, updatedRecipe]) => res.status(200).json(updatedRecipe))
        })
        .catch(next);
}

function saveRecipe(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;
    recipeModel.findByIdAndUpdate({ _id: recipeId }, { $addToSet: { saves: userId } }, { new: true })
        .then(updatedRecipe => {
            res.status(200).json(updatedRecipe)
        })
        .catch(next);
}

module.exports = {
    getRecipes,
    createRecipe,
    getRecipe,
    saveRecipe,
}
