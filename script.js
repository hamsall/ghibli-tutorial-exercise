// Store the element with the class 'content' as a variable for later use
let content = document.querySelector('.content');

// Create new request for data and store as variable
var request = new XMLHttpRequest();

// Open a connection to the API endpoint,
//  passing in the arguments: (HTTP METHOD, URL ENDPOINT)
request.open('GET', 'https://ghibliapi.herokuapp.com/films');


// When the URL loads
request.onload = function() {

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

      //Create button element
      let favButton = document.createElement("button");
      favButton.textContent = "Add to Favourites";

      card.appendChild(favButton);

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