//Drag Drop
let dropArea = document.getElementById('drop-area');
let fromData;

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, preventDefaults, false)
});

function preventDefaults(e) {
    e.preventDefault()
    e.stopPropagation()
}


['dragenter', 'dragover'].forEach(eventName => {
    dropArea.addEventListener(eventName, highlight, false)
});

['dragleave', 'drop'].forEach(eventName => {
    dropArea.addEventListener(eventName, unhighlight, false)
});

function highlight(e) {
    dropArea.classList.add('highlight')
}

function unhighlight(e) {
    dropArea.classList.remove('highlight')
}

dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
    let dt = e.dataTransfer
    let files = dt.files

    handleFiles(files)
}

function handleFiles(files) {
    ([...files]).forEach(uploadFile)
}

function uploadFile(file) {
    let reader = new FileReader();

    reader.onloadend = (e) => {
        
        if(e.target.error)
            return appendToConsole(e.target.error);

            appendToConsole("uploading file...");

        App.store(e.target.result, file.name);
    }

    appendToConsole("start reading file...");
    reader.readAsArrayBuffer(file);
}

//console like window
let consoleWindow = document.getElementById('consoleWindow');

function appendToConsoleWithoutDox(value){
    consoleWindow.innerHTML += value + "<br>";
}

function appendToConsole(value){
    consoleWindow.innerHTML += "Dox> " + value + "<br>";
}