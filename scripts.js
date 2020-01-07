let currentDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = (currentDate.getMonth() + 1);
let currentDay = currentDate.getDate();
console.log(currentDate, currentYear, currentMonth, currentDay);

let previousYear = (currentYear - 1);
let previousMonth = (currentMonth - 1);
if (previousMonth == 0) {
	previousMonth = 12;
}
let previousDay = (currentDay - 1);
if (previousDay == 0) {
	previousDay = 30;
}

function showDateComputation(inputValue) {
	if (inputValue <= 9) {
		return `0${inputValue}`;
	}
	else {
		return inputValue;
	}
}
console.log(currentDate, previousYear, previousMonth, previousDay);

let currentReleaseDate = `${currentYear}-${showDateComputation(currentMonth)}-${showDateComputation(currentDay)}`
let previousReleaseDate = `${previousYear}-${showDateComputation(previousMonth)}-${showDateComputation(currentDay)}`

console.log(currentReleaseDate, previousReleaseDate, 'this one');

$('.search-results').hide();

function getInitialData() {
	var settings = {
		"async": true,
		"crossDomain": true,
		// "url": `https://api.rawg.io/api/games?dates=2019-09-01,2019-09-30&platforms=18,1,7`,
		"url": `https://api.rawg.io/api/games?dates=${previousReleaseDate},${currentReleaseDate}&platforms=18,1,7,4`,
		"method": "GET",
	}

	$.ajax(settings).done(function (response) {
		// console.log(response);
		displayInitialData(response.results);
	});
}

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
}

function displayInitialData(inputArray) {
	console.log(inputArray);
	const randomID = Math.floor(Math.random() * (inputArray.length - 1)) + 1;
	console.log(randomID);
	// for (let i = 0; i < inputArray.length; i++) {
	console.log(inputArray[randomID].name)
	$('.featured-title').text(inputArray[randomID].name);
	inputArray[randomID].platforms.forEach(function (value, key) {
		// console.log(value.platform.name);
		$('.featured-platforms').append(`<li>${value.platform.name}</li>`);
	})
	console.log(inputArray[randomID].rating);
	if (inputArray[randomID].rating == 0) {
		$('.featured-rating').text('This game is not yet rated.')
	}
	else {
	$('.featured-rating').text(inputArray[randomID].rating)
	}
	$('.featured-genre').html();
	inputArray[randomID].genres.forEach(function (value, key) {
		console.log(value.name);
		$('.featured-genre').append(`<li>${value.name}<li>`);
	})
	console.log(inputArray[randomID].released);
	$('.featured-release-date').text(inputArray[randomID].released);
	console.log(inputArray[randomID].background_image);
	$('.featured-wrapper').html(`<img src='${inputArray[randomID].background_image}' class='featured-wrapper-image'>`)
}

function getLikeGames(userInput) {
	// let outputUrl = `https://rawg-video-games-database.p.rapidapi.com/games/${userInput}/suggested`;
	let outputUrl = `https://api.rawg.io/api/games/${userInput}/suggested`;
	const params = {
		"async": true,
		"crossDomain": true,
		"url": outputUrl,
		"method": "GET",
		// "headers": {
		// 	"x-rapidapi-host": "rawg-video-games-database.p.rapidapi.com",
		// 	"x-rapidapi-key": "54602e4456msh6e18ebcdf2c7d3fp1bb6e2jsn9a45a973098f"
		// }
    };
    const queryString = formatQueryParams(params)
    const url = outputUrl + '?' + queryString;

    fetch(url)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayLikeGames(responseJson.results))
        .catch(err => {
            $('.suggested-text').html('There are no suggested games');
        });
}

function displayLikeGames (inputArray) {
	$('.suggested-text').empty();
	console.log(inputArray);
	console.log(inputArray[0].name)
	$('.suggested-title').html(inputArray[0].name);
	$('.suggested-platforms').empty();
	inputArray[0].platforms.forEach(function (value, key) {
		// console.log(value.platform.name);
		$('.suggested-platforms').append(`<li>${value.platform.name}</li>`);
	})
	console.log(inputArray[0].rating);
	if (inputArray[0].rating == 0) {
		$('.suggested-rating').text('This game is not yet rated.')
	}
	else {
		$('.suggested-rating').html(inputArray[0].rating)
	}
	$('.suggested-genres').empty();
	inputArray[0].genres.forEach(function (value, key) {
		console.log(value.name);
		$('.suggested-genres').append(`<li>${value.name}</li>`);
	})
	console.log(inputArray[0].released);
	$('.suggested-release').html(inputArray[0].released);
	console.log(inputArray[0].background_image);
	$('.suggested-wrapper').html(`<img src='${inputArray[0].background_image}' class='suggested-img'>`)
}

