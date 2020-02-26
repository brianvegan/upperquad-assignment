
// class Weather {
//     constructor(options) {
        
//         this.apiKey = options.apiKey;
//         this.prompt = document.querySelector(options.prompt);
//         this.accept = document.querySelector(options.prompt+ '.accept');
//         this.decline = document.querySelector(options.prompt+ '.decline');
//         this.connectionUrl = 'https://api.darksky.net/forecast/%APIKEY%/%LAT%,%LNG%';
//         this.latitude = null;
//         this.longitude = null;

//         this.handlePermission();
//     }

//     async connect() {
//         console.log(this.connectionUrl);
//     }

//     revealPosition(event) {
//         console.log(this);
//     }
//     positionDenied() {
//         result.state = 'granted';
//         console.log('positionDenied');
//     }

//     handlePermission() {

//         const geoSettings = {

//         };
//     }
    
// }

let hasPermission = false;

function closeGeoFindMe(event) {
    document.querySelector('.geo').classList.remove('on');
}

function geoFindMe(event) {
    const prompt = document.querySelector('.geo');
    const master = document.querySelector('#weatherReport');
    const proxyUrl = 'proxy.php';
    apiKey = '3e6e8dd9626655f165b425c5ee6f42d4';
    const status = document.querySelector('.geoStatus');
    let apiUrl = '';
  
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;

        apiUrl = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;

        status.textContent = 'Gotcha!';
        hasPermission = true;

        var xmlhttp = new XMLHttpRequest();
        
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var weatherPayload = JSON.parse(this.responseText);
                //console.log(weatherPayload.currently.summary);
                master.querySelector('.current-summary').textContent += weatherPayload.currently.summary;
                master.querySelector('.current-temperature span').textContent += weatherPayload.currently.temperature+'F degress'
                master.querySelector('.current-wind-speed span').textContent += weatherPayload.currently.windSpeed+'mph'
                const humidityPercentage = (weatherPayload.currently.humidity*100).toFixed(2);
                master.querySelector('.current-humidity span').textContent += humidityPercentage+'% humidity';

                const curTemp = weatherPayload.currently.temperature;
                const heatColors = ['#F00','#F93','#3CF','#30F'];
                const heatRange = 120;
                let curQuadrant;
                const heatColor = curTemp >= heatRange*.5 ? 
                                    ( curTemp >= heatRange*.75 ?  heatColors[0] : heatColors[1] ) :
                                    ( curTemp >= heatRange*.25 ?  heatColors[2] : heatColors[3]) ;

                var skycons = new Skycons({"color": heatColor});
                skycons.add("current-condition", weatherPayload.currently.icon);
                skycons.play();

                master.querySelector('.data-layout').classList.add('on');
                master.querySelector('.preloading-prompt').classList.remove('on');
            }
        };

        xmlhttp.open("GET", 'proxy.php?apiUrl='+apiUrl, true);
        xmlhttp.send();

        prompt.classList.remove('on'); // move to controller or make event dispatch
    }
    
    function error() {
      status.textContent = 'Could not get your geo! :(';
    }
  
    if (!navigator.geolocation) {
      status.textContent = 'Geolocation is not supported';
    } else {
      status.textContent = 'Locating';
      navigator.geolocation.getCurrentPosition(success, error);
    }
  }

  navigator.permissions.query({name:'geolocation'}).then(function(result) {
    if (result.state == 'granted') {
      hasPermission = true;
      geoFindMe();
    }
  });

  document.querySelector('.geo .allow').addEventListener('click', geoFindMe);
  document.querySelector('.geo .decline').addEventListener('click', closeGeoFindMe);