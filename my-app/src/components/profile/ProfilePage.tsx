import React, { useEffect, useState } from 'react';
import Header from "../Header";
import { supabaseAdmin } from '../../supabase';
import { useNavigate } from 'react-router-dom';

function ProfilePage() {
    useEffect(() => {
        const id = sessionStorage.getItem("id")
        console.log(id)
    }, [sessionStorage])

    const navigate = useNavigate();

    const fallbackString = 'Default';

    var CompanyId = sessionStorage.getItem("id") || fallbackString;
    var CompanyName = sessionStorage.getItem("CompanyName") || fallbackString;
    var BusinessRegNumber = sessionStorage.getItem("BusinessRegNumber") || fallbackString;
    var CompanyAddress = sessionStorage.getItem("CompanyAddress") || fallbackString;
    var ContactPerson = sessionStorage.getItem("ContactPerson") || fallbackString;
    var PhoneNumber = sessionStorage.getItem("PhoneNumber") || fallbackString;
    var Password = sessionStorage.getItem("Password") || fallbackString;
    var Pin = sessionStorage.getItem("Pin") || fallbackString;
    var AccountNumber = sessionStorage.getItem("AccountNumber") || fallbackString;


    const [inputPassword, setinputPassword] = useState('')
    const [inputConfPassword, setinputConfPassword] = useState('')
    const [inputPin, setinputPin] = useState('')
    const [inputConfPin, setinputConfPin] = useState('')

    const handleChangePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setinputPassword(event.target.value);
        console.log('compname:', inputPassword);
    };

    const handleChangeConfirmPassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setinputConfPassword(event.target.value);
        console.log('compname:', inputConfPassword);
    };

    const handleChangePin = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setinputPin(event.target.value);
        console.log('compname:', inputPin);
    };

    const handleChangeConfirmPin = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setinputConfPin(event.target.value);
        console.log('compname:', inputConfPin);
    };

    //update password
    async function updatePassword() {
        if (inputPassword === inputConfPassword) {
            const { error } = await supabaseAdmin
                .from('companies')
                .update({ Password: inputPassword })
                .eq('id', CompanyId)

            alert("Password Changed Successfully")
            navigate('/');
            if (error) {
                throw error;
            }
        } else {
            alert("Wrong Password")
        }

    }

    //update password
    async function updatePin() {
        if (inputPin === inputConfPin) {
            const { error } = await supabaseAdmin
                .from('companies')
                .update({ PIN: inputPin })
                .eq('id', CompanyId)
            alert("PIN Changed Successfully")
            navigate('/');
            if (error) {
                throw error;
            }
        } else {
            alert("Wrong PIN")
        }
    }

    return (

        <div>
            <Header loggedIn={true}/>
            {/*https://tailwindcomponents.com/component/profile-form*/}
            <div className="h-full my-2">
                <div className="border-b-2 block md:flex">
                    <div className="w-full md:w-2/5 p-8 pb-2 sm:p-6 lg:p-8 bg-white shadow-md">
                        <div className="flex justify-between">
                            <span className="text-xl font-semibold block">Profile</span>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 pt-0 p-8 bg-white lg:ml-4 shadow-md">
                        <div className="rounded shadow p-6">
                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Company Name</label>
                                <div className="flex">
                                    <input disabled id="companyName" className="
        border-1  rounded px-4 py-2 w-full
      " type="text" defaultValue={CompanyName} />
                                </div>
                            </div>
                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Account Number</label>
                                <input disabled id="accountNumber" className="
        border-1  rounded px-4 py-2 w-full
      " type="text" defaultValue={AccountNumber} />
                            </div>

                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Business Registration
                                    Number</label>
                                <input disabled id="businessRegistrationNumber" className="
        border-1  rounded px-4 py-2 w-full
      " type="text" defaultValue={BusinessRegNumber} />
                            </div>

                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Address</label>
                                <div className="flex">
                                    <input disabled id="address" className="
        border-1  rounded px-4 py-2 w-full
      " type="text" defaultValue={CompanyAddress} />
                                </div>
                            </div>

                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Contact Person</label>
                                <div className="flex">
                                    <input disabled id="contactPerson" className="
        border-1  rounded px-4 py-2 w-full
      " type="text" defaultValue={ContactPerson} />
                                </div>
                            </div>

                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Phone Number</label>
                                <div className="flex">
                                    <input disabled id="phoneNumber" className="
        border-1  rounded px-4 py-2 w-full
      " type="text" defaultValue={PhoneNumber} />
                                </div>
                            </div>


                        </div>
                    </div>

                    <div className="w-full md:w-3/5 pt-0 p-8 bg-white lg:ml-4 shadow-md">
                        <div className="rounded shadow p-6">
                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Change Password</label>
                                <div className="flex">
                                    <input onChange={handleChangePassword} id="password" className="
        form-control
        block
        w-full
        px-4
        py-2
        my-2
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
      " type="password" defaultValue={Password} />
                                </div>
                            </div>

                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Confirm Password</label>
                                <div className="flex">
                                    <input onChange={handleChangeConfirmPassword} id="confirmPassword" className="
        form-control
        block
        w-full
        px-4
        py-2
        my-2
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
      " type="password" defaultValue={Password} />
                                </div>
                            </div>
                            <button type="button"
                                onClick={updatePassword}
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Change Password
                            </button>
                        </div>
                    </div>

                    <div className="w-full md:w-3/5 pt-0 p-8 bg-white lg:ml-4 shadow-md">
                        <div className="rounded shadow p-6">
                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Change PIN</label>
                                <div className="flex">
                                    <input onChange={handleChangePin} id="password" className="
        form-control
        block
        w-full
        px-4
        py-2
        my-2
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
      " type="password" defaultValue={Pin} />
                                </div>
                            </div>

                            <div className="pb-4">
                                <label className="font-semibold text-gray-700 block pb-1">Confirm PIN</label>
                                <div className="flex">
                                    <input onChange={handleChangeConfirmPin} id="confirmPassword" className="
        form-control
        block
        w-full
        px-4
        py-2
        my-2
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
      " type="password" defaultValue={Pin} />
                                </div>
                            </div>
                            <button type="button"
                                onClick={updatePin}
                                className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Change PIN
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;