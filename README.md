## Project 1 -- My Reading List

# 
We created a website that allows a user to look for novels, add them to a reading list, and mark them as complete when they have finished reading them.

The app uses two different book APIs, one to populate results and information related to the books, and another that allows the user to navigate to an external link that has additional information about the book as well as the ability to purchase it.

![Overview](https://raw.githubusercontent.com/Valborg1/project1/master/Assets/DemoPics/bookOverview.png)
#

The search form allows the user to search either by title, author or both. They can also select the number of results they would like to return. If the search fields are left blank, a modal will appear informing the user that they need to enter some information to be able to search.

![SearchForm](https://raw.githubusercontent.com/Valborg1/project1/master/Assets/DemoPics/bookSearchForm.png)
#

After submitting a search, they will appear on the left and display a title, a thumbnail image, the author, published date, and a snippet of information about the book.

When you hover over one of the search results, two buttons appear. One that allows you to add the book to a reading list, and another that allows you to learn more about the book.

![SearchResult](https://raw.githubusercontent.com/Valborg1/project1/master/Assets/DemoPics/bookSearchResults.png)
#

If the user opts to add a book to their reading list, it will be appended to the list and saved to localStorage. When the user hovers over items in their reading list, they can again, click a link to learn more about the book in their list, they can mark the book as complete (done reading), or they can remove the book from their reading list.

![ReadingList](https://raw.githubusercontent.com/Valborg1/project1/master/Assets/DemoPics/bookReadingList.png)
#

When the user marks a book as complete, it is added to the other tab with the other completed readings. Here, the completed books are listed in order of completion and a running tally of the total number of completed books year-to-date is displayed on the right.

![CompletedList](https://raw.githubusercontent.com/Valborg1/project1/master/Assets/DemoPics/bookCompletedList.png)
#

Live Site: https://valborg1.github.io/project1/

Repo: https://github.com/Valborg1/project1