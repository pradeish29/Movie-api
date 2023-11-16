// Titles: https://omdbapi.com/?s=thor&page=1&apikey=8a79b2fd
// details: http://www.omdbapi.com/?i=tt3896198&apikey=8a79b2fd

const movieSearchBox = document.getElementById('movie-search-box');
const searchList = document.getElementById('search-list');
const resultGrid = document.getElementById('result-grid');
const mainr = document.getElementById('main');

// load movies from API
async function loadMovies(searchTerm){
    const URL = `https://omdbapi.com/?s=${searchTerm}&page=1&apikey=8a79b2fd`;
    const res = await fetch(`${URL}`);
    const data = await res.json();
    // console.log(data.Search);
    if(data.Response == "True") displayMovieList(data.Search);
}

function findMovies(){
    let searchTerm = (movieSearchBox.value).trim();
    if(searchTerm.length > 0){
        searchList.classList.remove('hide-search-list');
        loadMovies(searchTerm);
    } else {
        searchList.classList.add('hide-search-list');
    }
}

function displayMovieList(movies){
    searchList.innerHTML = "";
    for(let idx = 0; idx < movies.length; idx++){
        let movieListItem = document.createElement('div');
        movieListItem.dataset.id = movies[idx].imdbID; // setting movie id in  data-id
        movieListItem.classList.add('search-list-item');
        if(movies[idx].Poster != "N/A")
            moviePoster = movies[idx].Poster;
        else 
            moviePoster = "image_not_found.png";

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
            <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
            <h3>${movies[idx].Title}</h3>
            <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }
    loadMovieDetails();
}

function loadMovieDetails(){
    const searchListMovies = searchList.querySelectorAll('.search-list-item');
    searchListMovies.forEach(movie => {
        movie.addEventListener('click', async () => {
            // console.log(movie.dataset.id);
            searchList.classList.add('hide-search-list');
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=8a79b2fd`);
            const movieDetails = await result.json();
            console.log(movieDetails);
            displayMovieDetails(movieDetails);
            mainr.style.display='none';
        });
    });
}

function displayMovieDetails(details){
    resultGrid.innerHTML = `
    <div class = "movie-poster">
        <img src = "${(details.Poster != "N/A") ? details.Poster : "image_not_found.png"}" alt = "movie poster">
    </div>
    <div class = "movie-info">
        <h3 class = "movie-title">${details.Title}</h3>
        <ul class = "movie-misc-info">
            <li class = "year">${details.Year}</li>
            <li class = "rated">Ratings: ${details.Rated}</li>
            <li class = "released">Released: ${details.Released}</li>
        </ul>
        <p class = "genre"><b>IMDb Raing: </b> ${details.imdbRating}</p>
        <p class = "genre"><b>Genre: </b> ${details.Genre}</p>
        <p class = "writer"><b>Director: </b> ${details.Director}</p>
        <p class = "writer"><b>Writer: </b> ${details.Writer}</p>
        <p class = "actors"><b>Actors: </b>${details.Actors}</p>
        <p class = "plot"><b>Plot: </b> ${details.Plot}</p>
        <p class = "language"><b>Language: </b> ${details.Language}</p>
        <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    </div>
    `;
}


window.addEventListener('click', (event) => {
    if(event.target.className != "form-control"){
        searchList.classList.add('hide-search-list');
    }
});



const API_URL = "https://api.themoviedb.org/3/discover/movie?api_key=a524f9e232d8b09c0ac0db868ddbd59e";
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie';
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const API_KEY = "a524f9e232d8b09c0ac0db868ddbd59e";
const main = document.getElementById('main');


getMovies(API_URL);

async function getMovies(url) {
try {
const response = await fetch(url);
const data = await response.json();
showMovies(data.results);
console.log(data.results)
} catch (error) {
console.log("Error fetching movies:", error);
}
}

function showMovies(movies) {
// main.innerHTML = "";
movies.forEach((movie) => {
const { title, poster_path, overview } = movie;
const movieEl = document.createElement("div");
movieEl.classList.add('movie');
movieEl.innerHTML = `
<img src="${IMG_PATH + poster_path}" alt="${title}" />
<div class="movie-info">
<h3 class="title">${title}</h3>
</div>
<div class="overview">
<h3 class="title">Overview</h3>
<h2 class="title"><a href="/">${title}</a></h2>
<p>${overview}</p>
</div>
`;
main.appendChild(movieEl);
});
}
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value.trim();
    if (searchTerm) {
    const url = `${SEARCH_API}?api_key=${API_KEY}&query=${searchTerm}`;
    getMovies(url);
    } else {
    alert("Please enter a movie title");
    }
    });
