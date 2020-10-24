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
    bookResult.addClass("search-results bg-light");
    bookResult.attr("id", response.items[i].id)
    
    var titleRow = $("<div>");
    titleRow.addClass("row");

        var titleCol = $("<div>");
        titleCol.addClass("col-9");

            var title = $("<h3>");
            title.text(titleAPI)
    
        var btnCol = $("<div>");
        btnCol.addClass("col-3");

            var addBtn = $("<button>");
            addBtn.text("Add to Reading List");
            addBtn.addClass("btn btn-secondary float-right addToList")

    var main = $("<div>");
    main.addClass("main-wapper");

        var row = $("<div>");
        row.addClass("row");

        var col1 = $("<div>");
        col1.addClass("col-2")

            var img = $("<img>");
            img.addClass("img-fluid");
            img.attr("src", imgAPI);

        var col2 = $("<div>");
        col2.addClass("col-10");

            var author = $("<p>");
            author.text("Author: " + authorAPI);
            var publishedDate = $("<p>");
            publishedDate.text("Published: " + trimPubDateAPI);
            var description = $("<p>");
            description.text(trimDescAPI + "...");

    // DYNAMICALLY CREATE RESULT
    
    // Create Row for Title and Btn
    bookResult.append(titleRow)

    titleCol.append(title);
    titleRow.append(titleCol);
   
    btnCol.append(addBtn);
    titleRow.append(btnCol);

    // Create a Row for Two Columns and All Info
    bookResult.append(main);
    main.append(row);

    // Create Column1 and IMG
    col1.append(img);
    row.append(col1);

    // Create Col2 and INFO
    col2.append(author);
    col2.append(publishedDate);
    col2.append(description);
    row.append(col2);

    // Append Full Result DIV
    $("#results").append(bookResult);
    };

  });

});

$(document).on("click", "button.addToList", function(e){
    e.preventDefault();
    
    var id = $(this).parent().parent().parent().attr("id");
    
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

 


