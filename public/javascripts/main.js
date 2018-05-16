function drawSlider (html5Slider){
    noUiSlider.create(html5Slider, {
        start: [10, 30],
        connect: true,
        range: {
            'min': 0,
            'max': 40
        }
    })
}






$(document).ready(function () {

    // load slider
    var html5Slider = document.getElementById('slider');
    drawSlider( html5Slider );


    //var videoPath = video.videoPath.substring(28);
    // load player
    flowplayer('#player', {
        clip: {
            sources: [

                {
                    type: "video/mp4",
                    src: "/existedVdieos/1.mp4"
                }
            ]
        }
    });


   
    var start = document.getElementById('start');
    var end = document.getElementById('end');

    start.addEventListener('change', function () {
        slider.noUiSlider.set([null, this.value]);
    });

    end.addEventListener('change', function () {
        slider.noUiSlider.set([null, this.value]);
    });

    slider.noUiSlider.on('update', function (values, handle) {

        var value = values[handle];

        if (handle) {
            end.value = value;
        } else {
            start.value = value;
        }
    });



});
