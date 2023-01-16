import React, { useState } from 'react';
import Header from '../Header';
import Modal from "./TransferModal";
import TransferList from "./TransferList";
import { supabaseAdmin } from '../../supabase';
import { useNavigate } from 'react-router-dom';

function Transfer() {
    var AccountNumber = sessionStorage.getItem("AccountNumber") || "Default";
    var id = sessionStorage.getItem("id") || "Default";

    const navigate = useNavigate();
    const [inputDestinationAccNum, setInputDestinationAccNum] = useState('')
    const [inputSourceAccNum, setInputSourceAccNum] = useState(AccountNumber)
    const [inputAmount, setInputAmount] = useState('')
    const [inputDescription, setInputDescription] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [showTransferList, setShowTransferList] = useState(false)

    const handleDestinationAccNum = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputDestinationAccNum(event.target.value);
        console.log('destination:', inputDestinationAccNum);
    };

    const handleSelectedDestination = (account: string) => {
        setInputDestinationAccNum(account);
        console.log('destination:', inputDestinationAccNum);
    };

    const handleSourceAccNum = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputSourceAccNum(event.target.value);
        console.log('source: ', inputSourceAccNum);
    };

    const handleAmount = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputAmount(event.target.value);
        console.log('amount: ', inputAmount);
    };

    const handleDescription = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputDescription(event.target.value);
        console.log('description: ', inputDescription);
    };

    const openTransferList = () => {
        setShowTransferList(true);
    };

    async function userTransfer() {
        //input to database
        const { error } = await supabaseAdmin.from("transfer").insert({
            senderID: id,
            senderAccNum: inputSourceAccNum,
            Destination: inputDestinationAccNum,
            Amount: inputAmount,
            Description: inputDescription,
            isScheduled: "no",
        })
        console.log("inputted")
        alert("Transfer Successful")
        navigate('/transaction');
        if (error) {
            //error will throw here
            throw error;
        }
    }

    const handleEdit = () => {
        navigate("/organize-transfer");
    }

    return (
        <div>
            <Header loggedIn={true}/>
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

                <button
                    onClick={userTransfer}
                    type="submit"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Transfer
                </button>

                <Modal showModal={showModal} setShowModal={setShowModal} type={"transfer"} />
                {showTransferList &&
                    <>
                        <div
                            className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                        >
                            <div className="relative w-auto my-6 mx-auto max-w-3xl bg-white">
                                <button
                                    className="float-left text-blue-500 background-transparent px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                    type="button"
                                    onClick={() => handleEdit()}
                                >Edit</button>
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
        </div>
    );
}

export default Transfer;