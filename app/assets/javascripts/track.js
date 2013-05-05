var onFail = function(e) {
  console.log('Rejected!', e);
};

var onSuccess = function(s) {
  var context = new webkitAudioContext();
  var mediaStreamSource = context.createMediaStreamSource(s);
  recorder = new Recorder(mediaStreamSource, {workerPath: '/assets/recorderjs/recorderWorker.js'});
  recorder.record();

  // audio loopback
  // mediaStreamSource.connect(context.destination);
}

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
  recorder.exportWAV(function(s) {
    document.querySelector('audio').src = window.URL.createObjectURL(s);
  });
}