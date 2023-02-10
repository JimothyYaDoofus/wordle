// Store information about current session

class Session {
    constructor(gamesPlayed, gamesWon, currentStreak, maxStreak) {
        this.gamesPlayed = gamesPlayed;
        this.gamesWon = gamesWon;
        this.currentStreak = currentStreak;
        this.maxStreak = maxStreak;

        this.init();
        //this.storeData();  
    }

    // Check to see if key is present
    init() {
        let key = localStorage.getItem("wordleStats");
        if (key) {
            this.getData();
        } else {
            this.storeData();
        }
    }

    // Get current data
    getData() {
        let stats = localStorage.getItem("wordleStats");
        let convertedJSON = JSON.parse(stats);

        let gp = convertedJSON.stats[0].gamesPlayed;
        let gw = convertedJSON.stats[1].gamesWon;
        let cs = convertedJSON.stats[2].currentStreak;
        let ms = convertedJSON.stats[3].maxStreak;

        console.log(gp);
        console.log(gw);
        console.log(cs);
        console.log(ms);

        //add to current
        this.gamesPlayed += parseInt(gp);
        this.gamesWon += parseInt(gw);
        

        // add logic for maxStreak / current streak

        this.storeData();
    }

    // Update data
    updateData() {

    }

    // Store updated data
    storeData() {
        // Add ls
        // format using json
        let stats = `{"stats":[{"gamesPlayed":"${this.gamesPlayed}"},{"gamesWon":"${this.gamesWon}"},{"currentStreak":"${this.currentStreak}"},{"maxStreak":"${this.maxStreak}"}]}`;
        localStorage.setItem("wordleStats", stats);
        console.log("data stored");
    }


}

export default Session;