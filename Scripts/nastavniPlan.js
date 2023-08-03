// Store the base API URL
const baseURL = "https://www.fulek.com/data/api/supit";

// Function to fetch the course data from the API
function fetchCoursesData() {
  const token = JSON.parse(localStorage.getItem('loggedInUser'))?.token;

  return $.ajax({
    url: `https://www.fulek.com/data/api/supit/curriculumlist/hr`,
    method: "GET",
    Headers:{
      "Caller":token
    },
    error: function(response){
      console.log(response);
      console.log(token);
    }
  });
}

$(document).ready(function(){
  fetchCoursesData();
})