import React from 'react';
import Header from "../Header";
import BalanceCard from "../dashboard/BalanceCard";
import { Link } from "react-router-dom";
import Card from '../dashboard/Card';


function TransactionPage() {
    return (
        <div>
            <Header loggedIn={true}/>
            <BalanceCard/>
            <div className="mt-4 p-6 rounded-lg shadow-lg bg-white w-full">
            <div className="flex flex-row justify-center">
                <div className="justify-center m-5 w-96">
                   <Link to="/transfer">
                       <Card image={"https://img.icons8.com/material-rounded/512/data-in-both-directions.png"} cardTitle={"Transfer"} text={""}/>
                   </Link>
                </div>
                <div className="justify-center m-5 w-96">
                   <Link to="/schedule-transfer">
                       <Card image={"https://img.icons8.com/fluency-systems-regular/512/timetable.png"} cardTitle={"Schedule Transfer"} text={""}/>
                   </Link>
                </div>
                <div className="justify-center m-5 w-96">
                   <Link to="/organize-transfer">
                       <Card image={"https://img.icons8.com/material-two-tone/512/sorting-answers.png"} cardTitle={"Organize Transfer Destinations"} text={""}/>
                   </Link>
                </div>
               </div>
           </div>
        </div>


    );
}

export default TransactionPage;