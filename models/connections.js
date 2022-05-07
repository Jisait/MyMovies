var mongoose = require('mongoose')

var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
   }
   mongoose.connect('mongodb+srv://JeanCharlesCousin:Smcaen14@clustercousin.2kcjd.mongodb.net/MoviesApp?retryWrites=true&w=majority',
      options,        
      function(err) {
       console.log(err);
      }
   );

