
# audio loopback
# mediaStreamSource.connect(context.destination);
startRecording = ->
  if navigator.getUserMedia
    navigator.getUserMedia
      audio: true
    , onSuccess, onFail
  else
    console.log "navigator.getUserMedia not present"
stopRecording = ->
  recorder.stop()
  recorder.exportWAV (s) ->
    audio.src = window.URL.createObjectURL(s)

onFail = (e) ->
  console.log "Rejected!", e

onSuccess = (s) ->
  context = new webkitAudioContext()
  mediaStreamSource = context.createMediaStreamSource(s)
  recorder = new Recorder(mediaStreamSource)
  recorder.record()

window.URL = window.URL or window.webkitURL
navigator.getUserMedia = navigator.getUserMedia or navigator.webkitGetUserMedia or navigator.mozGetUserMedia or navigator.msGetUserMedia
recorder = undefined
audio = document.querySelector("audio")