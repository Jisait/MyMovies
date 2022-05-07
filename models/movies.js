var mongoose = require('mongoose')

var movieSchema = mongoose.Schema({
    
    Nom: String,
    img: String,
                                    
                                    });

var movieModel = mongoose.model('movies', movieSchema);
module.exports = movieModel;