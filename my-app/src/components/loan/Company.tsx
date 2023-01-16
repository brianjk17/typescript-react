import React, { useState } from 'react';

function Company() {
    const [entity, setEntity] = useState("Sole Proprietor");
    const [status, setStatus] = useState("Micro");
    const [natureofBusiness, setnatureofBusiness] = useState("")
    const [numberOfStaff, setnumberOfStaff] = useState("")

    const entityChange = (e: any) => {
        setEntity(e.target.value);
    }

    const statusChange = (e: any) => {
        setStatus(e.target.value);
    }

    const natureOfBusinessChange = (e: any) => {
        setnatureofBusiness(e.target.value);
    }

    const numberOfStaffChange = (e: any) => {
        setnumberOfStaff(e.target.value);
    }

    sessionStorage.setItem("loanEntity", entity)
    sessionStorage.setItem("loanStatus", status)
    sessionStorage.setItem("loanNatureOfBusiness", natureofBusiness)
    sessionStorage.setItem("loanNumberOfStaff", numberOfStaff)

    return (
        <div>
            <div>
                <p>Entity Type</p>
                <div>
                    <input defaultChecked className="mr-2" type="radio" id="sole_proprietor" name="entity_type" value="Sole Proprietor"
                        onChange={entityChange}></input>
                    <label htmlFor="sole_proprietor">Sole Proprietor</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="partnership" name="entity_type"
                        value="Partnership" onChange={entityChange}></input>
                    <label htmlFor="partnership">Partnership</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="private_limited" name="entity_type"
                        value="Private Limited" onChange={entityChange}></input>
                    <label htmlFor="private_limited">Private Limited</label>
                </div>
            </div>

            <div>
                <p>Corporate Status</p>
                <div>
                    <input defaultChecked className="mr-2" type="radio" id="micro" name="status" value="Micro"
                        onChange={statusChange}></input>
                    <label htmlFor="micro">Micro</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="small" name="status" value="Small" onChange={statusChange}></input>
                    <label htmlFor="small">Small</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="medium" name="status" value="Medium" onChange={statusChange}></input>
                    <label htmlFor="medium">Medium</label>
                </div>

                <div>
                    <input className="mr-2" type="radio" id="non_sme" name="status" value="Non SME" onChange={statusChange}></input>
                    <label htmlFor="non_sme">Non SME</label>
                </div>
            </div>

            <label htmlFor="business_nature">Nature of Business</label>
            <input
                onChange={natureOfBusinessChange}
                type="text"
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
                id="business_nature"
            />

            <label htmlFor="staff">Number of Staff</label>
            <input
                onChange={numberOfStaffChange}
                type="text"
                className="
        form-control
        block
        w-30
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
                id="staff"
                placeholder="" />

            <input className="mr-2" type="checkbox" id="save_info" name="company_info" value="true"></input>
            <label htmlFor="save_info">Save company info</label>
        </div>
    );
}

export default Company;