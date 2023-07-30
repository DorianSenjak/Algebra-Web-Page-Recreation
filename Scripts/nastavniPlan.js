$(document).ready(function() {
    var kolegiji = [];
  
    // Dohvaćanje liste kolegija s API-ja i inicijalizacija autocomplete-a
    $.ajax({
      url: "http://www.fulek.com/data/api/supit/curriculum-list/hr",
      method: "GET",
      dataType: "json",
      success: function(data) {
        var kolegijiArr = data.map(function(kolegij) {
          return kolegij.naziv;
        });
  
        $("#txtKolegij").autocomplete({
          source: kolegijiArr
        });
      },
      error: function(error) {
        console.log("Greška prilikom dohvaćanja liste kolegija:", error);
      }
    });
  
    // Dodavanje kolegija na listu i ažuriranje tablice
    $("#addBtn").click(function() {
      var nazivKolegija = $("#txtKolegij").val().trim();
  
      $.ajax({
        url: "http://www.fulek.com/data/api/supit/get-curriculum?naziv=" + encodeURIComponent(nazivKolegija),
        method: "GET",
        dataType: "json",
        success: function(data) {
          if (data) {
            kolegiji.push(data);
            updateTable();
          } else {
            console.log("Kolegij ne postoji.");
          }
        },
        error: function(error) {
          console.log("Greška prilikom dohvaćanja kolegija:", error);
        }
      });
    });
  
    // Ažuriranje tablice kolegija
    function updateTable() {
      var ukupnoECTS = 0;
      var ukupnoSati = 0;
      var ukupnoPredavanja = 0;
      var ukupnoVjezbe = 0;
  
      $("#kolegiji tbody").empty();
  
      kolegiji.forEach(function(kolegij) {
        var row = "<tr>";
        row += "<td>" + kolegij.naziv + "</td>";
        row += "<td>" + kolegij.ects + "</td>";
        row += "<td>" + kolegij.sati + "</td>";
        row += "<td>" + kolegij.predavanja + "</td>";
        row += "<td>" + kolegij.vjezbe + "</td>";
        row += "<td>" + kolegij.tip + "</td>";
        row += "<td><button class='btn btn-danger btn-sm btn-remove'>Obriši</button></td>";
        row += "</tr>";
  
        $("#kolegiji tbody").append(row);
  
        ukupnoECTS += kolegij.ects;
        ukupnoSati += kolegij.sati;
        ukupnoPredavanja += kolegij.predavanja;
        ukupnoVjezbe += kolegij.vjezbe;
      });
  
      var ukupnoRow = "<tr>";
      ukupnoRow += "<td><b>Ukupno:</b></td>";
      ukupnoRow += "<td><b>" + ukupnoECTS + "</b></td>";
      ukupnoRow += "<td><b>" + ukupnoSati + "</b></td>";
      ukupnoRow += "<td><b>" + ukupnoPredavanja + "</b></td>";
      ukupnoRow += "<td><b>" + ukupnoVjezbe + "</b></td>";
      ukupnoRow += "<td></td>";
      ukupnoRow += "<td></td>";
      ukupnoRow += "</tr>";
  
      $("#kolegiji tfoot").empty().append(ukupnoRow);
  
      $(".btn-remove").click(function() {
        var rowIndex = $(this).closest("tr").index();
        kolegiji.splice(rowIndex, 1);
        updateTable();
      });
    }
  });
  