function getUserInput() {

	// STEP 1 - get the input from the user
	$("#search-form").submit(function (event) {
		//if the page refreshes when you submit the form use "preventDefault()" to force JavaScript to handle the form submission
		event.preventDefault();
		//get the value from the input box
		var userInput = $("#query").val();
		console.log(userInput, 'this is the userInput');
		//use that value to call the getResults function defined bellow
		getResults(userInput);
		getSearchedData(userInput);
		getLikeGames(userInput);
		$('.search-results').show();
	});
}

function getSearchedData(userInput) {
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": `https://api.rawg.io/api/games?page_size=10&search=${userInput}&platforms=18,1,7,4`,
		"method": "GET",
	}

	$.ajax(settings).done(function (response) {
		console.log(response);
		displaySearchedData(response.results);
	});
}

function displaySearchedData (inputArray) {
	console.log(inputArray);
	console.log(inputArray[0].name)
	$('.search-title').html(inputArray[0].name);
	$('.search-platforms').empty();
	inputArray[0].platforms.forEach(function (value, key) {
		// console.log(value.platform.name);
		$('.search-platforms').append(`<li>${value.platform.name}</li>`);
	})
	console.log(inputArray[0].rating);
	if (inputArray[0].rating == 0) {
		$('.search-rating').text('This game is not yet rated.')
	}
	else {
		$('.search-rating').html(inputArray[0].rating)
	}
	$('.search-genre').empty();
	inputArray[0].genres.forEach(function (value, key) {
		console.log(value.name);
		$('.search-genre').append(`<li>${value.name}</li>`);
	})
	console.log(inputArray[0].released);
	$('.search-release').html(inputArray[0].released);
	console.log(inputArray[0].background_image);
	$('.search-wrapper').html(`<img src='${inputArray[0].background_image}' class='search-screenshot'>`)
}

function getResults(userInput) {
	$.getJSON("https://www.googleapis.com/youtube/v3/search", {
		part: "snippet",
		maxResults: 5,
		key: "AIzaSyDDxeMz08Ljrix9mV-A6dH3osvCz4eFqWQ",
		q: `${userInput} gameplay`,
		order: 'viewCount',
		type: "video" //only return videos (no channels or playlists) so we can take the video ID and link it back to Youtube
	},
		function (receivedApiData) {
			//show the json array received from the API call
			console.log(receivedApiData);
			// if there are no results it will show an error
			if (receivedApiData.pageInfo.totalResults == 0) {
				alert("No videos found!");
			}
			// if there are results, call the displaySearchResults
			else {
				displaySearchResults(receivedApiData.items);
			}
		});
}



// STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON
function displaySearchResults(videosArray) {

	//create an empty variable to store one LI for each one the results
	var buildTheHtmlOutput = "";

	$.each(videosArray, function (videosArrayKey, videosArrayValue) {
		//create and populate one LI for each of the results ( "+=" means concatenate to the previous one)
		buildTheHtmlOutput += `<li class='youtube-details'>`;
		buildTheHtmlOutput += "<p>" + videosArrayValue.snippet.title + "</p>"; //output vide title
		buildTheHtmlOutput += "<a href='https://www.youtube.com/watch?v=" + videosArrayValue.id.videoId + "' target='_blank'>"; //taget blank is going to open the video in a new window
		buildTheHtmlOutput += "<img src='" + videosArrayValue.snippet.thumbnails.high.url + "' class='youtube-thumbnail'/>"; //display video's thumbnail
		buildTheHtmlOutput += "</a>";
		buildTheHtmlOutput += "</li>";
	});

	//use the HTML output to show it in the index.html
	$("#search-results").html(buildTheHtmlOutput);
};


// Shorthand for $( document ).ready()
$(function () {
	getInitialData();
	getUserInput();
});