import React, { useState } from 'react';

function Financing() {
    const [purpose, setPurpose] = useState("Working Capital");

    const purposeChange = (e: any) => {
        setPurpose(e.target.value);
    }

    sessionStorage.setItem("loanPurpose", purpose)

    return (
        <div>
            <div>
                <p>Purpose</p>
                <div>
                    <input defaultChecked className="mr-2" type="radio" id="working_capital" name="purpose" value="Working Capital"
                        onChange={purposeChange}></input>
                    <label htmlFor="working_capital">Working Capital</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="property" name="purpose" value="Property" onChange={purposeChange}></input>
                    <label htmlFor="property">Property</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="equipment" name="purpose" value="Equipment Financing" onChange={purposeChange}></input>
                    <label htmlFor="equipment">Equipment Financing</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="others" name="purpose" value="Others" onChange={purposeChange}></input>
                    <label htmlFor="others">Others</label>
                </div>
            </div>
        </div>
    );
}

export default Financing;