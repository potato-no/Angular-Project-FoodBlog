const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const URL_PATTERN = /^https?:\/\/.+$/i;

const recipeSchema = new mongoose.Schema({
    recipeName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    ingredients: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String, 
        required: true, 
        validate: { 
            validator: (value) => URL_PATTERN.test(value),
            message: 'Image URL is not valid!'
        } 
    },
    saves: [{
        type: ObjectId,
        ref: "User"
    }],
    userId: {
        type: ObjectId,
        ref: "User"
    },
    posts: [{
        type: ObjectId,
        ref: "Post"
    }],
}, { timestamps: { createdAt: 'created_at' } });

module.exports = mongoose.model('Recipe', recipeSchema);
