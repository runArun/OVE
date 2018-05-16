var express = require ('express');
var router = express.Router();

var nouislider = require("nouislider");



var Video = require('../model/video');
//  must be recognized user operation 
// router.user('/',   isauthenticated()? )


function slider ( slider ) {
    noUiSlider.create(slider, {
        start: [20, 80],
        connect: true,
        range: {
            'min': 0,
            'max': 100
        }
    })
}


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