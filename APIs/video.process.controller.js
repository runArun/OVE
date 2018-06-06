/*
brew install ffmpeg
then use 
*/
var ffmpeg = require('fluent-ffmpeg');
var path = require('path');
var fse = require('fs-extra');
var async = require('async');

var imageP = require('./image.process.controller');
const clipsName = [];

const clipsDir = '/Users/zl/Desktop/OVE/public/workspace/clips/';
const mergeDir = '/Users/zl/Desktop/OVE/public/workspace/merge/';
const tempDir = '/Users/zl/Desktop/OVE/public/temp/';
const exportDir = '/Users/zl/Desktop/OVE/public/workspace/export/';



const command = input => {

    return ffmpeg( input )
        .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
        .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
        //.on("progress", progress => console.dir(progress))
        .on('error', err => console.log('An error occurred: ' + err.message));
   

};

module.exports.getInfo = path => {

    var input = path;
    
    ffmpeg.getAvailableFilters(function (err, filters) {
        console.log("Available filters:");
        console.dir(filters);
    });

    ffmpeg.ffprobe(input, (err, metadata) => {
        console.log(err + '============');

        console.dir(metadata);

        res.json(metadata);
    });


};
module.exports.convert = function (req, res, next) {
    
    var inputVideo = "/Users/ZL/Desktop/OVE/public/existedVdieos/new.avi";

  
        var command = ffmpeg(inputVideo)

        .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
        .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
        .on('error', err => console.log('An error occurred: ' + err.message))
        .on('end', () => console.log('Processing finished !'))

        .withVideoCodec('libvpx')
        .addOptions(['-qmin 0', '-qmax 50', '-crf 5'])
        .withVideoBitrate(1024)
       

        .save('/Users/ZL/Desktop/OVE/public/existedVdieos/webmvideo.webm');

    
};
module.exports.addWatermark =  watermark => {

    var inputV = mergeDir+'merge.mp4';

    command(inputV)

        .input(watermark)

        .videoCodec('libx264')

        .outputOptions('-pix_fmt yuv420p')

        .complexFilter([
            "[0:v]scale=640:-1[bg];[bg][1:v]overlay=W-w-10:H-h-10"
        ])
        
        .save(exportDir+'export.mp4');
        
};
module.exports.createCoverThumb = ( input, name ) => {  //get cover thumbnail

    ffmpeg(input)
        
        .on('filenames', function (filenames) {
            console.log('screenshots are ' + filenames.join(', '));
        })
        .on('end', function () {
            console.log('screenshots were saved');
        })
        .on('error', function (err) {
            console.log('an error happened: ' + err.message);
        })
        // take 2 screenshots at predefined timemarks and size
        .takeScreenshots(
            {   count: 1, 
                timemarks: ['1'], 
                size: '300x300', 
                filename: name+'.png' 
            }, '/Users/ZL/Desktop/OVE/public/images/coverThumb'
        );
};
module.exports.createFrames = (input,name) => {  //get track thumbnails

    ffmpeg(input)

        .on('filenames', function (filenames) {
            console.log('screenshots are ' + filenames.join(', '));
        })
        .on('end', function () {
            console.log('screenshots were saved');
            imageP.createFramesTrack(name);
            
        })
        .on('error', function (err) {
            console.log('an error happened: ' + err.message);
        })
        // take 2 screenshots at predefined timemarks and size
        .videoFilter('fps=fps=1/20') //
        .size('150x100')
        .save('/Users/ZL/Desktop/OVE/public/temp/out%d.png');    
};
module.exports.clip = (path, st, et, speed, name, cb) => {
    
    var duration = et - st ;

    var pre = '/Users/ZL/Desktop/OVE/public/';

    path = pre.concat(path).trim();

    var outputPath = clipsDir+name+'.mp4';
    
    command(path)

        .seekInput(st)     // set start time
        .setDuration(duration)   // 150 - 300
        .videoFilter('setpts='+speed+'*PTS') //
        .save(outputPath)
        .on('end', () => {
            console.log('Processing finished !');
            clipsName.push(name);
            cb(clipsName);
        });


    
    
};
module.exports.merge = () => {


    var mergedVideo = ffmpeg();

    clipsName.forEach( clip => {
        mergedVideo = mergedVideo.addInput( clipsDir+clip+'.mp4' );
    });

    mergedVideo.mergeToFile( mergeDir+'merge.mp4',tempDir)
    .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
    .on("progress", progress => console.log('progressing:' + progress.percent + '% have been done'))
    .on('error', err => console.log('An error occurred: ' + err.message))
    .on('end');
};

module.exports.exportV = cb => {
    fse.emptyDir(clipsDir);
    fse.emptyDir(mergeDir);
    fse.emptyDir(watermarkDir);
    cb();
};

module.exports.isEmpty = () => {  

    var files1 = fse.readdirSync('/Users/zl/Desktop/OVE/public/workspace/clips/');
    var files2 = fse.readdirSync('/Users/zl/Desktop/OVE/public/workspace/export/');
    var files3 = fse.readdirSync('/Users/zl/Desktop/OVE/public/workspace/merge/');
    var files4 = fse.readdirSync('/Users/zl/Desktop/OVE/public/workspace/watermark/');

    return (files1.length == 0 && files2.length == 0 && files3.length == 0 && files4.length == 0)?
    true:false;

};


