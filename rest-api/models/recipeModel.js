const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const URL_PATTERN = /^https?:\/\/.+$/i;

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true,
        minlength: [5, 'Recipe name should be at least 5 characters!'],
        maxlength: [30, 'Recipe name should be less than 30 characters!']
    },
    description: {
        type: String,
        required: true,
        minlength: [20, 'Description should be at least 20 characters!'],
        maxlength: [200, 'Description should be less than 200 characters!']
    },
    ingredients: {
        type: String,
        required: true,
        minlength: [10, 'Ingredients should be at least 10 characters!'],
        maxlength: [100, 'Ingredients should be less than 100 characters!']
    },
    imgUrl: {
        type: String, 
        required: true, 
        validate: {  
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image URL is not valid!'
        } 
    },
    likes: [{
        type: ObjectId,
        ref: "User" 
    }],
    saves: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
});

module.exports = mongoose.model('Recipe', recipeSchema);
