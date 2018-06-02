var Video = require('../model/video');

require('../config/db.js');


var videos = [
    new Video({

        title : 'my first video',

        videoPath: '/Users/ZL/Desktop/OVE/public/existedVdieos/1.mp4',

        tags : ['sports','advanture'],

        descriptions : 'this video is just for test further'

    }),
    
    new Video({

        title: 'my second video',

        videoPath: '/Users/ZL/Desktop/OVE/public/existedVdieos/2.mp4',

        tags: ['sports', 'advanture'],

        descriptions: 'this video is just for test further'

    }),

    new Video({

        title: 'my third video',

        videoPath: '/Users/ZL/Desktop/OVE/public/existedVdieos/3.mp4',

        tags: ['sports', 'advanture'],

        descriptions: 'this video is just for test further'

    })
];

var done = 0;
for (var i = 0; i < videos.length; i++){
    videos[i].save(function (err, result) {
        done++;
        if(done === videos.length){
            exit();
        }
    });
}
function exit() {
    //mongoose.disconnect();
}
