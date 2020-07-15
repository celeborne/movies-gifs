

 //add a listener to submit button
document.querySelector("form").addEventListener("submit", (e) => {e.preventDefault(); something()})

function something() {
    const searchKeyword = document.querySelector("#search_field");
    document.querySelector("#card-container").appendChild(makeCard(searchKeyword.value));
    document.querySelector("form").reset();
}

 //prevent page reset - check
 //grab keyword from form - check
 //button for OMDB search query - check
 //button for gif search query - check
 //add card - check

function makeCard(searchKeyword) {
const card = document.createElement("div");
card.setAttribute("class", "card card-big");

const cardTitle = document.createElement("h5");
cardTitle.setAttribute("class", "card-header");
cardTitle.innerText= searchKeyword;

const cardBody = document.createElement("div");
cardBody.setAttribute("class", "card-body");

const cardResultsContainer = document.createElement("div");
cardResultsContainer.setAttribute("class", "container display-control");

const cardGifButton = document.createElement("button");
cardGifButton.setAttribute("class", "btn btn-primary");
cardGifButton.innerText = "Find Gifs";
cardGifButton.addEventListener("click", () => {

    cardResultsContainer.innerHTML = "";
    findGifs(searchKeyword, cardResultsContainer)});

const cardMoviesButton = document.createElement("button");
cardMoviesButton.setAttribute("class", "btn btn-warning");
cardMoviesButton.innerText = "Find Movies";
cardMoviesButton.addEventListener("click", () => {

    cardResultsContainer.innerHTML = "";
    findMovies(searchKeyword, cardResultsContainer)});

card.appendChild(cardTitle);
card.appendChild(cardBody);
cardBody.appendChild(cardGifButton);
cardBody.appendChild(cardMoviesButton);
cardBody.appendChild(cardResultsContainer);

return card;
 }

 //add buttons in card - check
 //fetch using button(s) in card - check

function findGifs(searchKeyword, cardResultsContainer) {
    const giphyStart = "https://api.giphy.com/v1/gifs/search?";
    const giphyKey = "5J7DZrdG4SbI5VU2DJ54SuxH88q4LGZV";
    const giphyLimit = "12";

    fetch(`${giphyStart}api_key=${giphyKey}&q=${searchKeyword}&limit=${giphyLimit}`)
    .then(response => response.json())
    .then(data => data.data.forEach(item => {
        
        let newGifCard = makeMovieCard(item, false);
        cardResultsContainer.appendChild(newGifCard);
    }))
}

function findMovies(searchKeyword, cardMoviesResultsContainer) {
const omdbStart = "http://www.omdbapi.com";
const omdbKey = "daaadae3";
  
  fetch(`${omdbStart}/?apikey=${omdbKey}&s=${searchKeyword}`)
  .then(response => response.json())
  .then(data => {
      let array = data.Search;
      let count = 0;
    while (count <= 11 && count < array.length) {
        let newMovieCard = makeMovieCard(array[count], true);
        cardMoviesResultsContainer.appendChild(newMovieCard);
        count++;
    }
    
//     data.Search.forEach(item => {
//       let newMovieCard = makeMovieCard(item, true);
//       cardMoviesResultsContainer.appendChild(newMovieCard);
//   } )
}
  )
 }


 //preprocessing and configuration (how things are made)
 function makeMovieCard(movieData, isMovieData) {
     let imgSource;
     let titleText;
     let borderColor;
        if (isMovieData) {
            imgSource = movieData.Poster;
            titleText = movieData.Title;
            borderColor = "movie-card-border";
        } else {
            imgSource = movieData.images.fixed_height_downsampled.url;
            titleText = movieData.title;
            borderColor = "gif-card-border";
        }

//give me the thing
     const movieCard = document.createElement("div");
     movieCard.setAttribute("class", "card card-img " + borderColor);

     const movieImg = document.createElement("img");
     movieImg.setAttribute("class", "card-img-top");
     movieImg.setAttribute("alt", `Poster for: ${titleText}`);
     movieImg.setAttribute("src", imgSource);

    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    const movieTitle = document.createElement("h5");
    movieTitle.setAttribute("class", "card-title");
    movieTitle.innerHTML = titleText;
    
    movieCard.appendChild(movieImg);
    movieCard.appendChild(cardBody);
    cardBody.appendChild(movieTitle);

    return movieCard;
 }