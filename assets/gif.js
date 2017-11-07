$(document).ready(function() {

	var gifArray = ["Bugs Bunny", "Elmer Fudd", "cartman", "Edward Elric", "Fievel", "Donald Duck"];

	function displayGifInfo() {

		var gif = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=yhMQaBz113BusU9xWyLxY7cZPe0PAySl&q=" + gif +"&limit=25&offset=0&rating=G&lang=en;"

		$.ajax({
		url: queryURL,
		method: "GET"
		}).done(function(response) {
			
			data = $("<div>");
			
			$("#gifHolder").empty();
			for (var i = 0; i < 10; i++) {
			var rating = ("Rating: " + response.data[i].rating);
			var image = ('<img src="' + response.data[i].images.fixed_height_still.url + '" data-still="' + response.data[i].images.fixed_height_still.url + '" data-animate="' + response.data[i].images.fixed_height.url + '" data-state="still" class="animatedGif">');
			// data.append(image);
			data.append("<p>" + rating + "</p>" + image);
			data.prependTo("#gifHolder");
		

			console.log(image);
		}
			$(".animatedGif").on("click", function() {
        		var state = $(this).attr("data-state");
        		if (state == "still") {
            	$(this).attr("src", $(this).attr("data-animate"));
            	$(this).attr("data-state", "animate");
        		} 
        	
        		else {
            	$(this).attr("src", $(this).attr("data-still"));
            	$(this).attr("data-state", "still");
        		}
        	});	
		});
  	}

	function renderButtons() {
	
	$("#buttons-view").empty();
	for (var i = 0; i < gifArray.length; i++) {
		var a = $("<button>");

		a.addClass("gif");
		a.attr("data-name", gifArray[i]);
		a.text(gifArray[i]);
		$("#buttons-view").append(a);
	}
	}

		$("#add-gif").on("click", function(event) {
		event.preventDefault();
		var gif = $("#gif-input").val().trim();
		gifArray.push(gif);
		renderButtons();
		});
		$(document).on("click", ".gif", displayGifInfo);
		renderButtons();
		return false; 


});
