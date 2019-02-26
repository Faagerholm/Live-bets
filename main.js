
// Unibet
var UnibetXML = new XMLHttpRequest();
UnibetXML.open("GET", "https://eu-offering.kambicdn.org/offering/v2018/ub/listView/football/champions_league.json?lang=en_GB&market=ZZ&client_id=2&channel_id=1&ncid=1551181137308&useCombined=true", true);
UnibetXML.send();
UnibetXML.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myTable = document.getElementById("live-events");
    var myObj = JSON.parse(this.responseText);

    myObj.events.forEach(element => {
        var row = document.createElement("TR");
        var data = document.createElement("TD");
        var data_name = document.createTextNode("UB: " + element.event.englishName + " (" + element.event.sport.toLowerCase() + ")");

        var data_odds = document.createElement("Tr");
        try{
            element.betOffers[0].outcomes.forEach(odds => {
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
// NordicBet
var nb_marketCount = 50;
const nb_categories = {
  champions_league: 6134,
  tennis: 3506,
  // 2612,3505,4521,295,3,1607,7,4,5,6,8,2705,2706,3909,16455,4084,12,121,13,17056,17053,17055,15,16,122,1884,2143,9,11,10,413,11812,2715,3016,3799,2975,5128,3135,1036,3132,16945,7363,9906,5068,43,26,627,138,140,139,158,19,127,20,410,2390,6049,563,25,398,144,250,253,11873,2022,128,129,130,131,734,3413,3417,3418,3419,3420,3421,6054,6081,23,459,1549,1227,41,683,2227,11361,11379,1478,1480,1489,5292,1,109,33,155,14671,691,5776,29,124,30,31,32,283,45,628,458,163,164,35,637,519,2375,27,1951,634,2632,284,622,735,28,49,399,5652,5388,6126,15723,17103,17104
};
var NordicbetXML = new XMLHttpRequest();
NordicbetXML.open("GET", "https://sbsitefacade2.bpsgameserver.com/isa/v2/901/en/event?betgroupgroupingids=36&eventPhase=1&eventSortBy=2&marketCount="+ nb_marketCount +"&page=1&subCategoryIds=6134&ocb=e5f51506-f286-41a8-9cb4-c92b13697643");
NordicbetXML.send();
NordicbetXML.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myTable = document.getElementById("live-events");
    var myObj = JSON.parse(this.responseText);

    myObj.el.forEach(element => {
      var row = document.createElement("TR");
      var data = document.createElement("TD");
      console.log(element.en);
      var data_name = document.createTextNode("NB: " + element.en + " (" + element.cn.toLowerCase() + ")");

      var data_odds = document.createElement("Tr");
      try{
        element.ml.forEach(odds => {
          odds.msl.forEach(odd => {
            var innerData = document.createElement("TD");
            var o = document.createTextNode(odd.mst);
            var new_line = document.createElement("br");
            var o2 = document.createTextNode((odd.msp));
            innerData.appendChild(o);
            innerData.appendChild(new_line);
            innerData.appendChild(o2);
            data_odds.appendChild(innerData);
          });
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
}
function Search(){
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("live-events");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0];
      if (td && !td.firstElementChild) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
          tr[i].style.display = "";
        } else {
          tr[i].style.display = "none";
        }
      }       
    }
  }