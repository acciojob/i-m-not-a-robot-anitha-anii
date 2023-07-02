//your JS code here. If required.
// Images API endpoint
const apiUrl = 'https://picsum.photos/150';

// Get random index for repeating image
function getRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

// Shuffle array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Render images
function renderImages() {
  const images = document.querySelectorAll('.container img');
  const imageSrcs = [];

  // Get random index for repeating image
  const repeatIndex = getRandomIndex(images.length);

  // Fetch unique image URLs
  for (let i = 0; i < images.length; i++) {
    if (i === repeatIndex) {
      imageSrcs.push(imageSrcs[getRandomIndex(imageSrcs.length)]);
    } else {
      imageSrcs.push(`${apiUrl}?random=${i}`);
    }
  }

  // Shuffle image URLs
  shuffleArray(imageSrcs);

  // Assign image URLs to img elements
  images.forEach((img, index) => {
    img.src = imageSrcs[index];
  });
}

// Reset state
function resetState() {
  const images = document.querySelectorAll('.container img');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');

  images.forEach((img) => {
    img.classList.remove('selected');
    img.removeEventListener('click', handleClick);
  });

  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  para.textContent = '';

  renderImages();
}

// Handle image click
function handleClick(event) {
  const selectedImages = document.querySelectorAll('.container img.selected');
  const resetButton = document.getElementById('reset');
  const verifyButton = document.getElementById('verify');
  const para = document.getElementById('para');

  if (selectedImages.length === 0) {
    event.target.classList.add('selected');
    resetButton.style.display = 'block';
  } else if (selectedImages.length === 1 && !selectedImages[0].isEqualNode(event.target)) {
    event.target.classList.add('selected');
    verifyButton.style.display = 'block';
  }

  if (selectedImages.length === 1) {
    verifyButton.addEventListener('click', () => {
      const selectedImgSrc1 = selectedImages[0].src;
      const selectedImgSrc2 = event.target.src;

      if (selectedImgSrc1 === selectedImgSrc2) {
        para.textContent = 'You are a human. Congratulations!';
      } else {
        para.textContent = 'We can\'t verify you as a human. You selected the non-identical tiles.';
      }

      verifyButton.style.display = 'none';
    });
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.container img');
  const resetButton = document.getElementById('reset');

  renderImages();

  images.forEach((img) => {
    img.addEventListener('click', handleClick);
  });

  resetButton.addEventListener('click', resetState);
});