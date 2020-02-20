
const baseURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const key = 'b2e02612e179494c9f1f57577b582a0a';
let url;

const searchTerm = document.querySelector('.search');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const searchForm = document.querySelector('form');
const submitBtn = document.querySelector('.submit');
const nextBtn = document.querySelector('.next');
const previousBtn = document.querySelector('.prev');
const nav = document.querySelector('nav');
const section = document.querySelector('section');

nav.style.display = 'none';
let pageNumber = 0;
// console.log('PageNumber:', pageNumber);

searchForm.addEventListener('submit', fetchResults);
nextBtn.addEventListener('click', nextPage);
previousBtn.addEventListener('click', previousPage);

function fetchResults(e) {
    // console.log(e);
    e.preventDefault();  // make sure the page doesn't refresh

    url = `${baseURL}?api-key=${key}&page=${pageNumber}&q=${searchTerm.value}`; // create the full URL to access the New York Times API
    // console.log('URL:', url);

    if (startDate.value !== '') { // if the startDate object is not empty
        console.log(startDate.value)
        url += '&begin_date=' + startDate.value; 
        console.log('URL:', url);
    }

    if (endDate.value !== '') {
        console.log(endDate.value)
        url += '&end_date=' + endDate.value;
        console.log('URL:', url);
    }

    // GROUP 2

    fetch(url)
        .then(function (result) { // if 
            console.log(result)
            return result.json();
        })
        .then(function (json) {
            console.log(json);
            displayResults(json);
        })
}

function displayResults(json) {
    console.log('Display Results', json);
    // console.log(json.response.docs);

    while (section.firstChild) {
        section.removeChild(section.firstChild);
    }

    let articles = json.response.docs;
    // console.log(articles);

    if (articles.length === 0) {
        console.log('No results');
    } else {
        for (let i = 0; i < articles.length; i++) {
            // console.log(i);
            let article = document.createElement('article');
            let heading = document.createElement('h2');
            let link = document.createElement('a');
            let img = document.createElement('img');
            let para = document.createElement('p');
            let clearfix = document.createElement('div');
            let current = articles[i];

            console.log('Current:', current);

            link.href = current.web_url;
            link.textContent = current.headline.main;
            para.textContent = 'Keywords: ';

            // GROUP 3

            for (let j = 0; j < current.keywords.length; j++) {
                let span = document.createElement('span');
                span.textContent += current.keywords[j].value + ' ';
                para.appendChild(span);
            }

            if (current.multimedia.length > 0) {
                img.src = 'http://www.nytimes.com/' + current.multimedia[0].url;
                img.alt = current.headline.main;
            }

            clearfix.setAttribute('class', 'clearfix');
            article.appendChild(heading);
            heading.appendChild(link);
            article.appendChild(img);
            article.appendChild(para);
            article.appendChild(clearfix);
            section.appendChild(article);
        }
    }

    if (articles.length === 10) {
        nav.style.display = 'block';
    } else {
        nav.style.display = 'none';
    }
}

function nextPage(e) {
    // console.log('Next button clicked');
    pageNumber++;
    fetchResults(e);
    console.log('Page Number:', pageNumber);
}

function previousPage(e) {
    // console.log('Previous button clicked');
    if (pageNumber > 0) {
        pageNumber--;
        fetchResults(e);
    } else {
        return;
    }

    fetchResults(e);
    console.log('Page:', pageNumber);
}