$(document).ready(function () {
    
    // load slider

    // load player
    var path = $("#path").html().substring(28);
    console.log(path);

    flowplayer('#player', {
        clip: {
            sources: [

                {
                    type: "video/mp4",
                    src: path
                }
            ]
        }
    });

    // link input range with start and end

    var api = flowplayer();
    
    $(document).on('input','#myRange',function(){
        // 
        var value = $('#myRange').val();
        value = value*502/3750;
        var min = Math.floor(value / 60);
        var sec = parseInt(value % 60);
        $("#time").val(min + ' min ' + sec + ' seconds');

        // control flowplayer
        api.pause().seek(value);
    });


    $(document).on('click','#start',function(){
        var value = $('#time').val();
        $('#startI').val(value);
    });

    $(document).on('click', '#end', function () {
        var value = $('#time').val();
        $('#endI').val(value);
    });
    
    $(document).on('click', '#reset', function () {
        $('#startI').val('');
        $('#endI').val('');
    });
    
    $(document).on('click', '#confirm', function () {

        var path = $("#path").html().substring(29); 
        var speed = $('#speed').val();
        var name = $('#name').val();
        
        var startStr = $('#startI').val();
        var arr1 = startStr.match(/\d+(.\d+)?/g);
        var startT = parseInt(arr1[0])*60+parseInt(arr1[1]);

        var endStr = $('#endI').val();
        var arr2 = endStr.match(/\d+(.\d+)?/g);
        var endT = parseInt(arr2[0]) * 60 + parseInt(arr2[1]);
        $.get('/workspace/clip',{
            path:path,
            startT:startT,
            endT:endT,
            speed:speed,
            name:name
        }, data => { 
            console.log(data);
            //  $("#clips")
            //     .find('')
        });
    });

    $(document).on('click','#merge',() => {
        $.get('/workspace/merge');
    });

    $(document).on('click','#index',() => {
        $.get('/');
    });



});


