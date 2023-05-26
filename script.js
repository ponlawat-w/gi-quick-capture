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

let compassAngle = -1;
if (window.DeviceOrientationEvent) {
  window.addEventListener('deviceorientation', function(event) {
    var compassdir;

    if(event.webkitCompassHeading) {
      compassdir = event.webkitCompassHeading;  
    }
    else {
      compassdir = event.alpha;
    }
  });
}

setInterval(() => {
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const dataUrl = canvas.toDataURL('image/png');
  img.setAttribute('src', dataUrl);

  document.getElementById('description').innerHTML = `${new Date().toLocaleString()}<br>`
    + `Location: ${Math.round(coords.latitude * 10000000) / 10000000},${Math.round(coords.longitude * 10000000) / 10000000}`
    + `　Orientation: ${compassAngle < 0 ? 'Not available' : compassAngle}`
}, 1000);
