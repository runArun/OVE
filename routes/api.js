var express = require("express");
var router = express.Router();

var streamingApi = require("../APIs/streaming.controller.js");
var videoApi = require("../APIs/video.process.controller.js");
var watermarkApi = require("../APIs/watermark.process.controller.js");

/*
route.post("/upload/watermark", streamingApi.uploadWatermark);
route.post("/upload/video", streamingApi.uploadVideo);

route.get("/download/watermark", streamingApi.downloadWatermark);
route.get("/download/video", streamingApi.downloadVideo);
*/


// videos processing
router.get('/video/getinfo',videoApi.getInfo);
router.get('/video/convert', videoApi.convert);
router.get('/video/merge', videoApi.merge);
router.get('/video/trim', videoApi.trim);
router.get('/video/addWatermark', videoApi.addWatermark);
router.get('/video/slowMotion', videoApi.slowMotion);

router.get('/video/thumbs', videoApi.thumbs);
router.get('/video/thumbsP', videoApi.thumbsP);



// images => watermark  processing
router.get('/image/toWatermark', watermarkApi.toWatermark);


module.exports = router;