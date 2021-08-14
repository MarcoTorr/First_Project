var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
var userFormEl = document.querySelector('#user-form');

var repoContainerEl = document.querySelector('#repos-container');
var containerWeatherEl = document.querySelector('#Container-weather');
var repoSearchTerm = document.querySelector('#repo-search-term');
var recentSearchEl = document.querySelector('#recent-search');
var recentSearchContainer= document.querySelector("#recent-search-container");
var listRSEl= document.querySelector("#list-rs");
var submitButton = document.querySelector("#button-form");

var destinationEl = document.querySelector('#destination');
var originEl = document.querySelector('#origin');
var airportEl = document.querySelector('#airport');
var startDateEl = document.querySelector('#startDate');
var nameEl = document.querySelector('#name');
var phoneEl = document.querySelector('#phone');
var emailEl = document.querySelector('#email');

var savedName="";
var savedPhone="";
var savedEmail="";
var savedOrigin="";
var savedDestination="";
var savedCurrentDate=""; 
var storedName;
var storedPhone;
var storedEmail;
var storedOrigin;
var storedDestination;
var storedCurrentDate;


function getAirports(event){
  event.preventDefault();
  console.log(document.querySelector('#destination-country').value);
  console.log(document.querySelector('#origin-country').value);

  if(document.querySelector('#origin-country').value === "Mexico") {
    var listMexico=["Mexico City Juarez International","Mexico City Atizapan","Cancun","Guadalajara","Monterrey","Monterrey Gen Mariano Escobedo","Monterrey Aeropuerto Del Norte","Tijuana"];
    var listMexicoId=["MEX-sky","AZP-sky","CUN-sky","GDL-sky","MTYA-sky","MTY-sky","NTR-sky","TIJ-sky"];
    for (i=0;i<9;i++){
      var optionCC = document.createElement('option');
      optionCC.textContent =listMexico[i];
      optionCC.value=listMexicoId[i];
      originEl.appendChild(optionCC);
    }
    
  }else if(document.querySelector('#origin-country').value === "Canada"){
    var listCanada=["Toronto","Toronto Pearson International","Hamilton","Toronto Island","Calgary","Vancouver International","Abbotsford"];
    var listCanadaId=["YTOA-sky","YYZ-sky","YHM-sky","YTZ-sky","YYC-sky","YVR-sky","YXX-sky"];
    for (i=0;i<8;i++){
      var optionCC = document.createElement('option');
      optionCC.value= listCanadaId[i];
      optionCC.textContent =listCanada[i];
      originEl.appendChild(optionCC);
    }
  }else if(document.querySelector('#origin-country').value === "USA"){
    var listUsa=["New York","New York John F. Kennedy","Stewart International","Miami International","Los Angeles International","San Francisco International","Boston Logan International"];
    var listUsaId=["NYCA-sky","JFK-sky","SWF-sky","MIA-sky","LAX-sky","SFO-sky","BOS-sky"];
    for (i=0;i<8;i++){
      var optionCC = document.createElement('option');
      optionCC.textContent =listUsa[i];
      optionCC.value= listUsaId[i];
      originEl.appendChild(optionCC);
    }
  }
  if(document.querySelector('#destination-country').value === "Mexico") {
    var listMexico=["Mexico City Juarez International","Mexico City Atizapan","Cancun","Guadalajara","Monterrey","Monterrey Gen Mariano Escobedo","Monterrey Aeropuerto Del Norte","Tijuana"];
    var listMexicoId=["MEX-sky","AZP-sky","CUN-sky","GDL-sky","MTYA-sky","MTY-sky","NTR-sky","TIJ-sky"];
    for (i=0;i<9;i++){
      var optionC = document.createElement('option');
      optionC.textContent =listMexico[i];
      optionC.value= listMexicoId[i];
      destinationEl.appendChild(optionC);
     
    }
    
  }else if(document.querySelector('#destination-country').value === "Canada"){
    var listCanada=["Toronto","Toronto Pearson International","Hamilton","Toronto Island","Calgary","Vancouver International","Abbotsford"];
    var listCanadaId=["YTOA-sky","YYZ-sky","YHM-sky","YTZ-sky","YYC-sky","YVR-sky","YXX-sky"];
    for (i=0;i<8;i++){
      var optionC = document.createElement('option');
      optionC.value= listCanadaId[i];
      optionC.textContent =listCanada[i];
      destinationEl.appendChild(optionC);
      
    }
  }else if(document.querySelector('#destination-country').value === "USA"){
    var listUsa=["New York","New York John F. Kennedy","Stewart International","Miami International","Los Angeles International","San Francisco International","Boston Logan International"];
    var listUsaId=["NYCA-sky","JFK-sky","SWF-sky","MIA-sky","LAX-sky","SFO-sky","BOS-sky"];
    for (i=0;i<8;i++){
      var optionC = document.createElement('option');
      optionC.textContent =listUsa[i];
      optionC.value= listUsaId[i];
      destinationEl.appendChild(optionC);
     
    }
  }
  
}




