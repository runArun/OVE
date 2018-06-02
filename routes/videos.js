var express = require('express');
var router = express.Router();

var Video = require('../model/video');


router.get('/', function (req, res, next) {

    var successMsg = req.flash('success')[0];

    Video.find ( function (err, docs) {

        var videos = [];

        for (var i = 0; i < docs.length; i ++) {
            // console.log(docs[i].createTime)
            // docs[i].createTime = new Date(docs[i].createTime).toDateString();
            // console.log(docs[i].createTime)
            console.log(docs[i]._id);
            videos.push(docs[i]);
        }

        res.render('videos', { videos: videos, successMsg: successMsg, noMessages: !successMsg });
    });

});






module.exports = router;