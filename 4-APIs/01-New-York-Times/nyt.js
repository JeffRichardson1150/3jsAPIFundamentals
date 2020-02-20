const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //1
const key = 'FjNWG8FTGsPrI9459iuPnKGC0w6T3waG'; //2
let url; //3

//SEARCH FORM
const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');

//RESULTS NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');

nav.style.display = 'none'; // hide the Previous/Next navigation when the page loads (nothing to navigate yet)

let pageNumber = 0;
let displayNav = false; // nav not available until we need it

searchForm.addEventListener('submit', fetchResults); // searchForm is the entire form (per html) (not a button). When submit button submits the form, fire off function fetchResults.
nextBtn.addEventListener('click', nextPage); // when click the next button (= point mouse, press & release mouse button on button on the screen), fire off function nextPage
previousBtn.addEventListener('click', previousPage);  // when click the previous button, fire off function previousPage

function fetchResults(e) { // Every event handling function receives an event object holding properties (variables) & methods (functions). The (e) handle allows you to interact with the object. 
  // console.log(e);
  e.preventDefault(); // prevent the request from being sent anywhere. By default, a form submits data with a POST request. This form collects data for a query (a GET request)
  // Assemble the full URL
  url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; 
  console.log(url); 

  fetch(url)
    .then(function(result) {
      console.log(result)
      return result.json();
    }) .then(function(json) {
      console.log(json);
    })
}

function nextPage(){
  console.log("Next button clicked");
} 

function previousPage(){
  console.log("Next button clicked");
} 
