const Krepsinis = class Krepsinis {

    constructor(kelinioLaikas = 600000) {
        this.bendrasLaikas = 0;
        this.kelinioLaikas = kelinioLaikas;
        this.komanda1 = 0;
        this.komanda2 = 0;
        this.atakuoja = 'komanda1';
        this.kelinys = 1;
        this.baigesi = false;
        this.start()
    }

    getRandomNumber(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    start() {

        let atakosLaikas = this.getRandomNumber(22000, 24000)
      
        this.bendrasLaikas += atakosLaikas
      
        if(this.bendrasLaikas >= (this.kelinioLaikas * this.kelinys))
            this.kelinys++
      
        if(this.kelinys > 4 && this.komanda1 != this.komanda2) {
            this.baigesi = true
            this.kelinys = 4
            return false
        }
      
        if(this.atakuoja === 'komanda1') {
            this.komanda1 += this.getRandomNumber(0, 2)
            this.atakuoja = 'komanda2'
        }
      
        if(this.atakuoja === 'komanda2') {
            this.komanda2 += this.getRandomNumber(0, 2)
            this.atakuoja = 'komanda1'
        }
      
        setTimeout( () => {
          this.start()
        }, atakosLaikas)
    }
}

export default Krepsinis