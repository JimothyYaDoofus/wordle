import App from "./App";
import React from "react";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getData } from "./Session";


const notify = () => {
    let data = getData();
    //console.log(data[0]);
    toast(<div>Games Played: {data[0]} <br /> Games Won: {data[1]} <br /> Current Streak: {data[2]} <br /> Max Streak: {data[3]} </div>, {
        position: "top-right",
        autoClose: 100000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
};

class Leaderboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        
    }

    renderStats() {

    }

    render() {
        return (
            <div>
                <button className="btn btn-secondary m-2 p-2" onClick={notify}><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-bar-chart" viewBox="0 0 16 16">
                <path d="M4 11H2v3h2v-3zm5-4H7v7h2V7zm5-5v12h-2V2h2zm-2-1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1h-2zM6 7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm-5 4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3z"/>
                </svg></button>
                <ToastContainer
                position="top-right"
                autoClose={100000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                />
            </div>

         
        );

    }
}

export default Leaderboard;