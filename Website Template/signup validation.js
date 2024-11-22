// If the user is not logged in and they try to access the profile page, then it will redirect them to the login page.
document.addEventListener("DOMContentLoaded", function(){
	// Check if the current page is profile by checking its title
	if (document.title === "Profile") {
		// Populate the fields with the signup details saved to localStorage.
    	var signupDetails = JSON.parse(localStorage.getItem('signupDetails'));
    	if (!signupDetails || Object.keys(signupDetails).length === 0) {
			// If no signup details are saved, the user is redirected to the login page.
			console.log("Signup details not found or empty.");
			window.location.href = "login.html";
    	} else {
			// Signup details loaded, put into their respective fields.
			var email = signupDetails.email;
			var firstName = signupDetails.firstName;
			var surname = signupDetails.surname;
			var dob = signupDetails.dob;
			var species = signupDetails.species;
			var mobile = signupDetails.mobile;
			
			var email_input = document.getElementById("email");
			email_input.value = email;
			var firstName_input = document.getElementById("firstName");
			firstName_input.value = firstName;
			var surname_input = document.getElementById("surname");
			surname_input.value = surname;
			var dob_input = document.getElementById("dob");
			dob_input.value = dob;
			// If mobile is included, put it into its field.
			if (mobile != ""){
				var mobile_input = document.getElementById("mobile");
				mobile_input.value = mobile;
			}
			var species_input = document.getElementById("species");
			var options = species_input.options;
			// Iterate through all options until match found. Set it to the match.
			for (var i = 0; i < options.length; i++){
				if (options[i].value === species){
					options[i].selected = true;
					break;
				}
			}
        	console.log("Signup success");
    	}
	}
	// Automatically iterate through a list of banners on the homepage.
	if(document.title ==="Home"){
	changeBanner();
	setInterval(changeBanner,5000);
	}
	// If the document is login and the user has created an account, redirect to profile.
	if(document.title ==="Login"){
		var signupDetails = JSON.parse(localStorage.getItem('signupDetails'));
		if (signupDetails || Object.keys(signupDetails).length === 0) {
			window.location.href = "profile.html"}
	}
});

function validateSignUp(event) {
    // fixes an issue where all fields would clear and 'signup successful' paragraph would disappear if all validation checks pass  
	event.preventDefault();
	
    // Create variables using self documenting identifiers and jquery for the inputs i want to validate. 
    var password = $("#password").val();
    var passwordReEntry = $("#passwordReEntry").val();
    var dob = $("#dob").val();
    var valid = true;
    
	// compare todays date to date entered in form
	var currentDate = new Date();
	// rework entered dob to create a Date object so it can be compared to todays date.
	var dobDate = new Date(dob);
    if (dobDate > currentDate) {
        alert("Date of Birth cannot be a future date.");
        valid = false;
    }
	var password_valid = updatePassword(password, passwordReEntry);
	if (!password_valid){
		valid = false;
	}
	// Save the validated details to localStorage. In a proper implementation, they would be stored to an external database.
	var email= $("#email").val();
    var firstName =  $("#firstName").val();
    var surname = $("#surname").val();
    var mobile = $("#mobile").val();
    var species = $("#species").val();
	// if all conditions met, save details to localStorage, load Profile.
    if (valid) {
		var signupDetails = {
			"email": email,
			"password": password,
			"firstName": firstName,
			"surname": surname,
			"dob": dob,
			"mobile": mobile,
			"species": species,
		}
		localStorage.setItem('signupDetails', JSON.stringify(signupDetails));
		console.log("Stored")
		//Redirect to profile.html
		window.location.href = "profile.html";
		}
}
function updateDetails(event){
	var signupDetails = JSON.parse(localStorage.getItem('signupDetails'));
	var changed = false;
	// check if the user wants to update their password.
	var password = $("#password").val();
    var passwordReEntry = $("#passwordReEntry").val();
	if (!(password === "" && passwordReEntry === "")){
		var valid = updatePassword(password, passwordReEntry);
		if (valid){
			// ovveride password in signupDetails json file if validation checks met
			signupDetails.password = password;
			changed = true;
		}
	}
	// If surname has been changed and is valid, save it to signupDetails
	var surname = $("#surname").val();
	var saved_surname = signupDetails.surname;
	if (surname != saved_surname){
		signupDetails.surname = surname;
		changed = true;
	}
	// if mobile has been entered and is not equal to a previously entered mobile, save it to signupDetails
	var mobile = $("#mobile").val();
	var saved_mobile = signupDetails.mobile;
	if (mobile != saved_mobile){
		signupDetails.mobile = mobile;
		changed = true;
	}
	// if species of pet has changed, save to signupDetails.
	var pet = document.getElementById("species");
	var selectedValue = pet.value;
	if (selectedValue != signupDetails.species){
		signupDetails.species = selectedValue;
		changed = true;
	}
	// If changes have been made, alert the user
	if (changed){
		alert("Changes saved successfully");
	}
	// If no changes have been made, prompt the user to enter something.
	if (!(changed)){
		alert("Error: Please input the change you would like to apply.")
	}
	localStorage.setItem("signupDetails", JSON.stringify(signupDetails));
}
// Validation for passwords
function updatePassword(password, reEntry){
	var valid = true;
	var passwordRequirements = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	//check if password entered matches the regular expression
    if (!password.match(passwordRequirements)) {
        alert("Password must contain at least 8 characters, including a capital letter, a special character, and a number.");
        valid = false;
    }
	//check if the re-entered password matches the original
    if (!(password === reEntry)) {
        alert("Passwords do not match. Please re-enter your password.");
        valid = false;
    }
	// Return true/false whether or not password is valid
	return valid	
}
function validateLogin(event) {
	event.preventDefault();
    // As there is no database to work with, I have hard coded a username and password. When they are entered, the profile will be loaded with details for the user to manipulate.
    var username = document.getElementById("email").value;
    var password = document.getElementById("password").value;
	
    if (username === "jpatton194@gmail.com" && password === "Password1!") {
        var signupDetails = {
            "email": "jpatton194@gmail.com",
            "password": "Password1!",
            "firstName": "Jake",
            "surname": "Patton",
            "dob": "2004-10-26",
            "mobile": "07123456789",
            "species": "Reptile",
        };
        localStorage.setItem('signupDetails', JSON.stringify(signupDetails));
        console.log("Stored");
        alert("Successfully logged in.");
        window.location.href = "profile.html";
    } else {
        // If user and pass aren't a match, show this error message.
        alert("Username and password combination not recognized.");
    }
}
// List of banner images
var images = ["field.jpg","stock.jpg","forest.jpg"];
// Set current image to the one at the start of the array. Send it to the back.
function changeBanner() {
    var currentImage = images.shift();
    images.push(currentImage);
    $('#banner').fadeOut('fast', function() {
        $(this).css('background-image', 'url(' + currentImage + ')').fadeIn('slow');
    });
};
// List of videos on home page.
var videos = ["tortoise.mp4", "tortoise2.mp4", "tortoise3.mp4"];
var currentIndex = 0;

