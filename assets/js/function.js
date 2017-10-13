$( document ).ready(function() {

// An array of Awesomeness, new Awesomeness selctions will be pushed into this array everytime the search button is clicked. 
var Awesomeness = ["Hawaii", "Alaska", "Harley", "Extreme Sports", "Fast Cars", "Surfing", "Scuba Diving", "Heavy Metal"];


// function to create buttons
function renderButtons(){
    // Using JQUERY to empty out the HTML buttons view.  This keeps the selections from stacking downward
    $("#gifButtonsView").empty(); 
    // using a for loop to go over the array and increment by 1
    for (var i = 0; i < Awesomeness.length; i++){
        // Using JQueury to create a HTML button var named gif button
        var gifButton = $("<button>");
        // adding an action class to the gifButton
        gifButton.addClass("action");
        // adding a class to the button type-to make it orange
        gifButton.addClass("btn btn-warning")
        // adding a data name attr to the gif button-the goes through the array index as it loops.
        gifButton.attr("data-name", Awesomeness[i]);
        // Creating the text for the buttons that get generated.  
        gifButton.text(Awesomeness[i]);
        // This adds to the gif buttons view field in HTML by bringing in the newly generated gifButton
        $("#gifButtonsView").append(gifButton);
    }
}
// Add new button function start
function addNewButton(){
    // The HTML add Gif field functions when it is clicked
    $("#addGif").on("click", function(){
    // create the variable action and make it equal to HTML action-input. Give it a value & remove white space.
    var action = $("#action-input").val().trim();
    // if the action comes up with null..
    if (action == ""){
        // https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault. This prevents the dynamic creation of tiny, non-functioning objects in the page. 
      event.preventDefault(); 
    }
    // This pushes the action to the Awesomeness array
    Awesomeness.push(action);
    // function the renderButtons
    renderButtons();
    event.preventDefault();
    });
}
// The removes the current selection 
function Clear(){
    // Jquery selects the removeGif on.click & runs-
    $("removeGif").on("click", function(){
      // This is what actually removes the element from the array. https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop?v=control
    Awesomeness.pop(action);
    // The removal affects the last renderButtons execution
    renderButtons();
    // Prevents the default action of the program to render buttons
    event.preventDefault();
    });
}
// function to display the Gifs
function displayGifs(){
    // Seclect the action of the button being clicked on & establishing the data name attribute
    var action = $(this).attr("data-name");
    // running the query using the website, action variable, API key & count of 10-https://wiki.apache.org/solr/SolrQuerySyntax
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + action + "&api_key=dc6zaTOxFJmzC&limit=10";
    // Console logging out the queryURL
    console.log(queryURL); 
    // running the ajax GET
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    // When the information comes back from the query
    .done(function(response) {
        // console log the response back from the query
        console.log(response); 
        // clear the gifsView HTML///Still figuring out how to append for multiple columns.
        $("#gifsView").empty(); 
        // Create a results variable and make it equal to the response.data so it can be used
        var results = response.data; 
        // if the results from the qeury does not have any information returned
        if (results == ""){
            // We send an alert to the user letting them not
          alert("Unable to locate GIF with selection.  Please try again.");
        }
        // We loop throught the query results in increments of one.
        for (var i=0; i<results.length; i++){
            // JQUERY creates a div under the gifDiv var
            var gifDiv = $("<div>"); 
            // Add the class of gifDiv to the newly created div 
            gifDiv.addClass("gifDiv");
            // Create and establish a text paragraph for the rating + the query results for the indexed gif
            var gifRating = $("<p>").text("Rating: " + results[i].rating);
            // we add the rating of the gif to the end of the paragraph: http://stackoverflow.com/questions/14846506/append-prepend-after-and-before
            gifDiv.append(gifRating);
            // JQUERY creates the html img element
            var img = $("<img>");
            // img attributes fixed_height_small_still: {url: "http://media0.giphy.com/media/op7uqYWBm3R04/100_s.gif",
            // width: "180", height: "100" https://github.com/Giphy/GiphyAPI
            img.attr("src", results[i].images.fixed_height_small_still.url);
            // set the img attribute when the data still results are selected // width: "180", height: "100" https://github.com/Giphy/GiphyAPI
            img.attr("data-still",results[i].images.fixed_height_small_still.url); 
            // set the img attribute to animate the data still results are selected // width: "180", height: "100" https://github.com/Giphy/GiphyAPI
            img.attr("data-animate",results[i].images.fixed_height_small.url); 
            // Adding the attribule for the data state to be still
            img.attr("data-state", "still"); 
            // Adding the class of image to the results
            img.addClass("image");
            // appending the gifDiv to have the img class
            gifDiv.append(img);
            // JQUERY inserting the gifDiv into the first child of the element: http://api.jquery.com/prepend/
            $("#gifsView").prepend(gifDiv);
        }
    });
}
// Rendering new buttons function
renderButtons();
// adding new buttons function
addNewButton();
// clearing old searches function
Clear();
// In the document, on the click event, the action class is established with the display gifs
$(document).on("click", ".action", displayGifs);
// in the document, on the click event, the image class is running a function
$(document).on("click", ".image", function(){
    // var state is equal (loosely) to the JQUERY attribute of still data-state
    var state = $(this).attr('data-state');
    // if the state is equal to still, function
    if ( state == 'still'){
        // the selected attribute source, take that objects data and animate it.
        $(this).attr('src', $(this).data('animate'));
        // the selected object attribute is changing the still data state to animate
        $(this).attr('data-state', 'animate');
    }else{
        // the JQUERY is taking the objects source URL and establishing the data to still
        $(this).attr('src', $(this).data('still'));
        // The JQUERY is adding the attribule for the data state to be still
        $(this).attr('data-state', 'still');
        // Essentially there are 2 options and each option has their own 2 variables that impact the functionality. 
    }
});
});
