var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/onlineVideoEditing', function (err){
    
    if(err){
        console.log('WARNING: Failed to connect to mongoDB !');
        console.log(err);
    } else {
        console.log('Successfully connnected to mongoDB !');
    }

});

module.exports = mongoose;