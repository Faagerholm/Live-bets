var xmlhttp = new XMLHttpRequest();


xmlhttp.open("GET", "https://eu-offering.kambicdn.org/offering/api/v2/ub/event/live/open.json?lang=fi_FI&market=FI&client_id=2&channel_id=1&ncid=1549893262830", true);
xmlhttp.send();

xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myTable = document.getElementById("live-events");
    var myObj = JSON.parse(this.responseText);

    myObj.liveEvents.forEach(element => {
        console.log(element.event);
        var row = document.createElement("TR");
        var data = document.createElement("TD");
        var data_name = document.createTextNode(element.event.englishName + " (" + element.event.sport.toLowerCase() + ")");

        var data_odds = document.createElement("Tr");
        try{
            element.mainBetOffer.outcomes.forEach(odds => {
                var innerData = document.createElement("TD");

            //console.log(odds);
            var o = document.createTextNode(odds.label);
            var new_line = document.createElement("br");
            var o2 = document.createTextNode((odds.odds/1000));
            
            innerData.appendChild(o);
            innerData.appendChild(new_line);
            innerData.appendChild(o2);
            data_odds.appendChild(innerData);
        });
    }
    catch(undefined){
        data_odds.appendChild(document.createTextNode("No odds for this game"));
    }
        
        data.appendChild(data_name);
        row.appendChild(data);
        row.appendChild(data_odds);
        myTable.appendChild(row);
    });

  }
};

function Search(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("live-events");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }