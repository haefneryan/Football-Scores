let today = new Date();
let date = today;
let dataLoaded = false;

//Function to populate date input date with today's date
function getDate() {
    let dd = today.getDate();
    let mm = today.getMonth()+1; //January is 0!
    let yyyy = today.getFullYear();
  
    if(dd<10) {
        dd = '0'+dd
    } 
  
    if(mm<10) {
        mm = '0'+mm
    } 
  
    today = yyyy + '-' + mm + '-' + dd;
    //console.log(today);
    document.getElementById("date").value = today;
}

function loadData(){
    let request = new XMLHttpRequest();

    //Sets API URL, API token, and data includes
    let api_token = 'CHPO1UMSVjcgZA8oI6xmeLIxzAtVDXeiY6fypOF7npPkB7oqvjniWkg5Z2np';
    let includes = '&include=localTeam,visitorTeam,events,league';
    //console.log(date);
    let url = 'https://soccer.sportmonks.com/api/v2.0/fixtures/date/' + date + '?api_token=' + api_token + includes;

    request.open('GET', url, true);
    let matchUp = [];

    request.onload = function() {
        let response = JSON.parse(this.response);
        dataLoaded = true;
        console.log(response);

        //Parses response data into array
        let x = response.data.length;
        for(let i=0; i<x; i++){
            matchUp[i] = [
                JSON.stringify(response.data[i].league.data.name),
                JSON.stringify(response.data[i].localTeam.data.name),
                JSON.stringify(response.data[i].scores.localteam_score),
                JSON.stringify(response.data[i].scores.visitorteam_score),
                JSON.stringify(response.data[i].visitorTeam.data.name),
                JSON.stringify(response.data[i].league.data.logo_path),
                JSON.stringify(response.data[i].localTeam.data.logo_path),
                JSON.stringify(response.data[i].visitorTeam.data.logo_path)
            ];  
        }

        //Removes "" from strings in array
        if(x != 0 ){
            let y = matchUp[0].length;
            for(let j=0; j<x; j++){
                for(let k=0; k<y; k++){
                    matchUp[j][k] = matchUp[j][k].replace(/['"]+/g, '');
                }
            }
        }

        console.log(matchUp);
        console.log(dataLoaded);

        //Loops through array to populate Scottish Premiership Scores
        let scottishPremiershipCount = 0;
        for(let j=0; j<x; j++){
            if(matchUp[j][0] == 'Premiership'){
                document.getElementById('scottishPremiershipLogo').src = matchUp[j][5];
                document.getElementById('scottishPremiershipName').innerHTML = 'Scottish ' + matchUp[j][0];
                document.getElementById('scottishPremiership').innerHTML += "<br><div id=matchUp_'" + j + "' class='matchUp'><div class='home'><img src=" + matchUp[j][6] + " class='teamLogoHome'><div id='homeTeam_" + j + "' class='homeTeam'>" + matchUp[j][1] + "</div><div id='homeTeamScore_" + j + "'class='val score'>" + matchUp[j][2] + "</div></div><div class='val' id='dash'>-</div><div class='away'><div id='awayTeamScore_" + j + "' class='val score'>" + matchUp[j][3] + "</div><div id='awayTeam_" + j + "' class='awayTeam'>" + matchUp[j][4] + "</div><img src=" + matchUp[j][7] + " class='teamLogoAway'></div></div>" 
                scottishPremiershipCount++;
            }
        }

        if (scottishPremiershipCount == 0) {
            document.getElementById('scottishPremiership').innerHTML = '<br>No Games';
        }

        //Loops through array to populate Danish Superliga Scores
        let superligaCount = 0;
        for(let j=0; j<x; j++){
            if(matchUp[j][0] == 'Superliga'){
                document.getElementById('superligaLogo').src = matchUp[j][5];
                document.getElementById('superligaName').innerHTML = 'Danish ' + matchUp[j][0];
                document.getElementById('superliga').innerHTML += "<br><div id=matchUp_'" + j + "' class='matchUp'><div class='home'><img src=" + matchUp[j][6] + " class='teamLogoHome'><div id='homeTeam_" + j + "' class='homeTeam'>" + matchUp[j][1] + "</div><div id='homeTeamScore_" + j + "'class='val score'>" + matchUp[j][2] + "</div></div><div class='val' id='dash'>-</div><div class='away'><div id='awayTeamScore_" + j + "' class='val score'>" + matchUp[j][3] + "</div><div id='awayTeam_" + j + "' class='awayTeam'>" + matchUp[j][4] + "</div><img src=" + matchUp[j][7] + " class='teamLogoAway'></div></div>" 
                superligaCount++;
            }
        }

        if (superligaCount == 0) {
            document.getElementById('superliga').innerHTML = '<br>No Games';
        }

        //Styles score background depending on result
        for(let i=0; i<x; i++){
            if(matchUp[i][2] > matchUp[i][3]){
                document.getElementById('homeTeamScore_' + i).style.backgroundColor = 'green';
                document.getElementById('awayTeamScore_' + i).style.backgroundColor = 'red';
            }
            if(matchUp[i][2] < matchUp[i][3]){
                document.getElementById('homeTeamScore_' + i).style.backgroundColor = 'red';
                document.getElementById('awayTeamScore_' + i).style.backgroundColor = 'green';
            }
            if(matchUp[i][2] == matchUp[i][3]){
                document.getElementById('homeTeamScore_' + i).style.backgroundColor = 'grey';
                document.getElementById('awayTeamScore_' + i).style.backgroundColor = 'grey';
            }
        }

        //Populate if no games are played on selected day
        if(x == 0) {
            document.getElementById('scottishPremiership').innerHTML = '<br>No Games<br>';
            document.getElementById('superliga').innerHTML = '<br>No Games<br>';
        }

    }
    request.send();
}

function submitchange() {
    
    //Clears out what was in score divs
    document.getElementById('scottishPremiership').innerHTML = '';
    document.getElementById('superliga').innerHTML = '';

    //Turn off and on displaying scores depending on user input
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

