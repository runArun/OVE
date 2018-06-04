var express = require('express');
var router = express.Router();

var async = require('async');

var Video = require('../model/video');

var stream = require('../APIs/streaming.controller');
var videoP = require('../APIs/video.process.controller');
var imageP = require('../APIs/image.process.controller');

// list all videos
router.get('/', function (req, res, next) {

    var successMsg = req.flash('success')[0];

    Video.find (  (err, docs) => {

        var videos = [];

        for (var i = 0; i < docs.length; i ++) {
            // console.log(docs[i].createTime)
            // docs[i].createTime = new Date(docs[i].createTime).toDateString();
            // console.log(docs[i].createTime)
            
            videos.push(docs[i]);
        }

        res.render('videos', { videos: videos, successMsg: successMsg, noMessages: !successMsg });
    });
});

router.post('/upload',stream.uploadV.single('video'), function(req, res, next){
    
    var file = req.file;

    
    console.log(file);
        
    videoP.createFrames(file.path,file.filename);
        
    videoP.createCoverThumb(file.path,file.filename);
        
    res.redirect('/videos');
    


});

module.exports = router;