function changeVideo(step){
	// When next/prev clicked, go back or forward to the corresponding video.
	currentIndex += step;
	if (currentIndex < 0){
		currentIndex = videos.length -1;
	} else if (currentIndex >= videos.length){
		currentIndex = 0;
	};
	document.getElementById("video").src = videos[currentIndex]
}

// FAQ page functionality to show the answer when its respective question is clicked. If it is clicked and the answer is already visible, it will be hidden again.	
function toggleAnswer(id) {
	var answer = document.getElementById(id);
    if (answer.style.display === "block") {
        answer.style.display = "none";
    }
	else {
        answer.style.display = "block";
        }
    }
// Remove signup details for security purposes from localStorage. They would remain in a database in a real-life implementation. 
function logout(){
	localStorage.removeItem("signupDetails");
	// Redirect to login.
	window.location.href = "login.html";
}

// Load users saved accessibility settings.
$(document).ready(function(){
  var accessibilitySettings = JSON.parse(localStorage.getItem('accessibilitySettings'));
  if (!accessibilitySettings) {
	  // If no settings are saved to localStorage, defaults are initialized.
    var settings = {
      "imageZoom": false,
      "fontSize": 100
    }
    localStorage.setItem('accessibilitySettings', JSON.stringify(settings));
    accessibilitySettings = settings;
  }
// If image zoom is enabled in localStorage, then this functionality is activated.
  if (accessibilitySettings.imageZoom) {
    $(".zoom").hover(function(){
      $(this).addClass('hover');
    }, function(){
      $(this).removeClass('hover');
    });
  }
// Fontsize preference is loaded from local storage. 100 is the default, percentage change is calculated and applied here.
  var fontSize = accessibilitySettings.fontSize;
  if (fontSize != 100){
    $('h1').css('font-size', 32 * (fontSize / 100) + 'px');
    $('h2').css('font-size', 24 * (fontSize / 100) + 'px');
    $('h3').css('font-size', 18.72 * (fontSize / 100) + 'px');
    $('h5').css('font-size', 13.28 * (fontSize / 100) + 'px');
    $('h6').css('font-size', 10.72 * (fontSize / 100) + 'px');
    $('a, label, p, h4').css('font-size', 16 * (fontSize / 100) + 'px');
  }
   // When the apply button is clicked, then the new font size settings are applied and saved to localStorage.
  $('#apply-btn').on('click', function() {
    var fontSizeIncrement = $('#slider').val() * 2; // Convert slider value to percentage
    var newFontSize = 100 + fontSizeIncrement; 
    accessibilitySettings.fontSize = newFontSize;
  	// Percentage change in font size from default is calculated and applied.
    $('h1').css('font-size', 32 * (newFontSize / 100) + 'px');
    $('h2').css('font-size', 24 * (newFontSize / 100) + 'px');
    $('h3').css('font-size', 18.72 * (newFontSize / 100) + 'px');
    $('h4').css('font-size', 16 * (newFontSize / 100) + 'px');
    $('h5').css('font-size', 13.28 * (newFontSize / 100) + 'px');
    $('h6').css('font-size', 10.72 * (newFontSize / 100) + 'px');
    $('a, label, p').css('font-size', 16 * (newFontSize / 100) + 'px');

    // Save settings to localStorage
    localStorage.setItem('accessibilitySettings', JSON.stringify(accessibilitySettings));
  });
});


	
				 
var cont = document.getElementById("container")
function changeSizeBySlider() {
    var slider = document.getElementById("slider");
    // Set slider value as fontSize
    cont.style.fontSize = slider.value + "px";
}