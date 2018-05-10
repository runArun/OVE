//import { start } from "repl";

//var async = require('async');

var ffmpeg = require('fluent-ffmpeg');

var command = function ( input ){

    return ffmpeg( input )
        .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
        .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
        .on('error', err => console.log('An error occurred: ' + err.message))
        .on('end', () => console.log('Processing finished !'))

}


module.exports.getInfo = function (req, res, next) {

    var input = '/Users/ZL/Desktop/OVE/public/existedVdieos/videoplayback.mp4' //change!!!!

    ffmpeg.ffprobe(input, (err, metadata) => {
        console.log(err + '============');

        console.dir(metadata);

        res.json(metadata);
    })

}


module.exports.convert = function (req, res, next) {
    
    var inputVideo = "/Users/ZL/Desktop/OVE/public/existedVdieos/new.avi";

    var promise = new Promise( function(resolve, reject){

        var command = ffmpeg(inputVideo)

        .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
        .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
        .on('error', err => console.log('An error occurred: ' + err.message))
        .on('end', () => console.log('Processing finished !'))

        .save('/Users/ZL/Desktop/OVE/public/existedVdieos/im-new-5.mp4')

    })
}


module.exports.merge = function (req, res, next) {

    //let output = args[0];

    var i1 = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';
    var i2 = '/Users/ZL/Desktop/OVE/public/existedVdieos/2.mp4'
    ffmpeg(i1)

        .input(i2)

        .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
        .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
        .on('error', err => console.log('An error occurred: ' + err.message))
        .on('end', () => console.log('Processing finished !'))

        .mergeToFile('/Users/ZL/Desktop/OVE/public/existedVdieos/3.mp4');
        
    
    // for (i = 0, i < args.length, i++;) {
    //     output += ffmpeg(output)
    //         .input(args[i])
    //         .on('error', err => console.log('An error occuered: ' + err.message))
    //         .on('end', () => console.log('Merging finished'))
    // }

    // output.mergeToFile(, path)

    
    res.send('done');

}



module.exports.trim = function (req, res, next) {

    var i = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';

    ffmpeg(i)
        .seekInput(150)     // set start time
        
        .setDuration(150)   // 150 - 300
        .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
        .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
        .on('error', err => console.log('An error occurred: ' + err.message))
        .on('end', () => console.log('Processing finished !'))

        .save('/Users/ZL/Desktop/OVE/public/existedVdieos/trim.mp4')
}

module.exports.slowMotion = function (req, res, next) {
    var inputV = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';
    var outputV = '/Users/ZL/Desktop/OVE/public/existedVdieos/10.mp4';

    command(inputV)

        
        //.outputFPS(2)// lost 1/2 frames
        .save(outputV)


}

module.exports.addWatermark = function (req, res, next) {

    var inputV = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';
    var watermark = '/Users/ZL/Desktop/OVE/public/existedWatermark/2.png';
    
    // ffmpeg(inputV)

    //     .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
    //     .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
    //     .on('error', err => console.log('An error occurred: ' + err.message))
    //     .on('end', () => console.log('Processing finished !'))
    command(inputV)

        .input(watermark)

        .videoCodec('libx264')

        .outputOptions('-pix_fmt yuv420p')

        .complexFilter([
            "[0:v]scale=640:-1[bg];[bg][1:v]overlay=W-w-10:H-h-10"
        ])
        
        .save('/Users/ZL/Desktop/OVE/public/existedVdieos/5.mp4')

        res.send('done');
        
};