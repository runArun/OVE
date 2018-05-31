var express = require ('express');
var router = express.Router();

var Video = require('../model/video');
var videoP = require('../APIs/video.process.controller.js')
//  must be recognized user operation 
// router.user('/',   isauthenticated()? )

router.get('/video/:id', function (req, res, next) {

    var videoId = req.params.id;
    Video.findById(videoId, function(err, video){
        if (err) {
            return res.redirect('/videos');
        }
        
        res.render('workspace', {video : video})
        
        console.log(videoId);
    })
})
    


router.get('/clip',function(req, res, next){

    var path = req.query.path;
    var st = req.query.startT;
    var et = req.query.endT;
    var speed = req.query.speed;
    var name = req.query.name;

    console.log('/'+path)
    
    

    videoP.clip(path, st, et, speed, name, function(){})
    
    
    
})

module.exports = router;
