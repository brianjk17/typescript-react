import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Header from "../Header";
import LoginCard from "./LoginCard";

//backend
import { supabaseAdmin } from '../../supabase';

function LandingPage() {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    // async function supabasefunc(){
    //   const{data}=await supabaseAdmin.from('companies').select("*");
    //   console.log(data)
    //   for (var i in data){
    //       console.log(data)
    //   }
    //   return{
    //     props:{data}
    //   };
    // }
    // supabasefunc()
    
    return (
        <div>
            <Header loggedIn={loggedIn}/>
            <LoginCard setLoggedIn={setLoggedIn}/>
            <div className="flex justify-center mt-2">
                <p>Don’t have an account yet? <Link to="/register" className={"text-blue-600"}>Register Now</Link></p>
            </div>
        </div>
    );
}

export default LandingPage;
