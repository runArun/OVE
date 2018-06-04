$(document).ready(function () {
    // preset
    $('#loader').hide();
    const log = [];

    // load slider

    // load player
    var path = $("#path").html().substring(28);
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

        $.ajax({
            url: "/workspace/clip",
            type: "get", //send it through get method
            data: { 
                path:path,
                startT:startT,
                endT:endT,
                speed:speed,
                name:name
            },
            beforeSend: function(){
                $('#loader').show();
            },
            progress: function(e){
                if(e.lengthComputable){
                    var percentComplete = e.loaded / e.total;
                    console.log(percentComplete);
                } else {
                    console.log('can;t');
                }
            },
            success: function(data) {
                $('#clipsOl').empty();

                for(let i = 1; i<=data.length;i++){
                    $('#clipsOl').append('<li><i class="icon video"></>'+data[i-1]+'&nbsp'+'</li>');
                }


                $('#loader').hide();
                var message = 'clip from '+startT+' to '+endT+', '+name;
                log.push(message);
                loadLog();
            },
            error: function(xhr) {
                $('#loader').hide();
            }
        });
    });

    $(document).on('click','#merge',() => {
    

        $.ajax({
            url: "/workspace/merge",
            type: "get", //send it through get method
            data: { 
            },
            beforeSend: function(){
                $('#loader').show();
            },
            success: function() {
                $('#loader').hide();
                var message = 'merge operation';
                log.push(message);
                loadLog();
            },
            error: function(xhr) {
                $('#loader').hide();
            }
        });
    });

    $(document).on('click','#export',() => {
        $.get('/workspace/export');
    });

    $(document).on('click','#index',() => {
        $.get('/');
    });


    function loadLog() {
        $('#log').empty();

        for(let i = 1; i<=log.length;i++){
            $('#log').append('<li>'+ log[i-1] +'</li>');
        }
    }
});


