/*
brew install imagemagick
brew install graphicsmagick
then use gm
*/
var gm = require('gm');
var fse = require('fs-extra');

var tempDir = '/Users/zl/Desktop/OVE/public/temp/';
var frameTrackDir = '/Users/ZL/Desktop/OVE/public/images/frameTrack/';

module.exports.createWatermark = input => {
    // successful
    gm( input )                       // load iamge as input 
        .resize(64)
        .write(input,err => console.log(err));
};
module.exports.createFramesTrack = name => {

    var input = [];

    var files = fse.readdirSync(tempDir);

    for (var i=1;i<=files.length;i++){
        input.push(tempDir+'out'+i+'.png');
    }

    gm()
        .append(input,true)
        .write(frameTrackDir + name + '.png',err => { 
            if(err) console.log(err);           
            fse.emptyDir(tempDir);
        });  
};
