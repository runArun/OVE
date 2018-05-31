var ffmpeg = require('fluent-ffmpeg');

var command = function ( input ){

    return ffmpeg( input )
        .on("start", commandLine => console.log("Spawned ffmpeg with command:" + commandLine))
        .on("progress", progress => console.log('progressing: ' + progress.percent + '% have been done'))
        .on('error', err => console.log('An error occurred: ' + err.message))
        .on('end', () => console.log('Processing finished !'))

}

module.exports.getInfo = function (req, res, next) {

    var input = '/Users/ZL/Desktop/track/trimf.mp4' //change!!!!
    
    ffmpeg.getAvailableFilters(function (err, filters) {
        console.log("Available filters:");
        console.dir(filters);
    });

    ffmpeg.ffprobe(input, (err, metadata) => {
        console.log(err + '============');

        console.dir(metadata);

        res.json(metadata);
    })


}

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
       

        .save('/Users/ZL/Desktop/OVE/public/existedVdieos/webmvideo.webm')

    
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

    var i = '/Users/ZL/Desktop/OVE/public/existedVdieos/5.mp4';

    command(i)

        .seekInput(0)     // set start time
        .setDuration(15)   // 150 - 300
        

        .save('/Users/ZL/Desktop/track/trimff.mp4')
}

module.exports.slowMotion = function (req, res, next) {
    var inputV = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';
    var outputV = '/Users/ZL/Desktop/OVE/public/existedVdieos/10.mp4';


        
    command(inputV)
        .videoFilter('setpts=1/2*PTS') //
        .save('/Users/ZL/Desktop/OVE/public/existedVdieos/5.mp4')



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

module.exports.thumbs= function (req, res, next) {  //get cover thumbnail

    var i = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';

    ffmpeg(i)
       
        
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
        .takeScreenshots({ count: 2, timemarks: ['00:00:02.000', '6'], size: '150x100', filename: 'thumbnail-at-%s-seconds.png', }, '/Users/ZL/Desktop/OVE/public/existedWatermark');
        //.takeScreenshots({ count: 1, timemarks: ['00:00:02.000'], size: '150x100' }, '/Users/ZL/Desktop/OVE/public/existedWatermark');

};
      
module.exports.thumbsP= function (req, res, next) {  //get track thumbnails

    var i = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';

    ffmpeg(i)
       
        
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
        .videoFilter('fps=fps=1/20') //
        .size('150x100')
        .save('/Users/ZL/Desktop/OVE/public/images/out%d.png')

    
}

module.exports.clip = function (path, st, et, speed, name, cb) {
    var duration = et - st ;
   
    var pre = '/Users/ZL/Desktop/OVE/public/';
    
    path = pre.concat(path).trim();

    var i = '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4';



    command(path)
        
        .seekInput(st)     // set start time
        .setDuration(duration)   // 150 - 300
        .videoFilter('setpts='+speed+'*PTS') //
        .save('/Users/ZL/Desktop/OVE/public/existedWatermark/'+name+'.mp4');

    cb();
}
