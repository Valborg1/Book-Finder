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


    for (var i = 0; i < 5; i++) {

    // Query all Result Information
    var results = response.items[i].volumeInfo;

    var titleAPI = results.title;

    var authorAPI = results.authors[0];

    var publishedDateAPI = results.publishedDate;
    var trimPubDateAPI = publishedDateAPI.substring(0,4);

    var descriptionAPI = results.description;
    var trimDescAPI = descriptionAPI.split(" ").splice(0,35).join(" ");

    var imgAPI = results.imageLinks.thumbnail;


    // Create Elements for Results
    var bookResult = $("<div>");
    bookResult.addClass("search-results");
    bookResult.attr("id", response.items[i].id)
    
    var title = $("<h3>");
    var author = $("<p>");
    var publishedDate = $("<p>");
    var description = $("<p>");
    var img = $("<img>");
    var row = $("<div>");
    var addBtn = $("<button>");

    title.text(titleAPI);
    bookResult.append(title);

    author.text("Author: " + authorAPI);
    bookResult.append(author);

    publishedDate.text("Published: " + trimPubDateAPI);
    bookResult.append(publishedDate);

    description.text(trimDescAPI + "...");
    bookResult.append(description);

    img.attr("src", imgAPI);
    bookResult.append(img);

    row.addClass("row");
    addBtn.text("Add to Reading List");
    addBtn.addClass("btn btn-secondary addToList")

    row.append(addBtn);
    bookResult.append(row);

    // Append Final Div for Result Item
    $("#results").append(bookResult);
    };

  });

});

$(document).on("click", "button.addToList", function(e){
    e.preventDefault();
    
    var id = $(this).parent().parent().attr("id");
    
    listURL = "https://www.googleapis.com/books/v1/volumes/" + id


    
    $.ajax({
        url : listURL,
        method : "GET"
    }).then(function(response){
        console.log(response);

        var titleAPI = response.volumeInfo.title;

        var toRead = $("<div>");
        toRead.attr("id", response.id);

        var title = $("<h3>");
        
        title.text(titleAPI);
        toRead.append(title);

        $("#list").append(toRead);


    });


 });

 


