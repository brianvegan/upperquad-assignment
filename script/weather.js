
class Weather {
    constructor(options) {
        
        this.apiKey = options.apiKey;
        this.prompt = document.querySelector(options.prompt);
        this.accept = document.querySelector(options.prompt+ '.accept');
        this.decline = document.querySelector(options.prompt+ '.decline');
        this.connectionUrl = 'https://api.darksky.net/forecast/%APIKEY%/%LAT%,%LNG%';
        this.latitude = null;
        this.longitude = null;

        this.handlePermission();
    }

    async connect() {
        console.log(this.connectionUrl);
    }

    revealPosition(event) {
        console.log(this);
        //this.lat = event.coords.latitude; 
        //this.lng = event.coords.longitude; 
    }
    positionDenied() {
        result.state = 'granted';
        console.log('positionDenied');
    }

    handlePermission() {
        //var self = this;
        //const geoBtn = document.querySelector('.geo');
        const geoSettings = {

        };

        // navigator.permissions.query({name:'geolocation'}).then((result) => {
        //     if (result.state == 'granted') {
        //         console.log(result.state);
        //         this.prompt.style.display = 'none';
        //         this.connect
        //     } else if (result.state == 'prompt') {
        //         console.log(result.state);
        //         this.prompt.style.display = 'none';
        //         navigator.geolocation.getCurrentPosition(this.revealPosition,this.positionDenied,geoSettings);
        //     } else if (result.state == 'denied') {
        //         console.log(result.state);
        //         this.prompt.style.display = 'block';
        //     }
        //     result.onchange = function() {
        //         console.log('test');
        //         console.log(result.state);
        //     }
        // });
    }
    
}

let hasPermission = false;

function closeGeoFindMe(event) {
    document.querySelector('.geo').classList.remove('on');
}

function geoFindMe(event) {
    const root = document.querySelector('.geo')
    apiKey = '3e6e8dd9626655f165b425c5ee6f42d4';
    const status = document.querySelector('.geoStatus');
    let href = '';
  
    function success(position) {
      const latitude  = position.coords.latitude;
      const longitude = position.coords.longitude;
  
      href = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;
      
      status.textContent = 'Gotcha!';
      hasPermission = true;
      root.classList.remove('on'); // move to controller or make event dispatch
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

  document.querySelector('.geo .allow').addEventListener('click', geoFindMe);
  document.querySelector('.geo .decline').addEventListener('click', closeGeoFindMe);