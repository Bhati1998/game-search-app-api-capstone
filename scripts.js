let aggregatedResults = [];


// for (let counter=1; counter<17599; counter++) {
for (let counter = 1; counter < 2; counter++) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://rawg-video-games-database.p.rapidapi.com/games?page=" + counter,
		"method": "GET",
		"headers": {
			"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
			"x-rapidapi-key": "54602e4456msh6e18ebcdf2c7d3fp1bb6e2jsn9a45a973098f"
		}
	}

	$.ajax(settings).done(function (response) {
		// console.log(response);
		// const randomImgId = Math.floor(Math.random() * (response.results.length -1)) + 1 ;
		// console.log('-->', response.results[randomImgId].background_image);
		for (let i = 0; i < response.results.length; i++) {
			// console.log(response.results[i]);
			aggregatedResults.push(response.results[i]);
		}
	});
}
console.log(aggregatedResults);