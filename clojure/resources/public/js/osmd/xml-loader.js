function handleFileSelect() {
    var openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas",
										{backend: "svg",
										 drawFromMeasureNumber: 1,
										 drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER}
									       );
    var xml = document.getElementById("xml");
    openSheetMusicDisplay.load(xml).then(
        function() {
	    openSheetMusicDisplay.render();
        }
    );   
}

document.addEventListener("DOMContentLoaded", handleFileSelect);
