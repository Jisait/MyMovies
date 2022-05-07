var mongoose = require('mongoose')

var wishlistSchema = mongoose.Schema({


    Nom: String,

   

});

var wishlistModel = mongoose.model('wishlist', wishlistSchema);

module.exports = wishlistModel;