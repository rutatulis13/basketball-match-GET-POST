// document.querySelector(".new-match").addEventListener('click', () => {
//     console.log("labadiena")
//     document.querySelector('#naujas-macas').style.display = "block";
// })

// event.preventDefault ---> defaultinius eventus nuima, standartiniu narsykliu pagalbos atsisakom

const getInfo = () => {

    fetch('http://localhost:3003')
    .then((response) => response.json())
    .then(jsonObjektas => {
        console.log(jsonObjektas)
    
        document.querySelector(".container__info").innerHTML += `<div class="container__info--details">${jsonObjektas.date}</div><div class="container__info--dot"></div>`;
    
        document.querySelector(".container__info").innerHTML += `<div class="container__info--details">${jsonObjektas.round}</div><div class="container__info--dot"></div>`;
    
        document.querySelector(".container__info").innerHTML += `<div class="container__info--details">${jsonObjektas.stadium}</div><div class="container__info--dot-last"></div>`;
    
        document.querySelector(".container__info").innerHTML += `<div class="container__info--details time">${jsonObjektas.time}</div>`;
    
        document.querySelector(".container__team1").innerHTML += `<div class="container__info--teams">${jsonObjektas.team1}</div>`;
        
        document.querySelector(".container__team2").innerHTML += `<div class="container__info--teams">${jsonObjektas.team2}</div>`;
    })
    }
    getInfo();

const checkData = () => {

    fetch('http://localhost:3003/checkscore')
    .then((response) => response.json())
    .then(jsonObjektas => {
        console.log(jsonObjektas)

        document.querySelector(".container__scores").innerHTML = `<div class="container__scores--first">${jsonObjektas.komanda1}</div><div class="container__scores--border"></div><div class="container__scores--second">${jsonObjektas.komanda2}</div>`;


        document.querySelector(".container__team1").classList.remove("green-font");
        document.querySelector(".container__team2").classList.remove("green-font");
        
        if ( jsonObjektas.komanda1 > jsonObjektas.komanda2 ) {
            document.querySelector(".container__scores--first").classList.add("green-font");
        } else if ( jsonObjektas.komanda1 < jsonObjektas.komanda2 ) {
            document.querySelector(".container__scores--second").classList.add("green-font");
        }
   })
}

checkData();


document.querySelector("#save-match").addEventListener('click', () => {
    
    let data = document.getElementById('date').value;
    let round = document.getElementById('round').value;
    let stadium = document.getElementById('stadium').value;
    let time = document.getElementById('time').value;
    let team1 = document.getElementById('team1').value;
    let team2 = document.getElementById('team2').value;

    let arr = []
    arr.push(data, round, stadium, time, team1, team2);
    const checkEmptyValues = arr.map(item => { //??????
        if (item === "") {
            console.log("item reiksme" + item)
            // alert("Please Fill All Required Field"); 
            document.querySelector(".input-test").classList.add("input");
            // return false;
            // `<div class="input"> ${item} </div>`
            // return document.querySelector(".input-test").classList.add("input");
           
            }
        }

    )

    //apink fetch if empty values
    //

    fetch('http://localhost:3003/save-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({data, round, stadium, time, team1, team2})
    })
    .then(resp => resp.json())
    .then(resp => {
        console.log(resp)
    })

    document.getElementById('date').value = "";
        document.getElementById('round').value = "";
        document.getElementById('stadium').value = "";
        document.getElementById('time').value = "";
        document.getElementById('team1').value = "";
        document.getElementById('team2').value = "";
})


const getRez = () => {
    fetch('http://localhost:3003/result')
    .then((response) => response.json())
    .then(jsonObjektas => {
        console.log(jsonObjektas)
        function getRandomNum(min, max) {
            let randomNum = Math.floor(Math.random()*(max-min+1)+min);
            return randomNum;
      }
    
        let status = getRandomNum(0, 4);

        document.querySelector(".quarter").innerHTML += `
        <div class="container__final">${jsonObjektas.half[status]}</div>`
        })
    }

    getRez();

    document.querySelector('#reg-match').addEventListener('click', (event) => {

      
        document.getElementById("naujas-macas").style.display = "block";
        document.getElementById("save-match").style.display = "block";
        document.getElementById("get-match").style.display = "block";
        window.scrollTo(0, 2000);
        
      
            // let elem = document.getElementById("naujas-macas");
            // elem.scrollIntoView();
        
        // event.preventDefault()
    })


   
    document.querySelector('#get-match').addEventListener('click', (event) => {

        //  if (document.getElementById("naujas-macas").style.display === "block") {  
        //     document.getElementById("naujas-macas").style.display = "none";  
        // } else {    
        //     document.getElementById("naujas-macas").style.display = "display";  
        // }
        
        fetch('http://localhost:3003/check-file')
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp.result)
            document.querySelector(".check-database").innerHTML = resp.result
        })

        fetch('http://localhost:3003/get-match')
        .then(resp => resp.json())
        .then(resp => {
            document.querySelector(".matches").innerHTML += 
            `<ul class="list">
                <li>
                    <span>${resp.team1} vs ${resp.team2}</span>
                    <span>${resp.data} ${resp.time}</span>
                    <span>Round ${resp.round}</span>
                    <button class="matches__btn--change" type="button">Redaguoti</button>
                    <button class="matches__btn--delete" type="button">Ištrinti</button>
                </li>
            <ul>
            `
        })
    })

   