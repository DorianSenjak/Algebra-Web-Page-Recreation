var _CURRICULUM = [];
var _currNAMES = [];
var _fetchedCurriculumIDs = {};
var totalECTS = 0;
var totalHOURS = 0;
var totalLECTURES = 0;
var totalEXERCISES = 0;

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
        saveUserToken(response);
        $('#loginButton').hide();
        $('#logoutButton').show();
        window.location.href="pocetna.html";
        } else {
            $('#errorMessage').text('User not found').show();
            console.log(response);
        }
      }
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

$("#curriculumName").on("click", function(){ //
    var jwtToken = localStorage.getItem('jwtToken');
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
        }
    });
    $.get('https://www.fulek.com/data/api/supit/curriculum-list/hr', function(response) {
        $.each(response, function(key, value) {
            if (key == 'data') {
                $.each(value, function(i, val){
                    if(!_fetchedCurriculumIDs[val.id]){
                    _CURRICULUM.push(val);
                    _currNAMES.push(val.kolegij);
                    _fetchedCurriculumIDs[val.id] = true;
                    }
                }) 
            }
        });
    });
})

function logoutUser() {
    localStorage.removeItem('jwtToken');
    $('#loginButton').show();
    $('#logoutButton').hide();
    $('#nastavniPlan').hide();
    window.location.href="pocetna.html"
  }

function saveUserToken(response)
{
    $.each(response, function(key, value){
        if (key == "data") {
            $.each(value, function(i, val){
                if (i == 'token') {
                    localStorage.setItem('jwtToken', val);
                }
            })
        }
    })
}


$(function(){
    $("#curriculumName").autocomplete({
        minLength: 0,
        source: _currNAMES,
        select: function( event, ui ) {
            $(".table").show();
            // reset input field
            $(this).val("");
            $.each(_CURRICULUM, function(key, value){
                if (ui.item.value == value.kolegij) {
                    var courseName = value.kolegij;
                    var ects = value.ects;
                    var hours = value.sati;
                    var lectures = value.predavanja;
                    var exercises = value.vjezbe;
                    var type = value.tip;
                    var newRow = "<tr class='algebra-table-row-animation'>" +
                                    "<th scope='row'>" + courseName + "</th>" +
                                    "<td class='ects'>" + ects + "</td>" +
                                    "<td class='hours'>" + hours + "</td>" +
                                    "<td class='lectures'>" + lectures + "</td>" +
                                    "<td class='exercises'>" + exercises + "</td>" +
                                    "<td>" + type + "</td>" +
                                    "<td><button type='button' class='btn btn-danger'>Delete</button></td>" +
                                "</tr>";
                    $(".table-body").fadeIn(1000).append(newRow);
                    updateTotal(value, 'add');
                }
            })
            return false;
          } 
      })
});


 $('#table-body').on("click", ".btn-danger", function() {
    var row = $(this).closest("tr");
    var value = {
        ects: row.find(".ects").text(),
        sati: row.find(".hours").text(),
        predavanja: row.find(".lectures").text(),
        vjezbe: row.find(".exercises").text()
    };
    updateTotal(value, 'del');
    row.fadeOut(400, function(){
        $(this).remove();
    });
});

function updateTotal(value, operation)
{
    if (operation == 'add')
    {
        totalECTS += value.ects;
        totalHOURS += value.sati;
        totalLECTURES += value.predavanja;
        totalEXERCISES += value.vjezbe; 
    }
    else if (operation == 'del') 
    {
        totalECTS -= value.ects;
        totalHOURS -= value.sati;
        totalLECTURES -= value.predavanja;
        totalEXERCISES -= value.vjezbe;
    }
    
    $("#totalECTS").text(totalECTS);
    $("#totalHours").text(totalHOURS);
    $("#totalLectures").text(totalLECTURES);
    $("#totalExercises").text(totalEXERCISES);
}

if(localStorage.getItem('jwtToken')==null){
    $('#loginButton').show();
    $('#logoutButton').hide();
  }
  else{
    $('#loginButton').hide();
    $('#logoutButton').show();
    $('#nastavniPlan').show();
  }

  $('#logIn').on('click', loginUser);
  $('#registerButton').on('click', registerUser);


console.log(_CURRICULUM);
console.log(_currNAMES);