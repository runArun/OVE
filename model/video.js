var mongoose = require('mongoose');
var schema = mongoose.Schema;


var Video = new schema({
    
    title : { type: String, required: true },

    videoPath : { type: String, required: true },
   
    tags : {  type: [String] },
    
    descriptions : { type: String },
    

    coverPage : { type: String },

    thumbnails : { type: String },  

    createTime : {
        type: Date,
        default: Date.now
    }
    // first thumbnail   <=>  cover page
    //'email': { type: String, required: true },

});

module.exports = mongoose.model('video', Video);