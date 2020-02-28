let hasPermission = false;

function getGeoClose(event) {
    document.querySelector('.geo').classList.remove('on');
}

function getGeo(event) {
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
        
        // proxy to work around CORS restriction
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var weatherPayload = JSON.parse(this.responseText);
                const humidityPercentage = (weatherPayload.currently.humidity*100).toFixed(2);
                const curTemp = weatherPayload.currently.temperature;
                const icon = weatherPayload.currently.icon;
                const heatColors = ['#F00','#F93','#3CF','#30F'];
                const heatRange = 120;
                let curQuadrant;
                
                // set color based on quarter values within the max heatRange: hot, warm, chilly, cold
                const heatColor = curTemp >= heatRange*.5 ? 
                                    ( curTemp >= heatRange*.75 ?  heatColors[0] : heatColors[1] ) :
                                    ( curTemp >= heatRange*.25 ?  heatColors[2] : heatColors[3]) ;

                /* test color sync with other icons */

                // rain
                // const heatColor = heatColors[2];
                // const icon = 'rain';

                // snow
                // const heatColor = heatColors[3];
                // const icon = 'snow';

                var skycons = new Skycons({"color": heatColor});
                skycons.add("current-condition", icon);
                skycons.play();

                master.querySelector('.current-summary').textContent += weatherPayload.currently.summary;
                master.querySelector('.current-temperature span').textContent += weatherPayload.currently.temperature+'F degress'
                master.querySelector('.current-temperature span').setAttribute('style', 'color:'+heatColor)
                master.querySelector('.current-wind-speed span').textContent += weatherPayload.currently.windSpeed+'mph'
                master.querySelector('.current-humidity span').textContent += humidityPercentage+'% humidity';

                master.querySelector('.data-layout').classList.add('on');
                master.querySelector('.preloading-prompt').classList.remove('on');
            }
        };

        xmlhttp.open("GET", 'proxy.php?apiUrl='+apiUrl, true);
        xmlhttp.send();
        console.log('sent');
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
      getGeo();
    }
  });

document.querySelector('.geo .allow').addEventListener('click', getGeo);
document.querySelector('.geo .decline').addEventListener('click', getGeoClose);