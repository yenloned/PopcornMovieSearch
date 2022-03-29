var counting = 0
var moviesList = [];

function apiSearch(search){
    
    moviesList = []
    counting = 0
    var url = "https://movie-database-alternative.p.rapidapi.com/?s=" + search + "&r=json&page=1";

    document.querySelector('.movies').innerHTML = "";
    fetch(url, {
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
        "x-rapidapi-key": "3491ba94cbmsha9459b9f0cc3d0bp15e18cjsna3c80fd9a36b"
        }
    })

    .then(response => response.json())
    .then(data => {
    const list = data.Search;
    list.map((item) => {
        const item_name = item.Title;
        const item_id = item.imdbID;
        moviesList.push(item_id);
        const item_year = item.Year;
        const item_poster = item.Poster;
        const item_search_movie ="search_movie"+counting;
        const movies_detail ="movies_detail"+counting;
        const movie =`<div class="${item_search_movie}" onclick="clickMoreDetails(${counting})">
        <div class="basic_movie">
        <img src="${item_poster}">
        <text> ${item_name} <br>(${item_year})</text>
        </div>
        <div class="${movies_detail} id="${movies_detail}"></div>
        </div>`
        document.querySelector('.movies').innerHTML += movie;
        counting++;
        })
    })
}





var lastSearch = 0;
function clickMoreDetails(searchid){
    
    var expand_movies = ".movies_detail" + searchid
    if (document.querySelector(expand_movies).innerHTML == ""){ 
        var last_movies = ".movies_detail" + lastSearch
        document.querySelector(last_movies).innerHTML = "";
    
        var url ="https://movie-database-alternative.p.rapidapi.com/?r=json&i=" + moviesList[searchid]
        fetch(url, {
            "method": "GET",
            "headers": {
            "x-rapidapi-host": "movie-database-alternative.p.rapidapi.com",
            "x-rapidapi-key": "3491ba94cbmsha9459b9f0cc3d0bp15e18cjsna3c80fd9a36b"
            }
        })


        .then(response => response.json())
        .then(data => {
            const detail_id = data.imdbID
            imdbwebsite = "https://www.imdb.com/title/"+detail_id
            const detail_name = data.Title
            const detail_length = data.Runtime
            const detail_language = data.Language
            const detail_type = data.Genre
            const detail_director = data.Director
            const detail_actor = data.Actors
            const detail_description = data.Plot
            const movies_detail = `<div class="detail_movie_name">
            ${detail_name}
            </div>
            <br>
            Genre: ${detail_type}
            <br> Length: ${detail_length}
            <br> Language: ${detail_language}
            <br> Director: ${detail_director}
            <br> Main Cast: ${detail_actor}
            <br><br><div class="detail_storyline"> Storyline: ${detail_description}</div>
            <div class="detail_button">
            <div class="imdb_button"><a href="${imdbwebsite}" target="_blank">IMDB Website</a></div>
            <div class="youtube_button" onclick="watertrailer(${searchid})">Watch Trailer</div>
            </div></div>`
            document.querySelector(expand_movies).innerHTML = movies_detail;
        
            
        })
        lastSearch = searchid;
    
    } else {
        document.querySelector(expand_movies).innerHTML = "";
    }


}

function watertrailer(trailerid){
    
    var url="https://mdblist.p.rapidapi.com/?i="+moviesList[trailerid];
    fetch(url, {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "mdblist.p.rapidapi.com",
		"x-rapidapi-key": "3491ba94cbmsha9459b9f0cc3d0bp15e18cjsna3c80fd9a36b"
	}
})
    .then(response => response.json())
    .then(data => {
        const trailer_url = data.trailer;
        window.open(trailer_url);
    })
}
