// const express = require('express')
import express, { json } from "express"
import cors from 'cors'
const app = express()
// import { writeFile as wf, readFile, stat } from "fs" //filesystem biblioteka
import Krepsinis from "./krepsinis.js"
import * as fs from "fs"

const filePath = './db/data.json'

app.use(cors()) //prie aplikacijos priskiriam konfiguracija ar moduli
app.use(express.json())
app.use('/images', express.static('images'))


app.get('/', function (req, res) {

  let objektas = {
      round: "Round 26",
      date: "10 Feb 2022",
      stadium: "Peace and Friendship Stadium",
      time: "21:00",
      team1: "Olympiacos Piraeus",
      team2: "Anadolu Efes Istanbul"
  }

  console.log(objektas.degrees)
  res.json(objektas)
})

//laiko sutikrinimas
app.post('/post-request', (req, res) => {

  let reqbody = req.body;
  let message = "";
  res.json(req.body);

  // let laikas = parseInt(req.body.time);
  if (req.body.time >= "18:00" && req.body.time <= "21.30") {
    console.log("laikas tinkamas")
    res.json({reqbody, pavyko: true})
  } else {
        console.log("Netinkamas rungtyniu laikas");
        message = "Netinkamas rungtyniu laikas";
        res.json({ message, pavyko: false });
  }

})

// let message = "";
//   let reqbody = req.body;
//   if (req.body.time >= "18:00" && req.body.time <= "21:30") {
//     console.log("laikas tinkamas");
//     res.json({ reqbody, obj, pavyko: true });
//   } else {
//     console.log("Netinkamas rungtyniu laikas");
//     message = "Netinkamas rungtyniu laikas";

//     res.json({ message, pavyko: false });
//   }
// });

app.get('/result', function (req, res) {

    function getRandomNum(min, max) {
          let randomNum = Math.floor(Math.random()*(max-min+1)+min);
          return randomNum;
    }
  
  
    let objektas = {
        result: [getRandomNum(0, 100), getRandomNum(0, 100)],
        half: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
    }
  
    console.log(objektas.degrees)
    res.json(objektas)
  })

  //inicijuojame Krepsini
  const rezultatas = new Krepsinis();
  console.log(rezultatas)

  app.get('/checkscore', function(req, res) {
      res.json(rezultatas)

  })

  app.post('/save-request', (req, res) => { //sukurem db folderyje faila
    let masyvas = []
    //tikrinam, kad failas egzistuoja
    fs.access(filePath, (err) => {
      //tikrinam, ar egzistuoja
      if(err) {
        req.body.id = 0;
        //jeigu neegzistuoja, tuomet supushinam body i tuscia masyva
        masyvas.push(req.body)
        //tuomet idedam info
        fs.writeFile(filePath, JSON.stringify(masyvas), 'utf8', (err) => {
          //jeigu nera erroro
          if(!err) {
            res.json({message: 'Informacija issaugota'})
          } else {
            res.json({message: 'Nepavyko sukurti failo'})
          }
        })

      } else {
        //jeigu failas egzistuoja...
        fs.readFile(filePath, 'utf8', (err, data) => {
          //tikrinam, ar apskritai klaidu kokiu nera, ar pasiekiam info
          if(err) {
            res.json({message: 'Ivyko klaida'})
            return false
          }
          //jei nera eroru, tuomet supushinam json fomratu oaversta info
          let json = JSON.parse(data)

          if (json.length == 0) 
          req.body.id = 0
          else
          req.body.id = json[json.length - 1].id + 1

          json.push(req.body)
          //perduodam zinute
          fs.writeFile(filePath, JSON.stringify(json), 'utf8', (err) => {
            if(!err) {
              res.json({message: 'Informacija issaugota'})
            } else {
              res.json({message: 'Nepavyko sukurti failo'})
            }
          })
        })
      }
  
    })
  
  })

    //redaguojam duomenis



  app.get("/get-match", (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err)
      return false

      let info = JSON.parse(data)

      // info.forEach(val, key);

      res.json(info)
    })
  })

  app.get("/check-file", (req, res) => { //tikrinam, ar failas apskritai egzistuoja
    fs.access(filePath, (err) => {
      if(err)
        res.json({result: "Nėra jokių įregistruotų rungtynių"})
      else 
      res.json({result: "Duomenu baze yra"})
    })
  })

  app.put('/save-request/:id', (req, res) => {
    let id = req.params.id
  
    fs.readFile(filePath, 'utf8', (err, data) => {
      if(err) {
        res.json({ status: 'failed', message: 'Nepavyko perskaityti failo'})
        return false
      }
  
      let json = JSON.parse(data)
  
      json.forEach((el, index) => {
        if(el.id == id) {
          json[index].pavadinimas = req.body.pavadinimas
          json[index].data = req.body.data
        } 
      })
  
      let jsonResp = JSON.stringify(json)
  
      fs.writeFile(filePath, jsonResp, 'utf8', (err) => {
        if(!err) {
          res.json({status: 'success', message: 'Informacija issaugota', jsonResp})
        } else {
          res.json({status: 'failed', message: 'Nepavyko sukurti failo'})
        }
      })
      
    })
  })
  
app.get('/change-match/:id', (req, res) => {
  let id = req.params.id

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
    res.json({status: "failed", message: "Nepavyko perskaityti failo"})
    return false
    } 

      let json = JSON.parse(data)
      let found = false;
      
      json.forEach((el, index) => {
        if(el.id == id ) {
          res.json({status: "success", message: "pavyko", jsonResp: el})
          found = true
        } 
      })
      if(!found)
      res.json ({status: "failed", message: "nepavyko"})
  })
})
  //su post metodu mes irasome info, su put metodu redaguojame

  // let jsonResp = JSOPN.stringify(json)

  app.delete("/:id", (req, res) => {
    let id = req.params.id;
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
      res.json({status: "failed", message: "Nepavyko perskaityti failo"})
      return false
      } else {
        let info = JSON.parse(data)
        let findIndex = info.find(index => index.id === parseInt(id) )
        console.log(info)
        info.splice(info.indexOf(findIndex), 1)

        if (json.length == 0) {
          fs.unlink(filePath, err => {
            if (err) 
            res.json({status: "failed", message: "nepavyko"})
          })
        }

        fs.writeFile(filePath, JSON.stringify(info), 'utf8', (err) => {
          if (err) throw err;
          console.log("JSON file successfuly saved");
        })
        res.json( info )
      }
  })
})

app.listen(3003)