import React, {useState} from 'react';

function BalanceCard() {
    const [balance, setBalance] = useState(10000);

    return (
        <div>
            <div className="block p-6 rounded-lg shadow-lg bg-white w-1/2 max-w-md mx-auto">
                <p>567121367160</p>
                <p className="font-bold">Balance</p>
                <p>RM{balance.toLocaleString('en-US')}</p>
            </div>
        </div>
    );
}

export default BalanceCard;