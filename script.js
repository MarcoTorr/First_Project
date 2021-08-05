



var formSubmitHandler = function (event) {
    event.preventDefault();
    var destination = nameInputEl.value.trim();

    if (destination) {
        getUserRepos(destination);

        repoContainerEl.textContent = '';
        nameInputEl.value = '';
    } else {
        alert('Please enter a proper destination');
    }
    };

var getFeaturedRepos = function (language) {
     var flightsapiUrl = 'https://api.github.com/search/repositories?q=' + language + '+is:featured&sort=help-wanted-issues';
    
    fetch(apiUrl).then(function (response) {
      if (response.ok) {
           response.json().then(function (data) {
           displayRepos(data.items, language);
          });
         } else {
           alert('Error: ' + response.statusText);
      }
     });
     };    