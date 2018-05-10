var watermark = require("images");        // use images library to process image to correct format watermark

module.exports.toWatermark = function (req, res, next) {
    // successful

    var inputImg = '/Users/ZL/Desktop/OVE/public/existedWatermark/1.png';
    var outputImg = '/Users/ZL/Desktop/OVE/public/existedWatermark/2.png';

    watermark(inputImg)                       // load iamge as input 
        
        .size(64)                            // 等比缩放图像到64像素宽
  
        .save(outputImg, {                 // 保存图片到文件,图片质量为50
            quality: 50
    });
    res.send('done');
}