//function to submit the destination and origin 
var getInfo = function (event) {
    event.preventDefault();
 
    var startDate = startDateEl.value.trim();

    var destination= destinationEl.value;
    console.log(destination);
    var origin = document.querySelector('#origin').value;


    var destination1= document.querySelector('#destination-country').value;

    repoContainerEl.textContent = '';
    startDateEl.value = '';
  
  
    getFlightRepos(destination,startDate,origin);
    getWeather(destination1);

    localStorage.setItem("name",nameEl.value);
    localStorage.setItem("phone-number",phoneEl.value);
    localStorage.setItem("email",emailEl.value);
    localStorage.setItem("origin",origin);
    localStorage.setItem("destination",destination);
    localStorage.setItem("searched-on-date",currentDate);

}  





// function to obtain the API information
var getFlightRepos = function (destination,startDate,origin) {
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/"+origin+"/"+destination+"/"+startDate+"?inboundpartialdate=", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2a8ef1057fmsh7bff5369e5a3280p1037e6jsn5276ba1cf138",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
    
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayFlights(data, destination,origin,startDate);
            console.log(data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to Skyscanner');
    });
};



var displayFlights = function (reposFlights, destination,origin,startDate) {
    if (reposFlights.length === 0) {
      repoContainerEl.textContent = 'No flights found.';
      return;
    }
  
    repoSearchTerm.textContent = ("Flights found to "+destination+" from " +origin+" leaving on: "+startDate);
      
      var repoNameOrigin = reposFlights.Places[0].Name +", "+ reposFlights.Places[0].CityName;
      var repoNameDestination= reposFlights.Places[1].Name+", " + reposFlights.Places[1].CityName;
      var repoPrice= reposFlights.Quotes[0].MinPrice;
      var repoCompany= reposFlights.Carriers[0].Name;

      

        var repoEl = document.createElement('li');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

  
      var titleEl = document.createElement('span');
      var contentFlights= "Flight leaving from"+" "+ repoNameOrigin +" "+"and landing on "+" "+repoNameDestination+" "+ "for a price of"+" " +repoPrice+" dolars."+" "+"Airline:" +" "+ repoCompany;
      console.log(contentFlights);
      titleEl.textContent =contentFlights;
      repoEl.appendChild(titleEl);
      repoContainerEl.appendChild(repoEl);
  
    
}
    
     

//Weather API
var getWeather = function (destinationInput) {
    fetch("https://weatherapi-com.p.rapidapi.com/forecast.json?q="+destinationInput+"&days=3", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2a8ef1057fmsh7bff5369e5a3280p1037e6jsn5276ba1cf138",
		"x-rapidapi-host": "weatherapi-com.p.rapidapi.com"
	    }
    })
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
              console.log(data);
            displayWeather(data, destinationInput);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to Open Weather Map');
});


 
var displayWeather = function (reposWeather, destinationInput) {
    if (reposWeather.length === 0) {
      repoContainerEl.textContent = 'No information about the weather found for this destination.';
      return;
    }
  
    repoSearchTerm.textContent = ("Weather in :"+destinationInput)
    
      
      var repoName = reposWeather.location.name ;
      var repoForecast= reposWeather.current.temp_c;
      

      

        var repoWeatherEl = document.createElement('li');
        repoWeatherEl.classList = 'list-item flex-row justify-space-between align-center';

  
      var titleWeatherEl = document.createElement('span');
      titleWeatherEl.textContent = repoName+" "+ " has currently a temperature of "+" "+ repoForecast+ " C";
  
      repoWeatherEl.appendChild(titleWeatherEl);
      containerWeatherEl.appendChild(repoWeatherEl);
  
    
    }   
} 
//code for saving recent searches
//init
function init() {
    getRecentSearch();
}
//save the recent searches
function getRecentSearch() {
    var storedName=localStorage.getItem("name");
    if (storedName === null) {
        savedName = "";
      } else {
        savedName = storedName;
      }
    var storedPhone = localStorage.getItem("phone-number");
    if (storedPhone === null) {
        savedPhone = "";
      } else {
        savedPhone = storedPhone;
      }
    var storedEmail =localStorage.getItem("email");
    if (storedEmail === null) {
        savedEmail = "";
      } else {
        savedEmail = storedEmail;
      }
    var storedOrigin=localStorage.getItem("origin");
    if (storedOrigin === null) {
        savedOrigin = "";
      } else {
        savedOrigin = storedOrigin;
      }
    var storedDestination=localStorage.getItem("destination");
    if (storedDestination === null) {
        savedDestination = "";
      } else {
        savedDestination = storedDestination;
      }
    var storedCurrentDate=localStorage.getItem("searched-on-date");
    if (storedCurrentDate === null) {
        savedCurrentDate = "";
      } else {
        savedCurrentDate = storedCurrentDate;
      }



     
}
init()
submitButton.addEventListener('click', getInfo);
recentSearchEl.addEventListener("click",function(){
    var titleRS =document.createElement("h2");
    titleRS.textContent="Recent Searches";
    var lastRS = document.createElement("li");
    lastRS.textContent= "Name:  "+ savedName +" "+ "Phone number:  "+savedPhone+" "+ "Email:  "+savedEmail+" "+".Flights search from:  "+savedOrigin+" "+"to:  "+savedDestination+" "+".Search done on: "+ savedCurrentDate
    recentSearchContainer.appendChild(titleRS);
    listRSEl.appendChild(lastRS);
    if (recentSearchContainer.style.display==="none"){
        recentSearchContainer.style.display="";
    }else{
        recentSearchContainer.style.display="none";
    }
  })
  
airportEl.addEventListener("click",getAirports);