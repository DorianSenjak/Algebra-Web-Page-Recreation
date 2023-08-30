
var _CURRICULUM = [];
var _currNAMES = [];
var _fetchedCurriculumIDs = {};
// total fields
var totalECTS = 0;
var totalHOURS = 0;
var totalLECTURES = 0;
var totalEXERCISES = 0;

/* LOG IN - REGISTER*/
$(document).ready(function() {
    $('#logIn').on('click', function(){
        var username = $('#username').val();
        var password = $('#password').val();
        var url = 'https://www.fulek.com/data/api/user/login';

        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify({
                username: username,
                password: password
            }),
            dataType: "json",
            contentType: 'application/json',
            success: function(data, status) {
                console.log(status);
                $.each(data, function(key, value){
                    var errorMsg = "";
                    if (key == 'errorMessages') {
                        errorMsg = value[0];
                    }
                    if (key == 'isSuccess' && value == true) {
                        saveUserToken(data);
                        $('#loginButton').hide();
                        $('#logoutButton').show();
                        window.location.href="pocetna.html";
                    }
                })
            },
            error: function(error) {                
                console.log('Error:', error);
            }
        });
    });

    $('#registerButton').on('click', function(){
        var username = $('#username').val();
        var password = $('#username').val();
        var url = 'https://www.fulek.com/data/api/user/register';
        $.ajax({
            type: 'POST',
            url: url,
            data: JSON.stringify({
                username: username,
                password: password
            }),
            dataType: "json",
            contentType: 'application/json',
            success: function(data, status) {
                console.log(status);
                window.location.href="prijava.html";
            },
            error: function(error) {
                console.log('Error:', error); 
            }
        });
    });
});

$("#curriculumName").on("click", function(){ //
    var jwtToken = localStorage.getItem('jwtToken');
    $.ajaxSetup({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + jwtToken);
        }
    });
    // Send a GET request to the server to retrieve the protected data
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
    localStorage.removeItem('loggedInUser');
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
                    // Save the JWT token to the local storage
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
            // show the table after selection
            $(".table").show();
            // reset input field
            $(this).val("");
            $.each(_CURRICULUM, function(key, value){
                // find the name of a curriculum in collection
                if (ui.item.value == value.kolegij) {
                    // save all values to local variables
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
                                    // delete functionality
                                    "<td><button type='button' class='btn btn-danger'>Delete</button></td>" +
                                "</tr>";
                    // make a new row in table
                    $(".table-body").fadeIn(1000).append(newRow);
                    // update the "total" fields
                    updateTotal(value, 'add');
                }
            })
            return false;
          } 
      })
});


 $('#table-body').on("click", ".btn-danger", function() {
    var row = $(this).closest("tr");
    // save values of the row
    var value = {
        ects: row.find(".ects").text(),
        sati: row.find(".hours").text(),
        predavanja: row.find(".lectures").text(),
        vjezbe: row.find(".exercises").text()
    };
    // update total values
    updateTotal(value, 'del');
    // remove the row
    row.fadeOut(400, function(){
        $(this).remove();
    });
});

// function to update the total fields
function updateTotal(value, operation)
{
    // update global variables 
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
    
    // update the table
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

$('#logoutButton').on('click', function() {
    localStorage.removeItem('jwtToken');
})

console.log(_CURRICULUM);
console.log(_currNAMES);