function getDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
  
    if(dd<10) {
        dd = '0'+dd
    } 
  
    if(mm<10) {
        mm = '0'+mm
    } 
  
    today = yyyy + '-' + mm + '-' + dd;
    console.log(today);
    document.getElementById("date").value = today;
}
   
window.onload = function() {
    getDate();
};

function loadData(){
    let request = new XMLHttpRequest();

    let api_token = 'CHPO1UMSVjcgZA8oI6xmeLIxzAtVDXeiY6fypOF7npPkB7oqvjniWkg5Z2np';
    let includes = '&include=localTeam,visitorTeam,events,league';
    let date = '2021-10-03'
    //date = today;
    let url = 'https://soccer.sportmonks.com/api/v2.0/fixtures/date/' + date + '?api_token=' + api_token + includes;

    request.open('GET', url, true);

    let matchUp = [];

    request.onload = function() {
        let response = JSON.parse(this.response);
        console.log(response.data);

        let x = response.data.length;
        for(let i=0; i<x; i++){
            matchUp[i] = [
                JSON.stringify(response.data[i].league.data.name),
                JSON.stringify(response.data[i].localTeam.data.name),
                JSON.stringify(response.data[i].scores.localteam_score),
                JSON.stringify(response.data[i].scores.visitorteam_score),
                JSON.stringify(response.data[i].visitorTeam.data.name)
            ];  
        }

        //Removes "" from strings in array
        let y = matchUp[0].length;
        for(let j=0; j<x; j++){
            for(let k=0; k<y; k++){
                matchUp[j][k] = matchUp[j][k].replace(/['"]+/g, '');
            }
        }

        console.log(matchUp);

        for(let j=0; j<x; j++){
            if(matchUp[j][0] == 'Premiership'){
                document.getElementById('scottishPremiership').innerHTML += "<div id=matchUp_'" + j + "'><br><div id='homeTeam_" + j + "' class='val'>" + matchUp[j][1] + "</div><div id='homeTeamScore_" + j + "' class='val'> " + matchUp[j][2] + " </div><div class='val centered'>-</div><div id='awayTeamScore_" + j + "' class='val'> " + matchUp[j][3] + " </div><div id='awayTeam_" + j + "' class='val'>" + matchUp[j][4] + "</div></div>"
            }
        }
        for(let j=0; j<x; j++){
            if(matchUp[j][0] == 'Superliga'){
                document.getElementById('superliga').innerHTML += "<div id=matchUp_'" + j + "'><br><div id='homeTeam_" + j + "' class='val'>" + matchUp[j][1] + "</div><div id='homeTeamScore_" + j + "' class='val'> " + matchUp[j][2] + " </div><div class='val centered'>-</div><div id='awayTeamScore_" + j + "' class='val'> " + matchUp[j][3] + " </div><div id='awayTeam_" + j + "' class='val'>" + matchUp[j][4] + "</div></div>"
            }
        }
    }
    request.send();
}



function submitchange() {
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
    console.log(document.getElementById('date').value);

}


