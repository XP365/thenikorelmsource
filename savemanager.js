function downloadLocalStorageItem(key, filename) {
  const data = localStorage.getItem(key);
  if (data) {
    // Create a Blob object from the data
    const blob = new Blob([data], { type: 'application/json;charset=utf-8' });
    // Create an anchor element (<a>)
    const link = document.createElement('a');
    // Set the link's href to a URL created from the Blob
    link.href = URL.createObjectURL(blob);
    // Set the download attribute with the desired filename
    link.download = filename;
    // Append the link to the document body and click it to trigger the download
    document.body.appendChild(link);
    link.click();
    // Clean up by removing the link and revoking the object URL
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);
  } else {
    console.error(`Local storage item with key "${key}" not found.`);
  }
}

document.getElementById("downloadButton").addEventListener("click", () => {
        downloadLocalStorageItem("RPG File1", "RPG File1.txt");
        downloadLocalStorageItem("RPG Global", "RPG Global.txt");
    });

document.getElementById('saveButton').addEventListener('click', function() {
    console.log("Save button clicked, triggering file input.");
    const fileInput = document.getElementById('fileInput');
    fileInput.click(); // Programmatically click the hidden file input
});

document.getElementById('fileInput').addEventListener('change', function(e) {
    console.log("File input changed.");
    const fileInput = e.target;
    const file = fileInput.files[0]; // Get the first selected file

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            const fileContent = e.target.result; // Content of the file
            const fileName = file.name;

            // Save the content and name to localStorage
            //localStorage.setItem(fileName, fileContent);
            const base64String = fileContent.split(',')[1];
            const decodedText = atob(base64String);

            localStorage.setItem(fileName, decodedText);
            console.log(`File "${fileName}" content saved to localStorage.`);
        };

        reader.readAsDataURL(file); // Or reader.readAsText(file) for plain text files
    } else {
        console.log('No file selected.');
    }
    // Optionally clear the file input after processing to allow re-selection of the same file
    fileInput.value = ''; 
});


function updateCanvasPositions() {
    // 1. Select all canvas elements
    const canvases = document.querySelectorAll('canvas');

    // 2. Loop through all selected canvas elements
    canvases.forEach(canvas => {
        // 3. Set the top position.
        // The value must be a string with a unit (e.g., "100px").
        canvas.style.top = '0px';
    });

    // 4. Request the next animation frame
    window.requestAnimationFrame(updateCanvasPositions);
}

// 5. Start the animation loop
window.requestAnimationFrame(updateCanvasPositions);

function deleteMscText() {
    const elements = document.querySelectorAll('[id="modeTextBack"]');
    
    elements.forEach(element => {
        element.remove();
    })
}

setInterval(deleteMscText, 1000);