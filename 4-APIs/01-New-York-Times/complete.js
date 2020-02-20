// *** from Bob Madison ***
// Setup the URL and access key to use the NYT API
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'; //
const key = 'FjNWG8FTGsPrI9459iuPnKGC0w6T3waG'; 
let url; 

/*
    Variables for all the DOM elements we'll be manipulating.
    Each querySelector grabs an id or an element (such as nav & section) from the HTML
*/
//SEARCH FORM
const searchTerm = document.querySelector('.search'); // setting a const variable for the search class in our html. We'll use this capture input for the search term 
const startDate = document.querySelector('.start-date'); // startDate = start date entered. class="start-date"
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form'); // setting a const variable for the form tag in our html
const submitBtn = document.querySelector('.submit'); // const variable for our submit button (class="submit")

//RESULT NAVIGATION
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');

//RESULTS SECTION
const section = document.querySelector('section');


nav.style.display = 'none'; // hide the Previous/Next navigation when the page loads (nothing to navigate yet)

let pageNumber = 0; // inside the nyt doc, need to pass page number, we want to start on page 0 first (the first 10 articles)
// console.log("PageNumber:", pageNumber); // debugger
let displayNav = false;

searchForm.addEventListener('submit', fetchResults); // searchForm is the entire form (per html) (not a button). When submit button submits the form, fire off function fetchResults. This contains a function reference to fetchResults, not invocation.
nextBtn.addEventListener('click', nextPage); // when click the next button (= point mouse, press & release mouse button on button on the screen), fire off function nextPage
previousBtn.addEventListener('click', previousPage); 

function fetchResults(e) { // fetchResults is called from the searchForm - fetchResults is an event handling function. Event handling functions receive an event object. Name the object "e" so we can process it.
    e.preventDefault();  // prevents the page from being refreshed; by default, any form submission will automatically refresh the page
    // "e." is shorthand for "event.".  The (submit) event object is passed as the first parameter to the event handler function
    url = baseURL + '?api-key=' + key + '&page=' + pageNumber + '&q=' + searchTerm.value; 
    console.log("URL:", url); // grab the content (value) of the search input field 
    
    if (pageNumber === 0) {  // hide previous button if there aren't any result pages displayed
        previousBtn.hidden = true;
    } else {
        previousBtn.hidden = false;
    }

    // if a start date is specified in the search request, append that to the URL
    if (startDate.value !== '') {
        console.log(startDate.value);
        console.log("Start Date is type : ", typeof(startDate));
        url += '&begin_date=' + startDate.value;
    };

    // if an end date is specified in the search request, append that to the URL
    if (endDate.value !== '') {
        url += '&end_date=' + endDate.value;
    };
    // fetch is part of the browser window, not 
    fetch(url)  // get the data from the URL
      .then (function(result) {  // the Promise has success and failure cases - conceptually, fetch "calls" this callback function for the success case. We define a function for the response stream, which we call "result" 
      console.log(result)  
      return result.json(); // jsonified data is returned outside this .then (back to control by fetch) 
      // could do concise arrow format :
      // .then(result => result.json());
    }) .then(function(json) { // chain another .then - take the jsonified data and process it
        displayResults(json); 
    });
}; // added ;


function displayResults(json) {
        let articles = json.response.docs; // creates an array "articles" containing the data from the jsonified data when you drill down to the response section, and within that to the docs section

    while (section.firstChild) {  // clear out the <section> area by looping through until there are no more first records
        section.removeChild(section.firstChild);  // while we are in the section and there is a child, remove the first one
    }

    if (articles.length === 0) { // if the articles array is empty (no articles returned in our fetch to nyt)
        console.log("No results");
    } else {
        // Display the data
        for (let i = 0; i < articles.length; i++) { 
            let article = document.createElement('article');  // creating an article element
            let heading = document.createElement('h2'); // create a stub for an <h2> html statement. assign it to a variable named "heading" 
            let link = document.createElement('a'); //  // create a stub for an <a> html statement. assign it to a variable named "link"
            let img = document.createElement('img'); 
            let para = document.createElement('p'); 
            let clearfix = document.createElement('div'); 

            let current = articles[i]; // current = the article at index i in the articles array
            console.log("Current:", current); 

            link.href = current.web_url; // drill down into the current article object to the web_url element. assign the content of the web_url element to the href property of the <a> statement represented by the link variable
            link.textContent = current.headline.main;  

            para.textContent = 'Keywords: '; 

            /*
                creates a span element and adds keyword values and appends the completed span item to the paragraph
            */
            for (let j = 0; j < current.keywords.length; j++) {
                
                let span = document.createElement('span');  // create a span variable named "span"
                span.textContent += current.keywords[j].value + ' '; // assign the values (descriptions) of the keywords the textContent property of the span
                para.appendChild(span);
            }

            // could also append all the keyword values to the same span tag and then append it to the para p-tag. But rather than separated span tags spread across the space (broken between) there would be 1 span tag with no white space between

            // let span = document.createElement('span');  // create a span variable named "span"
            // for (let j = 0; j < current.keywords.length; j++) {
            //     span.textContent += current.keywords[j].value + ' '; // assign the values (descriptions) of the keywords the textContent property of the span
            // }
            //     para.appendChild(span);


            // if the 
            if(current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url; // set the img.src to the image url specified in this current article
                img.alt = current.headline.main; // if the image doesn't come up, the alternate image is used (in this case the text when drill down into the current article into .headline and then into .main)
            }

            clearfix.setAttribute('class', 'clearfix');  // clears floated content within a container so items don't overlap

            article.appendChild(heading);  // append the heading to the article
            heading.appendChild(link);  // append the link to the heading
            article.appendChild(img);  // append the img to the article
            article.appendChild(para);  // append the para to the article
            article.appendChild(clearfix);  // append clearfix to the article
            section.appendChild(article);   // append the article to the section
        }
    }
    // console.log(json.response.docs);
    if (articles.length === 10) {
        nav.style.display = 'block'; // Shows nav sisplay if 10 items are in the array
    } else {
        nav.style.display = 'none'; // Hides nav display if < 10 items in array
    }

};

function nextPage(e) {
    pageNumber++; 
    fetchResults(e); 
    console.log("Page number:", pageNumber); 
}; // added ;

function previousPage(e) {
    if(pageNumber > 0) { //1
        pageNumber--; //2
    } else {
        return; //3
    }
    fetchResults(e); //4
    console.log("Page:", pageNumber); //5
};
    
