let today = new Date();
let date = today;
let dataLoaded = false;

$("#navBar").load("nav.html");


// window.onload = function(){
//     $.get("nav.html", function(data){
//         $("#navBar").html(data);
//     })
// }

function loadData(){
    let request = new XMLHttpRequest();

    let api_token = 'CHPO1UMSVjcgZA8oI6xmeLIxzAtVDXeiY6fypOF7npPkB7oqvjniWkg5Z2np';
    //let includes = '&include=localTeam,visitorTeam,events,league';
    //console.log(date);
    let url = 'https://soccer.sportmonks.com/api/v2.0/standings/season/17141?api_token=' + api_token;

    request.open('GET', url, true);
    let table = [];

    request.onload = function() {
        let response = JSON.parse(this.response);
        dataLoaded = true;
        console.log(response);

        if(JSON.stringify(response.data) == []) {
            console.log('the response is null');
        }

        let x = response.data[0].standings.data.length;
        console.log(x);
        for(let i=0; i<x; i++){
            table[i] = [
                JSON.stringify(response.data[0].standings.data[i].position),
                JSON.stringify(response.data[0].standings.data[i].team_name),
                JSON.stringify(response.data[0].standings.data[i].overall.points)/*
                JSON.stringify(response.data[i].league.data.logo_path),
                JSON.stringify(response.data[i].localTeam.data.logo_path),
                JSON.stringify(response.data[i].visitorTeam.data.logo_path)*/
            ];  
        }

        //Removes "" from strings in array
        let y = table[0].length;
        for(let j=0; j<x; j++){
            for(let k=0; k<y; k++){
                table[j][k] = table[j][k].replace(/['"]+/g, '');
            }
        }

        console.log(table);
        console.log(dataLoaded);

        for(let j=0; j<x; j++){
            //if(table[j][0] == 'Premiership'){
                document.getElementById('scottishPremiershipTableHeader').innerHTML = "<div><div class='position'>Pos</div><div class='teamName'>Club name</div><div class='tableData'>Pts</div></div>"
                document.getElementById('scottishPremiershipTable').innerHTML += "<div id=position_'" + j + "' class='tableRow'><div class='position'>" + table[j][0] + "</div><div class='teamName'>" + table[j][1] + "</div><div class='tableData'>" + table[j][2] + "</div></div>" 
            //}
        }
        for(let j=0; j<x; j++){
            if(table[j][0] == 'Superliga'){
                document.getElementById('superligaLogo').src = table[j][5];
                document.getElementById('superligaName').innerHTML = 'Danish ' + table[j][0];
                document.getElementById('superliga').innerHTML += "<br><div id=table_'" + j + "' class='table'><div class='home'><img src=" + table[j][6] + " class='teamLogo'><div id='homeTeam_" + j + "' class='val homeTeam'>" + table[j][1] + "</div><div id='homeTeamScore_" + j + "'class='val score'>" + table[j][2] + "</div></div><div class='val' id='dash'>-</div><div class='away'><div id='awayTeamScore_" + j + "' class='val score'>" + table[j][3] + "</div><div id='awayTeam_" + j + "' class='val awayTeam'>" + table[j][4] + "<img src=" + table[j][7] + " class='teamLogo'></div></div></div>"  
            }
        }

    }
    request.send();
}

function submitchange() {
    
    document.getElementById('scottishPremiershipTable').innerHTML = '';
    document.getElementById('superliga').innerHTML = '';

    if(document.getElementById('league').value == 'scottishPremiership_select'){
        document.getElementById('superliga_scores').style.display = 'none';
        document.getElementById('scottishPremiership_scores').style.display = 'block';
    }
    if(document.getElementById('league').value == 'superliga_select'){
        document.getElementById('scottishPremiership_scores').style.display = 'none';
        document.getElementById('superliga_scores').style.display = 'block';
    }
    if(document.getElementById('league').value == 'all_select'){
        document.getElementById('scottishPremiership_scores').style.display = 'block';
        document.getElementById('superliga_scores').style.display = 'block';
    }

    date = document.getElementById('date').value;
    loadData();
}

console.log(dataLoaded);

function checkDataLoaded(){
    console.log('test')
    if(dataLoaded == false) {
        console.log('data not loaded');
        document.getElementById('scores').style.display = 'none';
        //document.getElementById('scores').innerHTML = 'No Games Today';
    }
}


