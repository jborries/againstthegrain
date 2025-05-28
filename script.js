const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const angle = 0;

document.getElementById('imageUpload').addEventListener('change', handleImageUpload);

function handleImageUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const img = new Image();
  img.onload = () => {
    // Resize canvas to image
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0);

    //Add function that compares the uploaded image to the test dataset here. This will output our grain angle(s).
    //getGrainAngles(file) {
    //Send file to api? Or is it all local?
    //angle = returned value from api?
    //return angle 
    //}

    // Example: Assume grain angle is 45 degrees
    drawCuttingLines(90, 90);  // Replace 45 with model output later
  };
  img.src = URL.createObjectURL(file);
}

function drawCuttingLines(grainAngleDegrees, spacing = 30) {
  const width = canvas.width;
  const height = canvas.height;

  const cutAngleDeg = (grainAngleDegrees + 90) % 180;
  const cutAngleRad = (cutAngleDeg * Math.PI) / 180;

  const dx = Math.cos(cutAngleRad);
  const dy = Math.sin(cutAngleRad);

  const perpDx = -dy;
  const perpDy = dx;

  const centerX = width / 2;
  const centerY = height / 2;

  const numLines = Math.ceil(Math.sqrt(width ** 2 + height ** 2) / spacing);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 5;

  for (let i = -numLines; i <= numLines; i++) {
    const offsetX = perpDx * i * spacing;
    const offsetY = perpDy * i * spacing;

    const startX = centerX + offsetX - dx * 1000;
    const startY = centerY + offsetY - dy * 1000;
    const endX = centerX + offsetX + dx * 1000;
    const endY = centerY + offsetY + dy * 1000;

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
}
