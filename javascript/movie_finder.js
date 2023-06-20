const API_URL = "http://www.omdbapi.com/?i=tt3896198&apikey=95c8f87f&s=";
const API_URL_SEARCH = "http://www.omdbapi.com/?apikey=95c8f87f&i=";

var search_input = document.getElementById("search-input").value;
var cards = document.getElementById("movie-cards");

document.querySelector(".search").addEventListener("click", function (e) {
  console.log(search_input);
  const query = search_input;
  if (query) {
    getMovies(API_URL + query);
  }
});

async function getMovies(url) {
  const res = await fetch(url);
  const resData = await res.json();
  console.log(resData);
  showMovies(resData.Search);
}

function showMovies(movies) {
  cards.innerHTML = "";
  movies.forEach(async function (movie) {
    const movieData = await fetch(API_URL_SEARCH + movie.imdbID);
    const moiveDataObj = await movieData.json();
    movie_display(moiveDataObj);
  });
}

function movie_display(imovie) {
  const movieElm = document.createElement("div");
  movieElm.classList.add("movie-card");
  movieElm.innerHTML = `
        <div class="card">
        <img src="${imovie.Poster} alt="${imovie.Title}-Poster" width="300px" height="300px" />
        <div class="movie-discription">
            <span class="movie-title"><b>Title</b><span class="value">${imovie.Title}</span></span>
            <span class="movie-title"><b>Rating</b><span class="value">${imovie.imdbRating}</span></span>
            <span class="movie-title"><b>Released</b><span class="value">${imovie.Released}</span></span>
            <span class="movie-title"><b>Director</b><span class="value">${imovie.Director}</span></span>
            <span class="movie-title"><b>Genre</b><span class="value">${imovie.Genre}</span></span>
        </div>
        </div>
    `;
  cards.appendChild(movieElm);
}
