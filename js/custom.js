(function(w){
    var global = w;
    if(global){
        global.mgDatatable= {};
        global.mgDatatable.start = function (){

        fetch('https://api.myjson.com/bins/cb1d0')
        .then(
            function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }

            // Examine the text in the response
            response.json().then(function(data) {
                //let len = data["user_data"].length;
                let tableData = data["user_data"];
                global.mgTableData = tableData;
                CreateTable(tableData);
                FilterOnCity('Delhi');
                FilterOnCity('Mumbai');
               // SortTable();
            });
            }
        )
        .catch(function(err) {
            console.log('Fetch Error :-S', err);
        });
        };

        var CreateTable = function(tableData){

            if(document.getElementById("mg-head")){
                let elem = document.getElementById("mg-head");
                elem.innerHTML = '';
                //let trContentStart = "<tr class='showmg' data-city=''>";
                let trContentEnd = "</tr>";
                let tbContentStart = "<td>";
                let tbContentEnd = "</td>";
                let tContent = "";
                //document.getElementById("mg-head").append
                for(let i of tableData){

                    tContent += "<tr class='hidemg' data-city='"+i.city+"'>" 
                    + tbContentStart + i.first_name + tbContentEnd 
                    + tbContentStart + i.last_name + tbContentEnd
                    + tbContentStart + i.email + tbContentEnd
                    + tbContentStart + i.gender + tbContentEnd
                    + tbContentStart + i.city + tbContentEnd;
                    + trContentEnd;

                }
                //console.log(tContent);
                    elem.innerHTML+=tContent;
            }
            return true;
        }

        var FilterOnCity = function(city){
            var filterCity = document.querySelectorAll("tr[data-city='"+city+"']");
            for(let k of filterCity){
                k.setAttribute('class', 'showmg');
            }
        }

        var SortTable = function(){
            CreateTable(sortByKey(mgTableData, 'first_name'));
            }

        var sortByKey = function(array, key) {
            return array.sort(function(a, b) {
                var x = a[key]; var y = b[key];
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            }    

    }
    mgDatatable.start();
  }(window));