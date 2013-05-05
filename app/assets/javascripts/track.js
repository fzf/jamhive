function playAll() {
  $('audio').each(function(index){
    this.play();
  });
}

$(function() {
  $('.wavedisplay').each(function(index){
    console.log($(this).attr('dataaudiourl'));
  });
});

var onFail = function(e) {
  console.log('Rejected!', e);
};

var onSuccess = function(blob) {
  var context = new webkitAudioContext();
  var mediaStreamSource = context.createMediaStreamSource(blob);
  recorder = new Recorder(mediaStreamSource, {workerPath: '/assets/recorderjs/recorderWorker.js'});
  recorder.record();

  // audio loopback
  // mediaStreamSource.connect(context.destination);
};

window.URL = window.URL || window.webkitURL;
navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

var recorder;
var audio = document.querySelector('audio');

function startRecording() {
  if (navigator.getUserMedia) {
    navigator.getUserMedia({audio: true}, onSuccess, onFail);
  } else {
    console.log('navigator.getUserMedia not present');
  }
}

function drawWave( buffers ) {
    var canvas = document.getElementById( "wavedisplay" );
    drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), buffers[0] );
}


function drawThisWave(file) {
  recLength = file.length;
  var result = new Float32Array(recLength);
  var offset = 0;
  for (var i = 0; i < file.length; i++){
    result.set(file[i], offset);
    offset += file[i].length;
  }
  drawBuffer( canvas.width, canvas.height, canvas.getContext('2d'), result );
}

function drawBuffer( width, height, context, data ) {
    var step = Math.ceil( data.length / width );
    var amp = height / 2;
    context.fillStyle = "silver";
    for(var i=0; i < width; i++){
        var min = 1.0;
        var max = -1.0;
        for (j=0; j<step; j++) {
            var datum = data[(i*step)+j];
            if (datum < min)
                min = datum;
            if (datum > max)
                max = datum;
        }
        context.fillRect(i,(1+min)*amp,1,Math.max(1,(max-min)*amp));
    }
}

function stopRecording() {
  recorder.stop();
  recorder.exportWAV(function(blob) {
    blob_url = window.URL.createObjectURL(blob[0]);
    document.querySelector('audio').src = blob_url;
    saveAudio(blob[0], blob[1], blob[2]);
  });
}

function saveAudio(blob, bufferL, bufferR) {
  var formData = new FormData($('#new_song').get(0));
  if(blob){
    formData.append('song[tracks_attributes][0][audio]', blob);
    formData.append('song[tracks_attributes][0][l_buffer]', bufferL);
    formData.append('song[tracks_attributes][0][r_buffer]', bufferR);
    sendForm(formData);
  }
  else {
    window.alert("Invalid audio file");
  }
}

function sendForm(formData){
  console.log('sending data');
  $.ajax({
    url: '/songs/' + songId + '.json',
    type: 'PUT',
    error: function(error){
      console.log('Error: ' + error);
    },
    data: formData,
    success: function(data, text, xhr){
      console.log('success');
    },
    contentType: false,
    processData: false
  });
}
