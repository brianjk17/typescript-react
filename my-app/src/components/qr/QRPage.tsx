import React, { createRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Header from "../Header";

function QrPage() {
    //https://github.com/gregnb/react-to-print#readme
    let componentRef: React.RefObject<HTMLImageElement> = createRef<HTMLImageElement>();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const fallbackString = 'Default';

    var CompanyName = sessionStorage.getItem("CompanyName") || fallbackString;

    return (
        <div>
            <Header loggedIn={true}/>
            <div className="flex flex-col p-6 rounded-r-lg shadow-lg max-w-sm w-full mx-auto justify-center">
                <p className={"font-bold text-center"}>
                    Show your QR to receive payment
                </p>
                <div id="qr" className={"mx-auto justify-center"} >
                    <img id="x" ref={componentRef} src={process.env.PUBLIC_URL + "/qrcode.png"} className={"object-none object-center"} />
                </div>
                <p className={"font-bold text-center"}>
                    {CompanyName}
                </p>
            </div>
            <div className={"flex justify-center my-4"}>

                <button type={"button"} onClick={handlePrint} className={"px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"}>
                    Print QR
                </button>
            </div>
        </div>
    );
}

export default QrPage;