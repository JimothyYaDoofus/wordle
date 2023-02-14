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
    }

    // Store updated data
    /*
    storeData() {
        let stats = `{"stats":[{"gamesPlayed":"${this.gamesPlayed}"},{"gamesWon":"${this.gamesWon}"},{"currentStreak":"${this.currentStreak}"},{"maxStreak":"${this.maxStreak}"}]}`;
        localStorage.setItem("wordleStats", stats);
        console.log("data stored");
    }*/


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

        returnedStats.push(gp);
        returnedStats.push(gw);
        returnedStats.push(cs);
        returnedStats.push(ms);

        return returnedStats;
    }

    function updateData(win) {
        //Stored data
        let data = getData();

        let gp = Number(data[0]);
        let gw = Number(data[1]);
        let cs = Number(data[2]);
        let ms = Number(data[3]);

        // Logic for updating stats
        gp += 1;

        // if game won
        if (win === true) {
            gw += 1;
            cs += 1;

            // Update max streak
            if (ms < cs) {
                ms += 1;
            }
        } else {
            cs = 0;
        }

        // Add new stats to old
        storeData(gp, gw, cs, ms);
    }

    //push updated data to ls
    // Store updated data
    function storeData(gp, gw, cs, ms) {
        let stats = `{"stats":[{"gamesPlayed":"${gp}"},{"gamesWon":"${gw}"},{"currentStreak":"${cs}"},{"maxStreak":"${ms}"}]}`;
        localStorage.setItem("wordleStats", stats);
        console.log("data stored");
    }

export { getData, createKey, updateData };
export default Session;