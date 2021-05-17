function loadDataFromJson(){
  fetch('week.json').then(function(response) {
    return response.json();
  }).then(function(json) {
    let week = json;
    initialize(week);
  }).catch(function(err) {
    console.log('Fetch problem: ' + err.message);
  });
}

function initialize(wkn){
  let dgn = [];
  for(let j = 0; j<wkn.length;j++){
    let w11 = new Week(wkn[j].weeknr, []);
    for(let i = 0; i< 7;i++){    
      if(wkn[j].dagen[i]){
        let d1 = wkn[j].dagen[i];
        let nwD = new Dag(d1.datum, d1.begin, d1.eind, d1.pauze);
        nwD.bijz = d1.bijz;
        nwD.calcUren();
        w11.dagen.push(nwD);
      
      }
      weken[wkn[j].weeknr] = w11;
      weken[wkn[j].weeknr].calcWk();     
      
    }
    
  }
  document.getElementById("testDiv").innerHTML = wkn[0].weeknr;
}
