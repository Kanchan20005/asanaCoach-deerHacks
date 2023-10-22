function updateImage() {
  let selectElement = document.getElementById("posture");
  let selectedOption = selectElement.options[selectElement.selectedIndex].value;
  let selectedImage = document.getElementById("selectedImage");

  let imageMap = {
    "tree": "tree.jpg",
    "cobra": "cobra.jpg",
    "warrior": "warrior.jpg",
    "shoulderstand": "shoulderstand.jpg",
  };

  selectedImage.src = imageMap[selectedOption];
}

updateImage();
