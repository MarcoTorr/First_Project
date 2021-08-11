var currentDate = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
var userFormEl = document.querySelector('#user-form');

var repoContainerEl = document.querySelector('#repos-container');
var containerWeatherEl = document.querySelector('#Container-weather');
var repoSearchTerm = document.querySelector('#repo-search-term');
var recentSearchEl = document.querySelector('#recent-search');
var recentSearchContainer= document.querySelector("#recent-search-container");
var listRSEl= document.querySelector("#list-rs");

var destinationEl = document.querySelector('#destination');
var locationEl = document.querySelector('#origin');
var startDateEl = document.querySelector('#startDate');
var endDateEl = document.querySelector('#endDate');
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

//function to submit the destination and origin 
var getInfo = function (event) {
    event.preventDefault();
    var destinationInput = destinationEl.value.trim();
    var originInput = locationEl.value.trim();
    var startDate = startDateEl.value.trim();
    var endDate = endDateEl.value.trim();

    if (destinationInput && originInput && startDate && endDate) {
        //var result = getApiDestinationOrigin(destinationInput);
        //console.log(result);
        //var destination = result[0].Places.PlaceId;
        var destination= destinationInput;
        var origin = originInput;

        //var result2 = getApiDestinationOrigin(originInput);
        //var origin = result2[0].Places.PlaceId;
        var destination1= "Sweden";

        repoContainerEl.textContent = '';
        destinationEl.value = '';
        locationEl.value='';
        startDateEl.value = '';
        endDateEl.value= '';
    } else if ( destinationInput && !originInput){
        alert('Please enter a departure country');
    } else if ( !destinationInput && originInput){
        alert('Please enter a destination');
    } else if ( !destinationInput && !originInput){
        alert('Please enter a departure country and destination');
    }

    getFlightRepos(destination,startDate,endDate,origin);
    getWeather(destination1);

    localStorage.setItem("name",nameEl.value);
    localStorage.setItem("phone-number",phoneEl.value);
    localStorage.setItem("email",emailEl.value);
    localStorage.setItem("origin",originInput);
    localStorage.setItem("destination",destinationInput);
    localStorage.setItem("searched-on-date",currentDate);

}  
//function to obtain destination and origin from Skyscanner
function getApiDestinationOrigin(destination){
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query="+location, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "2a8ef1057fmsh7bff5369e5a3280p1037e6jsn5276ba1cf138",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
    })
    .then(function (response) {
        if (response.ok) {
          response.json().then(function () {
          console.log(response) ; 
          });
        } else {
          alert('Error: ' + response.statusText);
        }
    })
    .catch(function (error) {
        alert('Unable to connect to Skyscanner');
    });  
}
 




// function to obtain the API information
var getFlightRepos = function (destination,startDate,endDate,origin) {
    fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browsedates/v1.0/US/USD/en-US/"+origin+"/"+destination+"/"+startDate+"?inboundpartialdate="+endDate, {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "2a8ef1057fmsh7bff5369e5a3280p1037e6jsn5276ba1cf138",
            "x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
        }
    })
    
    .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            displayFlights(data, destination,origin,startDate,endDate);
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



var displayFlights = function (reposFlights, destination,origin,startDate,endDate) {
    if (reposFlights.length === 0) {
      repoContainerEl.textContent = 'No flights found.';
      return;
    }
  
    repoSearchTerm.textContent = ("Flights found to :"+destination+" from:" +origin+" leaving on:"+startDate+ " and reuturning on:"+endDate);
      
      var repoNameOrigin = reposFlights.Places[0].Name +", "+ reposFlights.Places[0].CityName;
      var repoNameDestination= reposFlights.Places[1].Name+", " + reposFlights.Places[1].CityName;
      var repoPrice= reposFlights.Quotes[0].MinPrice;
      var repoCompany= reposFlights.Carriers[0].Name;

      

        var repoEl = document.createElement('li');
        repoEl.classList = 'list-item flex-row justify-space-between align-center';

  
      var titleEl = document.createElement('span');
      var contentFlights= "Flight leaving from"+" "+ repoNameOrigin +" "+"and landing on "+" "+repoNameDestination+" "+ "for a price of"+" " +repoPrice+" dolars"+".Arline:" +" "+ repoCompany;
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
userFormEl.addEventListener('submit', getInfo);
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