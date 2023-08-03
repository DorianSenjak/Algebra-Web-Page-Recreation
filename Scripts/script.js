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
        console.log(response);
        const token = response.data.token;
        localStorage.setItem('loggedInUser', JSON.stringify({ username: username, token: token }));
        $('#loginButton').hide();
        $('#logoutButton').show();
        window.location.href="pocetna.html";
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
        window.location.href="prijava.html";
      } else {
        $('#errorMessage').text('Login failed. Please check your credentials and try again.').show();
      }
      },
    });
  }

  function logoutUser() {
    localStorage.removeItem('loggedInUser');
    $('#loginButton').show();
    $('#logoutButton').hide();
    $('#nastavniPlan').hide();
    window.location.href="pocetna.html"
  }

  if(localStorage.getItem('loggedInUser')==null){
    $('#loginButton').show();
    $('#logoutButton').hide();
  }
  else{
    $('#loginButton').hide();
    $('#logoutButton').show();
    $('#nastavniPlan').show();
  }

  $('#login_Button').on('click', loginUser);
  $('#registerButton').on('click', registerUser);
