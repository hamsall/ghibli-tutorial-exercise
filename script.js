// Store the element with the class 'content' as a variable for later use
let content = document.querySelector('.content');

// Create new request for data and store as variable
var request = new XMLHttpRequest();

// Open a connection to the API endpoint,
//  passing in the arguments: (HTTP METHOD, URL ENDPOINT)
request.open('GET', 'https://ghibliapi.herokuapp.com/films');


// When the URL loads
request.onload = function () {

  // Parse the response from the API as JSON data and store in a variable
  let data = JSON.parse(this.response);
  // console.log(data); // Uncomment to see the returned response

  // Check the status codes to see if the request was successful
  if (request.status >= 200 && request.status < 400) {

    // Loop through each item in the returned array
    data.forEach(function(movie) {
      // console.log(movie) // Uncomment to see each array item stored as movie

      /* ------------------------------------------------------
      Create and configure the HTML elements to house the data
      ------------------------------------------------------ */

      // Card container
      let card = document.createElement('div');
      card.setAttribute('class', 'card');

      // Title Heading
      let heading = document.createElement('h1');
      heading.textContent = movie.title;

      // Description Paragraph
      let paragraph = document.createElement('p');
      movie.description = movie.description.substring(0, 300);
      paragraph.textContent = `${movie.description}...`;

      // Append the card to the main content container (Step 1)
      content.appendChild(card);

      // Append all the sub elements to the card container
      card.appendChild(heading);
      card.appendChild(paragraph);


      /* -----------------------
      EXERCISE 3 - LOCAL STORAGE
      ----------------------- */

      // Create favourites button HTML Element
      let button = document.createElement('button');
      button.textContent = "Add to Favourites";

      //Append favourites button to card container
      card.appendChild(button);

      // Add an event listener to the button
      button.addEventListener("click", function(event) {

        // Create a key to store the movie title
        // This must be a string, and needs to be unique for each movie, otherwise will overwirte existing localStorage
        // HINT: Find out how many items are in local storage, then add 1
        let key = (localStorage.length + 1).toString();

        // Store the value of the movie title as a variable
        // HINT: Get the title from the <h1> element in the parent card container
        var value = this.parentNode.getElementsByTagName('h1')[0].textContent;

        // console.log(key, value); // Uncomment to see the key value pair


        console.log(localStorage);

        // var toSearch = value;
        // if(localStorage.key(i).indexOf(toSearch)!=-1) {
        //
        // //   console.log(value);
        // // //   // Add the key/value pair to localStorage
        //   localStorage.setItem(key, value);
        // }

        // Create variable to store whether the value exists
        let exists = false;
        // loop through items in storage
        for(var i=0; i<localStorage.length; i++) {
            // compare each value for every key in local storage with input value from user
            if(localStorage.getItem(localStorage.key(i)) == value) {
              // set exists to true only if value found
              exists = true;
            }
        }
        // check exists boolean and add item if value doesn't exist
        if (exists == false){
          localStorage.setItem(key, value);
        }
        // Call the updateFavourites() function to refresh the list of movies
        updateFavourites();
      });




    });

  } else {
    // Handle error if API reqest is not successful
    let errorMessage = document.createElement('p');
    errorMessage.textContent = 'Error, unable to access API. Error: ' + request.status;
    content.appendChild(errorMessage);
  }
}

// Send request for processing - important that this is after the onload function
request.send();

/* -----------------------
EXERCISE 3 - LOCAL STORAGE
LEAVE THE FOLLOWING CODE
----------------------- */

updateFavourites();

let clearButton = document.getElementById("clear");
clearButton.addEventListener("click", function(){
  localStorage.clear();
  updateFavourites();
})

function updateFavourites(){
  let list = document.querySelector("aside ul");
  list.innerHTML = "";
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      // console.log(key, value);
      let listItem = document.createElement("li");
      listItem.textContent = value;
      list.appendChild(listItem);
    }
  }
}

/* -----------------------
EXERCISE 1 - LOCAL STORAGE
LEAVE THE FOLLOWING CODE
----------------------- */

updateFavourites();
clearButton.addEventListener("click", function(){
  localStorage.clear();
  updateFavourites();
})

function updateFavourites(){
  let list = document.querySelector("aside ul");
  list.innerHTML = "";
  if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++){
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);
      // console.log(key, value);
      let listItem = document.createElement("li");
      listItem.textContent = value;
      list.appendChild(listItem);
    }
  }
}