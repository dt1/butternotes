import * as opensheetmusicdisplay from  './opensheetmusicdisplay.min.js';

function handleFileSelect(xml) {
    var openSheetMusicDisplay = new opensheetmusicdisplay.OpenSheetMusicDisplay("osmdCanvas",
                                                                                {backend: "svg",
                                                                                 drawFromMeasureNumber: 1,
                                                                                 drawUpToMeasureNumber: Number.MAX_SAFE_INTEGER,
                                                                                 drawPartNames: false
                                                                                },
                                                                                
                                                                               );


    openSheetMusicDisplay.load(xml).then(
        function() {
            openSheetMusicDisplay.render();
        }
    );
}

export { handleFileSelect };
