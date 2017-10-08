var recorder;

start.addEventListener( "click", function(){ recorder.start(); });
pause.addEventListener( "click", function(){ recorder.pause(); });
resume.addEventListener( "click", function(){ recorder.resume(); });
stopButton.addEventListener( "click", function(){ recorder.stop(); });
init.addEventListener( "click", function(){

    if (!Recorder.isRecordingSupported()) {
        return screenLogger("Recording features are not supported in your browser.");
    }

    recorder = new Recorder({
        monitorGain: parseInt(monitorGain.value, 10),
        numberOfChannels: 1,
	bitRate: 128000,
	encoderApplication: 2051,
        encoderSampleRate: 48000,
	encoderComplexity: 10,
	encoderFrameSize: 20,
	bufferLength: 2048,
	resampleQuality: 10,
        encoderPath: "encoderWorker.min.js"
    });

    recorder.addEventListener( "start", function(e){
        screenLogger('Recorder is started');
        init.disabled = start.disabled = resume.disabled = true;
        pause.disabled = stopButton.disabled = false;
    });

    recorder.addEventListener( "stop", function(e){
        screenLogger('Recorder is stopped');
        init.disabled = false;
        pause.disabled = resume.disabled = stopButton.disabled = start.disabled = true;
    });

    recorder.addEventListener( "pause", function(e){
        screenLogger('Recorder is paused');
        init.disabled = pause.disabled = start.disabled = true;
        resume.disabled = stopButton.disabled = false;
    });

    recorder.addEventListener( "resume", function(e){
        screenLogger('Recorder is resuming');
        init.disabled = start.disabled = resume.disabled = true;
        pause.disabled = stopButton.disabled = false;
    });

    recorder.addEventListener( "streamError", function(e){
        screenLogger('Error encountered: ' + e.error.name );
    });

    recorder.addEventListener( "streamReady", function(e){
        init.disabled = pause.disabled = resume.disabled = stopButton.disabled = true;
        start.disabled = false;
        screenLogger('Audio stream is ready.');
    });

    recorder.addEventListener( "dataAvailable", function(e){
        var dataBlob = new Blob( [e.detail], { type: 'audio/ogg' } );
        var fileName = new Date().toISOString() + ".opus";
        var url = URL.createObjectURL( dataBlob );

        var audio = document.createElement('audio');
        audio.controls = true;
        audio.src = url;

        var link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.innerHTML = link.download;

        var li = document.createElement('li');
        li.appendChild(link);
        li.appendChild(audio);

        recordingslist.appendChild(li);
    });

    recorder.initStream();
});

function screenLogger(text, data) {
    log.innerHTML += "\
    " + text + " " + (data || '');
}
