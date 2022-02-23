// const express = require('express')
import express from "express"
import cors from 'cors'
const app = express()

app.use(cors()) //prie aplikacijos priskiriam konfiguracija ar moduli

app.get('/', function (req, res) {

  function getRandomNum(min, max) {
        let randomNum = Math.floor(Math.random()*(max-min+1)+min);
        return randomNum;
  }


  let objektas = {
      status: ["Rainy", "Mostly Sunny"],
      degrees: getRandomNum(10, 25),
      feeling: getRandomNum(13, 27),
      humidity: getRandomNum(50, 90)
  }
  console.log(objektas.degrees)
  res.json(objektas)
})

app.listen(3003)