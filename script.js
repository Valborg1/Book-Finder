var APIKey = "AIzaSyBhUO9Jc-Moam44mTvSABj2O4Jl6sulBWM";
var searchTitle = "flowers";
var searchAuthor = "keyes";

queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "+inauthor:" + searchAuthor + "&key=" + APIKey

$.ajax({
    url : queryURL,
    method : "GET"
}).then(function(response){
    console.log(response);
    var results = response.items[1].volumeInfo;

    console.log(results.title);
    console.log(results.publishedDate);
    console.log(results.description);
    console.log(results.imageLinks.thumbnail);

})


