const video = document.getElementById('video');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');

navigator.mediaDevices.getUserMedia({ video: {
  facingMode: { ideal: 'environment' }
}, audio: false })
  .then(stream => {
    if ('srcObject' in video) {
      video.srcObject = stream;
    } else {
      video.src = window.URL.createObjectURL(stream);
    }
    video.play();
  }).catch(err => {
    console.error(`Not available!!!!`, err);
  });

if (navigator.geolocation) {
  navigator.geolocation.watchPosition(showPosition);
} else {
  console.log('Geolocation is not supported by this browser.');
}

function showPosition(position) {
  const target = document.getElementById('location');
  target.innerHTML = 'Latitude: ' + position.coords.latitude + '<br>Longitude: ' + position.coords.longitude;
}
