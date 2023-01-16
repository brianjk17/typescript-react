import React from 'react';

const handleTransactionHistory = (event : React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

}
function Card({text, cardTitle, image}: { text: string | null, cardTitle: string | null, image: string | undefined }) {
    return (
        <div>
                <div
                    className="flex flex-col w-full md:max-w-xl rounded-lg bg-white shadow-lg hover:bg-gray-100 hover:shadow-lg focus:bg-gray-100 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg">
                    <div className="mx-auto w-36 h-36 md:h-48">
                    <img
                        className=" w-full md:h-auto object-cover md:w-48 rounded-t-lg md:rounded-none md:rounded-l-lg"
                        src={image}/>
                    </div>
                    <div className="h-48 block p-6 rounded-r-lg shadow-lg max-w-sm w-full">
                        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 w-full">{cardTitle}</h5>
                        <p className="text-gray-700 text-base mb-4 w-full">
                            {text}
                        </p>
                    </div>
                </div>
            </div>

    )

}

export default Card;