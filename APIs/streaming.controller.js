var fs = require('fs');
var multer = require('multer');


var upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function (req, file, cb) {
            //file.originalname上传文件的原始文件名
            var changedName = (new Date().getTime()) + '-' + file.originalname;
            cb(null, changedName);
        }
    })
});

module.exports.uploadWatermark = function (req, res, next){
    upload.single(watermark);
    var file = req.file;

    console.log('文件类型：%s', file.mimetype);
    console.log('原始文件名：%s', file.originalname);
    console.log('文件大小：%s', file.size);
    console.log('文件保存路径：%s', file.path);

    res.send({ ret_code: '0' });
};
    

module.exports.uploadVideo = function (req, res, next) {
    upload.single(video);
    res.send({ ret_code: '0' });
};

module.exports.downloadWatermark = function (req, res, next) {
    var form = fs.readFileSync('./form.html', { encoding: 'utf8' }); //error;
    res.send(form);
};

module.exports.downloadVideo = function () {

};
