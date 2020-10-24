var APIKey = "AIzaSyBhUO9Jc-Moam44mTvSABj2O4Jl6sulBWM";


// var queryURL = "https://www.googleapis.com/books/v1/volumes?q=+inauthor:smith&key=AIzaSyBhUO9Jc-Moam44mTvSABj2O4Jl6sulBWM" + APIKey


$("#searchButton").on("click", function(){
    $("#results").text("");

var searchTitle = $("#byTitle").val().trim();
var searchAuthor = $("#byAuthor").val().trim();

var title;
var author;

if (searchTitle !== "") {
        title = searchTitle;
    } else {
        title = "";
    }

if (searchAuthor !== "") {
        author = "+inauthor:" + searchAuthor;
    } else {
        author = "";
    }

var queryURL = "https://www.googleapis.com/books/v1/volumes?q=" + title + author + "&key=" + APIKey

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

    var trimDescAPI = descriptionAPI.split(" ").splice(0,50).join(" ");

    var imgAPI = results.imageLinks.thumbnail;

    var bookResult = $("<div>");
    bookResult.addClass("search-results");
    
    var title = $("<h3>");
    var publishedDate = $("<p>");
    var description = $("<p>");
    var img = $("<img>");

    title.text(titleAPI);
    bookResult.append(title);

    publishedDate.text(publishedDateAPI);
    bookResult.append(publishedDate);

    description.text(trimDescAPI + "...");
    bookResult.append(description);

    img.attr("src", imgAPI);
    bookResult.append(img);

    $("#results").append(bookResult);
    };

  });

  $("results.search-results").on("click", function(){
      console.log("test");
    // var copy = $(this).clone();
    // $("#list").append(copy);

  });

});


