function loginUser() {
    const username = $('#username').val();
    const password = $('#password').val();
    const loginUrl = 'https://www.fulek.com/data/api/user/login';
  
    const data = {
      username: username,
      password: password,
    };
  
    $.ajax({
      url: loginUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        if (response.isSuccess) {
        const user = data.username;

        const expirationTime = new Date();
        expirationTime.setTime(expirationTime.getTime() + 30 * 60 * 1000);

        document.cookie = 'userName=${encodeURIComponent(user.name)}; expires=${expirationTime.toUTCString()}; path=/';
        updateHeaderWithUser(user.name);
        } else {
            $('#errorMessage').text('User not found').show();
        }
      },
      error: function (error) {
        console.error('Error:', error);
        alert('An error occurred during login. Please try again later.');
      },
    });
  }
  
  function registerUser() {
    const username = $('#username').val();
    const password = $('#password').val();
    const registerUrl = 'https://www.fulek.com/data/api/user/register';
  
    const data = {
      username: username,
      password: password,
    };
  
    $.ajax({
      url: registerUrl,
      type: 'POST',
      contentType: 'application/json',
      data: JSON.stringify(data),
      success: function (response) {
        if (response.isSuccess) {
        
      } else {
        $('#errorMessage').text('Login failed. Please check your credentials and try again.').show();
      }
      },
    });
  }

  function updateHeaderWithUser(userName) {
    $('#loggedInUser').text(userName);
  
    $('#loginButton').hide();
    $('#loggedInUser').show();
  }
  
  $('#loginButton').on('click', loginUser);
  $('#registerButton').on('click', registerUser);
