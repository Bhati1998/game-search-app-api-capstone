var settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://rawg-video-games-database.p.rapidapi.com/games",
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
		"x-rapidapi-key": "54602e4456msh6e18ebcdf2c7d3fp1bb6e2jsn9a45a973098f"
	}
}

$.ajax(settings).done(function (response) {
	console.log(response);
});