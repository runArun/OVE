var fse = require('fs-extra');
var multer = require('multer');

var storagevideo = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/Users/zl/Desktop/OVE/public/videos');   
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null,  file.fieldname + '-' + Date.now()+ '.' + file.originalname.substring(file.originalname.lastIndexOf(".")+1));
    }
});

var storageimage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/Users/zl/Desktop/OVE/public/workspace/watermark');   
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
        cb(null,  file.fieldname + '-' + Date.now()+ '.' + file.originalname.substring(file.originalname.lastIndexOf(".")+1)); 
    }
});

module.exports.uploadV = multer({ storage: storagevideo });
module.exports.uploadW = multer({ storage: storageimage });
