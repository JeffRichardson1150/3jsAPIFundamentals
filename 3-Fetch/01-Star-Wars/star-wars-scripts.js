let starWarsPeopleList = document.querySelector('ul');

// https://github.github.io/fetch/  for simplified reference

// fetch(url) .then(function(successResponseStream) { }, function(errorResponseStream) { })
fetch('https://swapi.co/api/people')  // get the data from the URL
.then(function(response) {  // the Promise has success and failure cases - conceptually, fetch "calls" this callback function for the success case. We define a function for the response stream, which we call "response" 
    return response.json(); // conceptually, returns jsonified data back to the control of fetch
})  // the callback function for the failure case would be here :   }, function(error) { })
.then(function(json) {  //string another callback function outside the fetch (?)
    console.log(json);
    let people = json.results; // jsonified data includes count, next, previous, results, ...  results is an array of the details for 10 people. We want to reference that array of people

    for(p of people) { // the objects in .results array ('p in' would return the indices of the array : 0-9)
        let listItem = document.createElement('li'); 
        listItem.innerHTML = '<p>' + p.name + '</p>'; // name is a key in people objects
        starWarsPeopleList.appendChild(listItem);
      }
    
});


