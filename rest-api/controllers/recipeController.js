const { recipeModel } = require('../models');
const { userModel } = require('../models');

function getRecipes(req, res, next) {
    recipeModel.find()
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

function getRecipe(req, res, next) {
    const { recipeId } = req.params;

    recipeModel.findById(recipeId)
        .populate('userId')
        .then(recipes => res.json(recipes))
        .catch(next);
}

function createRecipe(req, res, next) {
    const { recipeName, description, ingredients, imgUrl } = req.body;
    const { _id: userId } = req.user;
    
    recipeModel.create({ recipeName, description, ingredients, imgUrl, userId, saves: [], likes: [] })
    .then(recipe => {
        if (recipe) {
            res.status(200).json(recipe);
        }
        else {
                res.status(401).json({ message: `Create not allowed!` });
            }
        })
        .catch(next);
}
                
function editRecipe(req, res, next) {
    const recipeId = req.params.recipeId;
    const { recipeName, description, ingredients, imgUrl } = req.body;

    recipeModel.findOneAndUpdate({ _id: recipeId }, { recipeName: recipeName, description: description, ingredients: ingredients, imgUrl: imgUrl}, { new: true })
        .then(updatedRecipe => {
            if (updatedRecipe) {
                res.status(200).json(updatedRecipe);
            }
            else {
                res.status(401).json({ message: `Edit not allowed!` });
            }
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

function like(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;

    console.log('like');

    recipeModel.findByIdAndUpdate({ _id: recipeId }, { $addToSet: { likes: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Liked successful!' }))
        .catch(next)
}

function deleteRecipe(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;

    Promise.all([
        recipeModel.findOneAndDelete({ _id: recipeId }),
        userModel.findOneAndUpdate({ _id: userId }, { $pull: { recipes: recipeId } }),
    ])
        .then(([deletedOne, _, __]) => {
            if (deletedOne) {
                res.status(200).json(deletedOne)
            } else {
                res.status(401).json({ message: `Delete not allowed!` });
            }
        })
        .catch(next);
}

function save(req, res, next) {
    const recipeId = req.params.recipeId;
    const { _id: userId } = req.user;

    recipeModel.findByIdAndUpdate({ _id: recipeId }, { $addToSet: { saves: userId } }, { new: true })
        .then(() => res.status(200).json({ message: 'Save successful!' }))
        .catch(next)
}


module.exports = {
    getRecipes,
    createRecipe,
    getRecipe,
    saveRecipe,
    like,
    deleteRecipe,
    editRecipe,
    save
}
