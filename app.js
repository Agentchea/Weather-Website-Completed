window.addEventListener('load', ()=> {
let long;
let lat;
let temperatureDescription = document.querySelector(
    ".temperature-description"
    );
let temperatureDegree = document.querySelector(
    ".temperature-degree"
    );
let locationTimezone = document.querySelector (".location-Timezone");

if(navigator.geolocation) {
 navigator.geolocation.getCurrentPosition
 (position => {
  long = position.coords.longitude;
  lat = position.coords.latitude;

  const proxy = 'https://cors-anywhere.herokuapp.com/';
const api =`${proxy}https://api.darksky.net/forecast/c80c197e87076fbd9709349f0ba1d0e8/${lat},${long}`;

fetch (api)
.then(response =>{
    return response.json();
})
.then(data => {
    console.log(data);
    const {temperature, summary, icon} = data.currently;
  //sets DOM elements from the API
  temperatureDegree.textContent = temperature;
  temperatureDescription.textContent = summary;
  locationTimezone.textContent = data.timezone;
  //Set Icon
  setIcons(icon, document.querySelector('.icon'));
});
 }); 
   
} else {
    h1.textContent="hey looks like we ran into an issue";
}
 function setIcons(icon, iconID) {
   const skycons = new Skycons({color: "white"});
   const currentIcon = icon.replace(/-/g, "_").toUpperCase();
   skycons.play();
   return skycons.set(iconID, Skycons[currentIcon]);
 }

});