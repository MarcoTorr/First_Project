function test (){
    fetch("https://google-flights-search.p.rapidapi.com/search?departure_airport_code=SFO&arrival_airport_code=LAX&flight_class=Economy", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "ddd84fa9b8msh6bf7e229381ae5bp1c4812jsn3ec1755e4c5d",
            "x-rapidapi-host": "google-flights-search.p.rapidapi.com"
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.error(err);
    });
}

test();