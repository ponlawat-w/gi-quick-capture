const video = document.getElementById('video');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');

const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

const img = document.getElementById('img');

let coords = { latitude: 0, longitude: 0 };

const init = async() => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: {
    facingMode: { ideal: 'environment' }
  }});
  if ('srcObject' in video) {
    video.srcObject = stream;
  } else {
    video.src = window.URL.createObjectURL(stream);
  }
  video.play();
  const videoTrack = stream.getVideoTracks()[0];
  canvas.width = videoTrack.getSettings().width;
  canvas.height = videoTrack.getSettings().height;
};
init();

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(showPosition);
} else {
  console.log('Geolocation is not supported by this browser.');
}

function showPosition(position) {
  coords = position.coords;
}

setInterval(() => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');
  img.setAttribute('src', dataUrl);

  document.getElementById('description').innerHTML = `${new Date().toLocaleString()}　Location: ${Math.round(coords.latitude * 100000) / 100000},${Math.round(coords.longitude * 100000) / 100000}`
}, 1000);
