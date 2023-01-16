import React, { useState } from 'react';

function Collateral() {
    const [status, setStatus] = useState("Fixed Deposit");
    const [valueRM, setValue] = useState("")

    const valueChange = (e: any) => {
        setValue(e.target.value);
    }

    sessionStorage.setItem("loanCollateral", status)
    sessionStorage.setItem("loanValue", valueRM)

    return (
        <div>
            <p>Collateral</p>
            <div>
                <select
                    className="form-select form-select-sm
    block
    px-2
    py-1
    text-sm
    font-normal
    text-gray-700
    bg-white bg-clip-padding bg-no-repeat
    border border-solid border-gray-300
    rounded
    transition
    ease-in-out
    m-0
    focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" aria-label=".form-select-sm example"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="Fixed Deposit">Fixed Deposit</option>
                    <option value="Property">Property</option>
                    <option value="Government Guarantee">Government Guarantee</option>
                </select>
            </div>

            <label htmlFor="value">Value (RM)</label>
            <input
                onChange={valueChange}
                type="number"
                className="
        form-control
        block
        w-80
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                id="value"
            />
        </div>
    );
}

export default Collateral;