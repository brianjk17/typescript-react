import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseAdmin } from '../../supabase';
interface Props {
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginCard = ({setLoggedIn}: Props) => {
    const navigate = useNavigate();
    const [inputCompName, setInputCompName] = useState('')
    const [inputPassword, setInputPassword] = useState('')

    const handleChangeComp = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputCompName(event.target.value);
        console.log('compname:', inputCompName);
    };

    const handleChangePassword = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setInputPassword(event.target.value);
        console.log('password: ', inputPassword);
    };

    function test() {
        let fruit: string[] = ["banana", "kntl"]
        return fruit;
    }

    async function userLogin() {
        const { data, error } = await supabaseAdmin
            .from('companies')
            .select()
            .eq('CompanyName', inputCompName)
            .eq('Password', inputPassword)

        if (data?.length !== 0) {
            console.log("success")
            console.log(data![0].id);

            var companyId = (data![0].id)
            var CompanyName = data![0].CompanyName;
            var BusinessRegNumber = data![0].BusinessRegNumber;
            var CompanyAddress = data![0].CompanyAddress;
            var ContactPerson = data![0].ContactPerson;
            var PhoneNumber = data![0].PhoneNumber;
            var Password = data![0].Password;
            var Pin = data![0].PIN;
            var AccountNumber = data![0].AccountNumber;
            console.log("COMPANY ID: " + companyId)

            sessionStorage.setItem("id", companyId)
            sessionStorage.setItem("CompanyName", CompanyName)
            sessionStorage.setItem("BusinessRegNumber", BusinessRegNumber)
            sessionStorage.setItem("CompanyAddress", CompanyAddress)
            sessionStorage.setItem("ContactPerson", ContactPerson)
            sessionStorage.setItem("PhoneNumber", PhoneNumber)
            sessionStorage.setItem("Password", Password)
            sessionStorage.setItem("Pin", Pin)
            sessionStorage.setItem("AccountNumber", AccountNumber)
            //redirect
            setLoggedIn(true);
            navigate('/dashboard');

        }
        else if (data?.length === 0) {
            alert("Wrong Company Name or Password")
            console.log("no success")
            console.log(data);
        }
        else if (error) {
            throw error;
        } else {
            console.log("all good")
        }
    }

    //--------------------------------------------------------------------------------------------------------


    return (
        // https://tailwind-elements.com/docs/standard/components/cards/3
        <div className="flex justify-center">
            <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
                <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Login</h5>
                {/*<form className="loginForm" onSubmit={userLogin} action="#">*/}
                <input
                    onChange={handleChangeComp}
                    type="text"
                    className="
        form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                    id="company_name"
                    placeholder="Company Name" />
                <input
                    onChange={handleChangePassword}
                    type="password"
                    className="
        form-control
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
      "
                    id="password"
                    placeholder="Password"
                />

                <button
                    onClick={userLogin}
                    type="submit"
                    className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Login
                </button>
                {/*</form>*/}
            </div>
        </div>
    );
};

export default LoginCard;