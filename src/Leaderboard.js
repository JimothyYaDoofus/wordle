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
                <button className="btn btn-secondary" onClick={notify}>Leaderboard</button>
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