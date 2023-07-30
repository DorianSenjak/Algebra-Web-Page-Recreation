// script.js

// Function to handle login form submission
function loginUser() {
    const username = $('#username').val();
    const password = $('#password').val();
    const loginUrl = 'https://www.fulek.com/data/api/user/login'; // Replace this with your login API endpoint
  
    // Create a data object with the username and password
    const data = {
      username: username,
      password: password,
    };
  
    // Make a POST request to the login API using jQuery
    $.ajax({
      url: loginUrl,
      type: 'POST',
      contentType: 'application/json',
      data: data,
      success: function (response) {
        if (response.success) {
          alert('Login successful!'); // You can redirect the user to the dashboard or homepage here
        } else {
            $('#errorMessage').text('User not found').show(); // Display error message if login fails
        }
      },
      error: function (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again later.');
      },
    });
  }
  
  // Function to handle registration form submission
  function registerUser() {
    const username = $('#username').val();
    const password = $('#password').val();
    const registerUrl = 'https://www.fulek.com/data/api/user/register'; // Replace this with your registration API endpoint
  
    // Create a data object with the username and password
    const data = {
      username: username,
      password: password,
    };
  
    // Make a POST request to the registration API using jQuery
    $.ajax({
      url: registerUrl,
      type: 'POST',
      contentType: 'json',
      data: JSON.stringify(data),
      success: function (response) {
        if (response.success) {
          alert('Registration successful!'); // You can redirect the user to the login page here
        } else {
          alert('Registration failed. Please try again later.'); // Display error message if registration fails
        }
      },
      error: function (error) {
        console.error('Error:', error);
        alert('An error occurred during registration. Please try again later.');
      },
    });
  }
  
  // Add event listeners to the login and registration buttons
  $('#loginButton').on('click', loginUser);
  $('#registerButton').on('click', registerUser);
  