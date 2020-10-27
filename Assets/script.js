var APIKey = "AIzaSyBhUO9Jc-Moam44mTvSABj2O4Jl6sulBWM";

// Main Search Functionality
$("#searchButton").on("click", function(e){
    e.preventDefault();
    $("#results").text("");
    $("#resultsIntro").remove();


var searchTitle = $("#byTitle").val().trim();
var searchAuthor = $("#byAuthor").val().trim();

if (!searchTitle && !searchAuthor) {
    alert("Please enter either a title or author.")
}

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
        titleCol.addClass("col-8");

            var title = $("<h3>");
            title.text(titleAPI)
    
        var btnCol = $("<div>");
        btnCol.addClass("col-4");

            var addBtn = $("<button>");
            addBtn.text("+Reading List");
            addBtn.addClass("btn btn-info float-right addToList")

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

// Check Local Storage for Reading List and Populate
var readingList;
var list = JSON.parse(localStorage.getItem("readingList")) || [];

if (list) {
    readingList = list
    
    for (var k = 0; k < list.length; k++) {
        listURL = "https://www.googleapis.com/books/v1/volumes/" + list[k]
        populateReadingList();
    }
}


// Add a book to the Reading List
$("#results").on("click", "button.addToList", function(e){
    e.preventDefault();
    $("#readingListIntro").remove();
    
    var id = $(this).parent().parent().parent().attr("id");
    
    listURL = "https://www.googleapis.com/books/v1/volumes/" + id

    populateReadingList();

    readingList.push(id);
    localStorage.setItem("readingList",(JSON.stringify(readingList)));
    console.log(readingList);

 });


//  Remove Item From Reading List
$(".readingList").on("click", "button.removeFromList", function (e){
    e.preventDefault();

    var id = $(this).parent().parent().parent().attr("id")
    var index = readingList.indexOf(id);
    
    if (index > -1) {readingList.splice(index,1)};

    localStorage.setItem("readingList",(JSON.stringify(readingList)));

    $(this).parent().parent().parent().remove();
}); 


// Function to Create a Reading List Item in the DOM
function populateReadingList() {
    console.log(listURL)


    $.ajax({
        url : listURL,
        method : "GET"
    }).then(function(response){
        console.log(response);

        var titleAPI = response.volumeInfo.title;

        var toRead = $("<div>");
        toRead.attr("id", response.id);

        var row = $("<div>");
        row.addClass("row list-item");

        var col1 = $("<div>");
        col1.addClass("col-lg-10");

        var col2 = $("<div>");
        col2.addClass("col-lg-2");

        var title = $("<p>");

        var removeBtn = $("<button>");
        removeBtn.text("X");
        removeBtn.addClass("btn btn-sm btn-warning removeFromList");
        
        title.text(titleAPI);

        toRead.append(row);
        row.append(col1);
        col1.append(title);

        row.append(col2);
        col2.append(removeBtn);

        $("#list").append(toRead);

    });
}
