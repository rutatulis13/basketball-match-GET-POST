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

    let isValid = true;
    let inputs = document.getElementsByTagName('input');
    // let message = document.getElementsByClassName("input-test").classList.add("input");
    let message = document.getElementsByClassName('alert');
    let index;

    for (index = 0; index < inputs.length; ++index) {
        let currentInputValue = inputs[index].value;
        if (currentInputValue == null || currentInputValue === "") {
            message[index].style.display = "block";
            isValid = false;
        }

        isValid = true;
        fetch('http://localhost:3003/save-request', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({data, round, stadium, time, team1, team2})
            })
            .then(resp => resp.json())
            .then(resp => {
            console.log(resp + "padavimas i duomenu baze")
            })
    }

    // let arr = []
    // arr.push(data, round, stadium, time, team1, team2);
    // const checkEmptyValues = arr.find(item => { //??????
    //     if (item.value === "") {
    //                     alert("Please Fill All Required Field"); 
    //                     console.log(item);
    //                     // document.getElementById({item}).classList.add("input")
    //                     // document.querySelector(".input-test").classList.add("input");
    //                     return false;
    //                     // `<div class="input"> ${item} </div>`
    //                     // return document.querySelector(".input-test").classList.add("input");
    //     } else {
    //         fetch('http://localhost:3003/save-request', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({dataVal, roundVal, stadiumVal, timeVal, team1Val, team2Val})
    //         })
    //         .then(resp => resp.json())
    //         .then(resp => {
    //             console.log(resp + "padavimas i duomenu baze")
    //         })
           
    //         }
    //     }

    // )

    //apink fetch if empty values
    //

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

        fetch('http://localhost:3003/get-match')
        .then(resp => resp.json())
        .then(resp => {
            console.log(resp)

    // const displayList = (resp) => {
            document.querySelector(".matches").innerHTML = "";
            resp.forEach(item => {
            document.querySelector(".matches").innerHTML += 
            `<ul class="list">
                <li>
                    <span>${item.team1} vs ${item.team2}</span>
                    <span>${item.data} ${item.time}</span>
                    <span>Round ${item.round}</span>
                    <a href="${item.id}">${item.id}</a>
                </li>  
            <ul>
            <div class="btns">
                <button class="matches__btn--change" type="button">Redaguoti</button>
                <button class="matches__btn--delete" data-id="${item.id}" type="button">Ištrinti</button>
            </div>
            `
        })
        

        document.querySelectorAll(".matches__btn--delete").forEach(val => {
            val.addEventListener("click", (event) => {
                console.log("hello")
                event.preventDefault()
    
                let id = val.getAttribute("data-id")
    
                fetch('http://localhost:3003/' + id, {
                    method: 'DELETE'
                    })
    
                .then(resp => resp.json())
                .then(resp => {
                    
                    // if (resp.status == 'success')
                    // displayList(JSON.parse(resp.jsonResp))
                    document.querySelector(".matches").innerHTML = "";
                    resp.forEach(item => {
                    document.querySelectorAll(".matches").innerHTML += 
                    `<ul class="list">
                        <li>
                            <span>${item.team1} vs ${item.team2}</span>
                            <span>${item.data} ${item.time}</span>
                            <span>Round ${item.round}</span>
                            <a href="${item.id}">${item.id}</a>
                        </li>  
                    <ul>
                    <div class="btns">
                        <button class="matches__btn--change" type="button">Redaguoti</button>
                        <button class="matches__btn--delete" data-id="${item.id}" type="button">Ištrinti</button>
                    </div>
                    `
                })
            })
           
                fetch('http://localhost:3003/get-match')
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp)
                    // displayList(resp)
                    document.querySelector(".matches").innerHTML = "";
                    resp.forEach(item => {
                    document.querySelectorAll(".matches").innerHTML += 
                    `<ul class="list">
                        <li>
                            <span>${item.team1} vs ${item.team2}</span>
                            <span>${item.data} ${item.time}</span>
                            <span>Round ${item.round}</span>
                            <a href="${item.id}">${item.id}</a>
                        </li>  
                    <ul>
                    <div class="btns">
                        <button class="matches__btn--change" type="button">Redaguoti</button>
                        <button class="matches__btn--delete" data-id="${item.id}" type="button">Ištrinti</button>
                    </div>
                    `
                })
            })

      

        })
    })


        document.querySelectorAll(".matches__btn--change").forEach(val => {

            val.addEventListener("click", (event) => {
                console.log("hello")
                event.preventDefault()
    
                let id = val.getAttribute("data-id")
    
                fetch('http://localhost:3003/change-match/' + id)
    
                .then(resp => resp.json())
                .then(resp => {
                    console.log(resp)
                })
            })
        })           

    })
})
  


    



   