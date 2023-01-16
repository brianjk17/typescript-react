// https://www.creative-tim.com/learning-lab/tailwind-starter-kit/documentation/react/modals/regular
import React from "react";
import Receipt from "./Receipt";
import {toJpeg} from "html-to-image";


type Props = {
    showModal: boolean;
    type: string;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Modal(props: Props) {
    const state = {...props};
    const shareReceipt = () => {
        const element = document.getElementById('receipt')!;
        console.log(element);
        toJpeg(element, {
            style: {background: "white"}
        })
            .then(function (dataUrl: string) {
                const link = document.createElement('a');
                link.download = 'daven.png';
                link.href = dataUrl;
                link.click();
            });
        state.setShowModal(false)
    }
    return (
        <>
            {state.showModal && (
                <>
                    <div
                        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
                    >
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            {/*content*/}
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                {/*header*/}
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    {state.type === "schedule" ?
                                        <h3 className="text-3xl font-semibold">
                                            Schedule Successful!
                                        </h3> :
                                        <h3 className="text-3xl font-semibold">
                                            Transfer Successful!
                                        </h3>
                                    }
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => state.setShowModal(false)}
                                    >
                    <span
                        className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                                    </button>
                                </div>
                                {/*body*/}
                                {state.type === "schedule" ? null :
                                    <div className="relative p-6 flex-auto">
                                        <Receipt></Receipt>
                                    </div>
                                }
                                {/*footer*/}
                                <div
                                    className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                    {state.type === "schedule" ? null :
                                        <button
                                            className="inline-block px-2 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                                            type="button"
                                            onClick={shareReceipt}
                                        >
                                            Share Receipt
                                        </button>}
                                    <button
                                        className="text-red-500 background-transparent px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => state.setShowModal(false)}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            )}
        </>
    );
}