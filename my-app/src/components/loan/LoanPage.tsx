import React, { useState } from 'react';
import { useEffect } from 'react';
import {useNavigate} from "react-router-dom";
import { supabaseAdmin } from '../../supabase';
import Header from '../Header';

//https://www.rhbgroup.com/files/business/financing/business-loan/BizPower_SME_Financing_Application_Form_.pdf



interface Loan {
    collateral: string;
    companyId: number;
    corporateStatus: string;
    created_at: string;
    documentLink: string[];
    entityType: string;
    loanid: number;
    numberOfBusiness: string;
    purpose: string;
    staffnumber: number;
    value: number;
}

function LoanPage() {
    const navigate = useNavigate();
    
    const [loandata, setLoandata] = useState<Loan []>()

    useEffect(()=>{supabaseAdmin
        .from('companyloan')
        .select()
        .eq('companyId', sessionStorage.getItem("id"))
        .then(({ data, error }) => {
        if (!error) {
            console.log(data)
            console.log(loandata)
            setLoandata(data)
        }
        }); }, []);

    return (
        <div>
            <Header loggedIn={true}/>

            <div className="block p-6 rounded-lg shadow-lg bg-white w-full">
            <p className="font-bold">Your Loan Applications</p>
                <div>
                   {loandata? loandata.map((detail,index)=>{
                            return (<div key={index}>
                                    <div className="ml-2 my-2 block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                                    <p>Loan Number: {detail.loanid}</p>
                                    <p>Status: <b>On review</b></p>
                                    <p>Amount: RM{detail.value}</p>
                                </div>
                            </div>    
                        )}): <></>}
                </div>
            </div>


            <div className="mx-2 m-4">
                <button onClick={() => navigate("/apply-loan")} type="button"
                        className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Apply
                </button>
            </div>
        
        </div>
    );
}

export default LoanPage;