import React, { useState } from 'react';
import Header from "../Header";
import { supabaseAdmin } from "../../supabase";
import Modal from "./TransferModal";
import { useNavigate } from 'react-router-dom';
import type { } from '@mui/x-date-pickers-pro/themeAugmentation';
import TextField from '@mui/material/TextField';
import TransferList from "./TransferList";

function ScheduleTransfer() {
    var AccountNumber = sessionStorage.getItem("AccountNumber") || "Default";
    var id = sessionStorage.getItem("id") || "Default";

    const [inputSourceAccNum, setInputSourceAccNum] = useState(AccountNumber)
    const [inputDestinationAccNum, setInputDestinationAccNum] = useState('')
    const [inputAmount, setInputAmount] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [inputDateTime, setinputDateTime] = useState('')
    const [showModal, setShowModal] = React.useState(false)
    const [showTransferList, setShowTransferList] = useState(false);

    const openTransferList = () => {
        setShowTransferList(true);
    };

    const navigate = useNavigate();

    const handleDescription = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputDescription(event.target.value);
        console.log('description: ', inputDescription);
    };

    const scheduleTransfer = () => {
        setShowModal(true);
        console.log('Transfer Scheduled Successfully!');
    };

    const handleDestinationAccNum = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputDestinationAccNum(event.target.value);
        console.log('destination:', inputDestinationAccNum);
    };


    const handleSelectedDestination = (account: string) => {
        setInputDestinationAccNum(account);
        console.log('destination:', inputDestinationAccNum);
    };

    const handleAmount = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputAmount(event.target.value);
        console.log('amount: ', inputAmount);
    };

    const handleSourceAccNum = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputSourceAccNum(event.target.value);
        console.log('source: ', inputSourceAccNum);
    };

    const handleDateTime = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setinputDateTime(event.target.value);
        console.log('date: ', inputDateTime);
    };

    async function userTransferScheduled() {
        //input to database
        const { error } = await supabaseAdmin.from("transfer").insert({
            senderID: id,
            senderAccNum: inputSourceAccNum,
            Destination: inputDestinationAccNum,
            Amount: inputAmount,
            Description: inputDescription,
            isScheduled: "yes",
            scheduleDate: inputDateTime,
        })
        console.log("inputted")
        alert("Scheduled Transfer Successfully Recorded")
        navigate('/transaction');
        if (error) {
            //error will throw here
            throw error;
        }
    }

    return (
        <div>
            <Header loggedIn={true}/>
            <div className='flex flex-row space-x-6 rounded-r-lg max-w-xl2 w-3/5 mx-auto justify-center'>
                <div className="flex flex-col p-6 rounded-r-lg shadow-lg max-w-sm w-full mx-auto justify-center">

                    <label htmlFor="source-account">Source Account</label>
                    <select onChange={handleSourceAccNum} className="form-select
        block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label="Select Account">
                        <option selected value={AccountNumber}>{AccountNumber}</option>
                    </select>

                    <label htmlFor="destination_account">Destination Account</label>
                    <div className="px-3
            py-1.5
            my-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ">
                        <span className={"w-78"}>
                            <input className="form-control appearance-none outline-none
            inline-block
            "
                                type="text" id="destination_account" name="destinationAccount"
                                onChange={handleDestinationAccNum} value={inputDestinationAccNum}>
                            </input>
                        </span>
                        <span>
                            <button
                                className="inline-block bg-none float-right"
                                onClick={openTransferList}>
                                <img className="h-6 object-centered m-auto"
                                    src={"https://img.icons8.com/material-two-tone/512/sorting-answers.png"} />
                            </button>
                        </span>
                    </div>

                    <label htmlFor="amount">Amount (RM)</label>
                    <input className="form-control
            block
            w-1/2
            px-3
            py-1.5
            my-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text" id="amount" name="amount"
                        onChange={handleAmount}></input>

                    <label htmlFor="description">Description</label>
                    <input className="form-control
            block
            w-full
            px-3
            py-1.5
            my-1.5
            mb-6
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        type="text" id="description" name="description"
                        onChange={handleDescription}></input>

                    <TextField
                        onChange={handleDateTime}
                        id="datetime-local"
                        label="Schedule at"
                        type="datetime-local"
                        defaultValue="2022-01-15T10:30"
                        sx={{ width: 250 }}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />

                    <button
                        onClick={userTransferScheduled}
                        type="submit"
                        className="inline-block mt-6 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Schedule
                    </button>

                    <Modal showModal={showModal} setShowModal={setShowModal} type={"schedule"} />
                    {showTransferList &&
                        <>
                            <div
                                className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                            >
                                <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white">
                                    <button
                                        className="float-right text-red-500 background-transparent px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => setShowTransferList(false)}
                                    >
                                        Close
                                    </button>
                                    <TransferList showModal={showTransferList} setShowModal={setShowTransferList} selectedDestination={handleSelectedDestination}></TransferList>
                                </div>
                            </div>
                        </>
                    }
                </div>

                <div className="flex flex-col p-6 rounded-r-lg shadow-lg max-w-lg w-full mx-auto justify-center">
                    <p className="font-bold">Pending Scheduled Transfer</p>
                    <div>
                        <div className="ml-2 my-2 block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                            <p id="transfer_id"><b>Transfer ID: </b>00001</p>
                            <p id="source_acc"><b>Source Account: </b>SA-567121367160</p>
                            <p id="destination_acc"><b>Destination Account: Alun Company Sdn Bhd</b></p>
                            <p id="amount"><b>Amount: </b>RM 300</p>
                            <p id="description"><b>Description: </b>Logistics Payment</p>
                            <p id="schedule"><b>Transfer Schedule: </b>14/01/2022, 15:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ScheduleTransfer;