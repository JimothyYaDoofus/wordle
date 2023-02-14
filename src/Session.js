// Store information about current session
import App from "./App";
import React from "react";

class Session extends React.Component {
    constructor(gamesPlayed, gamesWon, currentStreak, maxStreak) {
        super();
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

    // Create key if no key present
    function createKey() {
        let key = localStorage.getItem("wordleStats");
        if (key) {
            console.log("key present");
        } else {
            let stats = `{"stats":[{"gamesPlayed":"0"},{"gamesWon":"0"},{"currentStreak":"0"},{"maxStreak":"0"}]}`;
            localStorage.setItem("wordleStats", stats);
            console.log("data stored");
        }
    }

    // Get current data
   function getData() {
        let returnedStats = [];
        let stats = localStorage.getItem("wordleStats");
        let convertedJSON = JSON.parse(stats);

        let gp = convertedJSON.stats[0].gamesPlayed;
        let gw = convertedJSON.stats[1].gamesWon;
        let cs = convertedJSON.stats[2].currentStreak;
        let ms = convertedJSON.stats[3].maxStreak;

        //console.log(gp);
        //console.log(gw);
        //console.log(cs);
        //console.log(ms);

        returnedStats.push(gp);
        returnedStats.push(gw);
        returnedStats.push(cs);
        returnedStats.push(ms);

        //add to current
        //this.gamesPlayed += parseInt(gp);
        //this.gamesWon += parseInt(gw);
        

        // add logic for maxStreak / current streak

        //this.storeData();
        return returnedStats;
    }




export { getData, createKey };
export default Session;