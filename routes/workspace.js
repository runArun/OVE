var express = require ('express');
var router = express.Router();

//  must be recognized user operation 
// router.user('/',   isauthenticated()? )


router.get('/', function (req, res, next) {

    res.render('workspace');

});

module.exports = router;