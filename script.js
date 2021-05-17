let weken = [];


function writeDatum(){
  let [month1, date1, year1] = new Date().toLocaleDateString("en-US").split("/");
  document.getElementById("datumVandaag").innerHTML = String(date1)+'-'+String(month1)+'-'+String(year1);
}

class Dag {
  constructor(datum, begin, eind, pauze){
    this.datum = datum;
    this.begin = begin;
    this.eind = eind;
    this.pauze = pauze;
    this.bijz = '-';
  }
    calcUren(){
      let u;
      let m;
      let b = this.begin.split(":");
      let b2 = Number(b[0]) + (Number(b[1])/60);
      let e = this.eind.split(":");
      let e2 = Number(e[0]) + (Number(e[1])/60);
      let p = this.pauze.split(":");
      let p2 = Number(p[0]) + (Number(p[1])/60);
      this.gewerkt = e2 - b2 - p2;
      this.overuren = this.gewerkt - 8;
      if (this.gewerkt >= 12) {
        this.bijz === "-"?this.bijz = "+M": this.bijz += " +M";
      }
    }
}

class Week {
  constructor(nr, dagen){
    this.nr = nr;
    this.dagen = dagen;
  }
  calcWk() {
    let sumGw = 0;
    let sumOv = 0;
    for(let i=0; i < this.dagen.length;i++){
      if(this.dagen[i]){
        sumGw += this.dagen[i].gewerkt;
        sumOv += this.dagen[i].overuren;
      }
    }
    this.gewerktW = sumGw;
    this.overurenW = sumOv;
  }
}

// date string "yyyy-mm-dd"
function str2dat(str11){
  
  var strArr = str11.split("-");
  let m11 = Number(strArr[1]);
  let y11 = Number(strArr[0]);
  let d11 = Number(strArr[2]);
  
  return new Date(y11, m11-1, d11);
}

// write table row
function writeRow(dag, rownum){
  let row1 = '';
  row1 += '<td>' + dag.datum + '</td>';
  row1 += '<td>' + dag.begin + '</td>';
  row1 += '<td>' + dag.eind + '</td>';
  row1 += '<td>' + dag.pauze + '</td>';
  row1 += '<td>' + dag.gewerkt + '</td>';
  row1 += '<td>' + dag.bijz + '</td>';
  let rowStr = "dag" + String(rownum);
  document.getElementById(rowStr).innerHTML = row1;
}

function clearTable(){
  let row1 = '';
  row1 += '<td></td>';
  row1 += '<td></td>';
  row1 += '<td></td>';
  row1 += '<td></td>';
  row1 += '<td></td>';
  row1 += '<td></td>';
  for (let i = 0; i < 7;i++){
    let rowStr = "dag" + String(i);
    document.getElementById(rowStr).innerHTML = row1;
  }
  document.getElementById("dGewWeek").innerHTML = 'Gewerkt : 0.0';
  document.getElementById("dOverWeek").innerHTML = 'Overuren : 0.0';
}

function ISO8601_week_no(dt) 
  {
     var tdt = new Date(dt.valueOf());
     var dayn = (dt.getDay() + 6) % 7;
     tdt.setDate(tdt.getDate() - dayn + 3);
     var firstThursday = tdt.valueOf();
     tdt.setMonth(0, 1);
     if (tdt.getDay() !== 4) 
       {
      tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
        }
     return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}

function writeTable(weeknr){
  writeDatum();
  
  let weekje = weken[weeknr];
  document.getElementById("inpWeek").value = String(weeknr);
  for (let i=0; i<weekje.dagen.length;i++){
    writeRow(weekje.dagen[i],i);
  }
  document.getElementById("dGewWeek").innerHTML = 'Gewerkt : ' + String(weekje.gewerktW);
  document.getElementById("dOverWeek").innerHTML = 'Overuren : ' + String(weekje.overurenW);
}

function writeTable2(){
  clearTable();
  let wknr = document.getElementById("inpWeek").value;
  if (wknr) writeTable(wknr);
}

function voegToe(){
  let d1 = document.getElementById("inpDatum").value;
  let b1 = document.getElementById("inpBegin").value;
  let e1 = document.getElementById("inpEind").value;
  let p1 = document.getElementById("inpPauze").value;
  let bz1 = document.getElementById("inpBijz").value;
  let dt = new Dag(d1, b1, e1, p1);
  dt.calcUren();
  if (bz1 !== '-') dt.bijz = bz1;
  let date1 = str2dat(d1);
  let currentWeek = ISO8601_week_no(date1);
  document.getElementById('testDiv').innerHTML = 'currentWeek : ' + currentWeek + '<br>' + 'date1 : ' + date1 + '<br>' + d1;
  weken[currentWeek].dagen.push(dt);
  weken[currentWeek].calcWk();
  writeTable(currentWeek);
}