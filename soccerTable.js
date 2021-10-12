let today = new Date();
let date = today;

//loads data for Scottish Premiership
function loadData(){
    let request = new XMLHttpRequest();

    let api_token = 'CHPO1UMSVjcgZA8oI6xmeLIxzAtVDXeiY6fypOF7npPkB7oqvjniWkg5Z2np';
    let seasonID = null;
    console.log(seasonID)
    console.log(document.getElementById('season').value);
    do {
        seasonID = 18369; //ID for current season
        if (document.getElementById('season').value == '2020/21') { seasonID = 17141}
        if (document.getElementById('season').value == '2019/20') { seasonID = 16222}
    } while (seasonID == null)
    //console.log(date);
    let url = 'https://soccer.sportmonks.com/api/v2.0/standings/season/' + seasonID + '?api_token=' + api_token;

    request.open('GET', url, true);
    let table = [];

    request.onload = function() {
        let response = JSON.parse(this.response);
        console.log(response);

        if(JSON.stringify(response.data) == []) {
            console.log('the response is null');
        }

        let x = response.data[0].standings.data.length;
        for(let i=0; i<x; i++){
            table[i] = [
                JSON.stringify(response.data[0].standings.data[i].position),
                JSON.stringify(response.data[0].standings.data[i].team_name),
                JSON.stringify(response.data[0].standings.data[i].overall.points),
                JSON.stringify(response.data[0].standings.data[i].overall.games_played),
                JSON.stringify(response.data[0].standings.data[i].overall.won),
                JSON.stringify(response.data[0].standings.data[i].overall.draw),
                JSON.stringify(response.data[0].standings.data[i].overall.lost)
            ];
            if (seasonID == 16222) {
                table[i][2] = JSON.stringify(response.data[0].standings.data[i].points);
            }
        }

        //Removes "" from strings in array
        let y = table[0].length;
        for(let j=0; j<x; j++){
            for(let k=0; k<y; k++){
                table[j][k] = table[j][k].replace(/['"]+/g, '');
            }
        }
        console.log('SCOTTISH');
        console.log(table);

        for(let j=0; j<x; j++){
            document.getElementById('scottishPremiershipTableHeader').innerHTML = "<div><div class='position'>Pos</div><div class='teamName'>Club</div><div class='tableData'>GP</div><div class='tableData'>W</div><div class='tableData'>D</div><div class='tableData'>L</div><div class='tableData'>Pts</div></div>"
            document.getElementById('scottishPremiershipTable').innerHTML += "<div id=position_'" + j + "' class='tableRow'><div class='position'>" + table[j][0] + "</div><div class='teamName'>" + table[j][1] + "</div><div class='tableData'>" + table[j][3] + "</div><div class='tableData'>" + table[j][4] + "</div><div class='tableData'>" + table[j][5] + "</div><div class='tableData'>" + table[j][6] + "</div><div class='tableData'>" + table[j][2] + "</div></div>";
        }

    }
    request.send();
}

//loads data for Danish Superliga
function loadData_2(){
    let request = new XMLHttpRequest();
    
    let api_token = 'CHPO1UMSVjcgZA8oI6xmeLIxzAtVDXeiY6fypOF7npPkB7oqvjniWkg5Z2np';
    let seasonID = null;
    console.log(seasonID)
    console.log(document.getElementById('season').value);
    do {
        seasonID = 18334; //ID for current season
        if (document.getElementById('season').value == '2020/21') { seasonID = 17328}
        if (document.getElementById('season').value == '2019/20') { seasonID = 16020}
    } while (seasonID == null)
    //console.log(date);
    let url = 'https://soccer.sportmonks.com/api/v2.0/standings/season/' + seasonID + '?api_token=' + api_token;
    
    request.open('GET', url, true);
    let table = [];
    
    request.onload = function() {
        let response = JSON.parse(this.response);
        console.log(response);
        
        if(JSON.stringify(response.data) == []) {
            console.log('the response is null');
        }
        
        let x = response.data[0].standings.data.length;
        for(let i=0; i<x; i++){
            table[i] = [
                JSON.stringify(response.data[0].standings.data[i].position),
                JSON.stringify(response.data[0].standings.data[i].team_name),
                JSON.stringify(response.data[0].standings.data[i].overall.points),
                JSON.stringify(response.data[0].standings.data[i].overall.games_played),
                JSON.stringify(response.data[0].standings.data[i].overall.won),
                JSON.stringify(response.data[0].standings.data[i].overall.draw),
                JSON.stringify(response.data[0].standings.data[i].overall.lost)
            ];
            if (seasonID == 16020) {
                table[i][2] = JSON.stringify(response.data[0].standings.data[i].total.points);
            }
        }
        
        //Removes "" from strings in array
        let y = table[0].length;
        for(let j=0; j<x; j++){
            for(let k=0; k<y; k++){
                table[j][k] = table[j][k].replace(/['"]+/g, '');
            }
        }
        
        console.log('SUPERLIGA')
        console.log(table);

        for(let j=0; j<x; j++){
            document.getElementById('superligaTableHeader').innerHTML = "<div><div class='position'>Pos</div><div class='teamName'>Club</div><div class='tableData'>GP</div><div class='tableData'>W</div><div class='tableData'>D</div><div class='tableData'>L</div><div class='tableData'>Pts</div></div>"
            document.getElementById('superligaTable').innerHTML += "<div id=position_'" + j + "' class='tableRow'><div class='position'>" + table[j][0] + "</div><div class='teamName'>" + table[j][1] + "</div><div class='tableData'>" + table[j][3] + "</div><div class='tableData'>" + table[j][4] + "</div><div class='tableData'>" + table[j][5] + "</div><div class='tableData'>" + table[j][6] + "</div><div class='tableData'>" + table[j][2] + "</div></div>";
        }
    }
    request.send();
}


function submitchange() {
    
    document.getElementById('scottishPremiershipTable').innerHTML = '';
    document.getElementById('superligaTable').innerHTML = '';

    //Turn off and on displaying scores depending on user input
    if(document.getElementById('league').value == 'scottishPremiership_select'){
        document.getElementById('superliga').style.display = 'none';
        document.getElementById('scottishPremiership').style.display = 'block';
    }
    if(document.getElementById('league').value == 'superliga_select'){
        document.getElementById('scottishPremiership').style.display = 'none';
        document.getElementById('superliga').style.display = 'block';
    }
    if(document.getElementById('league').value == 'all_select'){
        document.getElementById('scottishPremiership').style.display = 'block';
        document.getElementById('superliga').style.display = 'block';
    }

    loadData();
    loadData_2();
}
