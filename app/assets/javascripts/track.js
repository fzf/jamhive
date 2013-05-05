function playAll() {
  $('audio').each(function(index){
    this.play();
  });
}

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

function stopRecording() {
  recorder.stop();
  recorder.exportWAV(function(blob) {
    blob_url = window.URL.createObjectURL(blob);
    document.querySelector('audio').src = blob_url;
    saveAudio(blob);
  });
}

function saveAudio(blob) {
  var formData = new FormData($('#new_song').get(0));
  if(blob){
    formData.append('song[tracks_attributes][0][audio]', blob);
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
