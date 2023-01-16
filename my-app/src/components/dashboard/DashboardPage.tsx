import React from 'react';
import Header from '../Header';
import Card from "./Card";
import {Link} from "react-router-dom";
import BalanceCard from "./BalanceCard";

function DashboardPage() {
    return (
        <div>
            {/*<LoginProvider>*/}
            {/*    <Header/>*/}
            {/*</LoginProvider>*/}
            <Header loggedIn={true}/>
            {/*icons from: https://icons8.com/*/}
            <BalanceCard/>
            <div className="flex flex-row justify-center">
            <div className="justify-center m-5 w-96">
                <Link to="/transaction-history">
                    <Card cardTitle={'Transaction History'} text={'See your transaction report'}
                          image={'https://img.icons8.com/material-rounded/512/purchase-order.png'}></Card>
                </Link>
            </div>
            <div className="justify-center m-5 w-96">
                <Link to="/loan">
                    <Card cardTitle={'View Loan Application'} text={'View or apply for a loan'}
                          image={'https://img.icons8.com/material-rounded/512/coin-in-hand.png'}></Card>
                </Link>
            </div>
            <div className="justify-center m-5 w-96">
                <Link to="/transaction">
                    <Card cardTitle={'Make Transaction'} text={'Transfer money'}
                          image={'https://img.icons8.com/material-rounded/512/data-in-both-directions.png'}></Card>
                </Link>
            </div>
            </div>
        </div>
    )
}

export default DashboardPage;