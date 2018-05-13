var express = require ('express');
var router = express.Router();

var Video = require('../model/video');
//  must be recognized user operation 
// router.user('/',   isauthenticated()? )


router.get('/:id', function (req, res, next) {

    var videoId = req.params.id;
    console.log(videoId);

    Video.findById(videoId, function(err, video){
        if (err) {
            return res.redirect('/videos');
        }
        //res.redirect('/workspace')
        //res.render('workspace', { video: video });
        res.render('workspace', {video : video})
        console.log(videoId);
    })
})
    














module.exports = router;