var mongoose = require('mongoose');
var schema = mongoose.Schema;

var Video = new schema({
    
    title : { type: String, required: true },
    videoPath : { type: String, required: true },
    tags : {  type: [String] },
    descriptions : { type: String },
    coverThumb : { type: String },
    trackThumbs : { type: String },  
    duration: { type: Number },
    createTime : {
        type: Date,
        default: Date.now
    }

});

module.exports = mongoose.model('video', Video);
 
