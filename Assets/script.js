var APIKey = "AIzaSyBhUO9Jc-Moam44mTvSABj2O4Jl6sulBWM";




var searchTitle = "flowers";
var searchAuthor = "keyes";

var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + searchTitle + "+inauthor:" + searchAuthor + "&key=" + APIKey



$.ajax({
    url : queryURL,
    method : "GET"
}).then(function(response){
    console.log(response);


    for (var i = 0; i < 6; i++) {


    var results = response.items[i].volumeInfo;

    var titleAPI = results.title;
    var publishedDateAPI = results.publishedDate;
    var descriptionAPI = results.description;
    var imgAPI = results.imageLinks.thumbnail;

    var bookResult = $("<div>");
    
    var title = $("<p>");
    var publishedDate = $("<p>");
    var description = $("<p>");
    var img = $("<img>");

    title.text(titleAPI);
    bookResult.append(title);

    publishedDate.text(publishedDateAPI);
    bookResult.append(publishedDate);

    description.text(descriptionAPI);
    bookResult.append(description);

    img.attr("src", imgAPI);
    bookResult.append(img);

    // RESULTSDIV.append(bookResult);


    };


});


