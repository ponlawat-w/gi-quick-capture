const video = document.getElementById('video');
video.setAttribute('autoplay', '');
video.setAttribute('muted', '');
video.setAttribute('playsinline', '');

navigator.mediaDevices.getUserMedia({ video: true })
  .then(function (stream) {
    video.srcObject = stream;
    video.onloadedmetadata = function () {
      video.play();
    };
  })
  .catch(function (err) {
    alert('Error occurred: ' + err.name);
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
