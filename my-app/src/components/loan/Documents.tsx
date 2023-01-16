import React from "react";
import {useState} from 'react';
import { supabaseAdmin } from "../../supabase";

//https://www.spguides.com/upload-file-in-react-js/
const MAX_FILE = 10;
let imagelinks: string[]=[]

function FileUpload() {
    const [uploadedFiles, setUploadedFiles] = useState([])
    const [fileLimit, setFileLimit] = useState(false);    
    
    async function checkloans() {
        const { data, error } = await supabaseAdmin
        .from('companyloan')
        .select()
        .eq('companyId', sessionStorage.getItem("id"))

        console.log(data?.length);
        if(error){
            throw error
        }
        return(data?.length)
    }

    //  const handleUploadFiles = (files: any) => 
    async function  handleUploadFiles (files: any){
        const uploaded: any = [...uploadedFiles];
        let limitExceeded = false;
        
        // check if the file is already exists
        files.some((file: any) => {
            if (uploaded.findIndex((f: any) => f.name === file.name) === -1) {
                uploaded.push(file);
                if (uploaded.length === MAX_FILE) setFileLimit(true);
                //limit the number of file to be uploaded
                if (uploaded.length > MAX_FILE) {
                    alert(`You can only add a maximum of ${MAX_FILE} files`);
                    setFileLimit(false);
                    limitExceeded = true;
                    return true;
                }
            }
        })

        if (!limitExceeded) {
            setUploadedFiles(uploaded);
            
            //check number of loans
            let numloan=await checkloans();
            
            //input to storage
            console.log(numloan)
            let imgid=(sessionStorage.getItem("id")+ "-"+ numloan);
            console.log(files[0]["name"])
            const { data, error } = await supabaseAdmin.storage
                .from("loandocument")
                .upload(imgid + "/" + files[0]["name"], files[0]);
                if (data) {
                    console.log(JSON.stringify({ data }));
                    //add to image array
                    let imglink="https://rcpoovvkbiqrqvbcvcbw.supabase.co/storage/v1/object/public/loandocument/"+sessionStorage.getItem("id")+"-"+numloan+"/"+files[0]["name"];
                    console.log(imglink)
                    imagelinks.push(imglink)
                    console.log(imagelinks);
                    console.log(JSON.stringify(imagelinks));
                    sessionStorage.setItem("loanDocs", JSON.stringify(imagelinks))
                } else if (error) {
                    console.log(error);
                }}
    }

    // store url to the local session
    function storeimageurls(){
        //imagelinks
    }
    const fileEventHandler = (e: any) => {
        const chosenFiles = Array.prototype.slice.call(e.target.files)
        handleUploadFiles(chosenFiles);
    }

    return (
        <div className="App">
            {/*  display the uploaded files */}
            <input className='border border-solid border-gray-300 px-4 py-2 rounded m-2' id='fileUpload' type='file'
                   multiple
                   accept='application/pdf, image/png,image/jpeg'
                   onChange={fileEventHandler}
                   disabled={fileLimit}
            />
            <div className="uploaded-files-list">
                {uploadedFiles.map((file: any, index) => (
                    <div>
                        {index + 1 + ". " + file.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

function Documents() {
    return (
        <div>
            <div className="flex flex-col p-6 rounded-r-lg shadow-lg w-full mx-auto justify-center">
                <label className="font-semibold text-gray-700 block pb-1">Upload Your Supporting Documents:</label>
                <ul>
                    <li>1. A copy of all the directors’ / partners’ / sole proprietor and any guarantors’ IC or passport</li>
                    <li>2. Latest 6 months statements from all your current accounts</li>
                    <li>3. Registration of Business: Forms A & D, or B & D (if you are a partner or a sole proprietor</li>
                    <li>4. Audited Accounts for the last 3 years (if you are a limited company)</li>
                    <li>5. Certified Accounts for the last 3 years (if you are a partner or sole proprietor)</li>
                    <li>6. Valuation Report</li>
                </ul>
                <div className="flex">
                    <FileUpload/>
                    {/*  <input id="documents" className="*/}
                    {/*  form-control*/}
                    {/*  block*/}
                    {/*  w-full*/}
                    {/*  px-4*/}
                    {/*  py-2*/}
                    {/*  my-2*/}
                    {/*  text-base*/}
                    {/*  font-normal*/}
                    {/*  text-gray-700*/}
                    {/*  bg-white bg-clip-padding*/}
                    {/*  border border-solid border-gray-300*/}
                    {/*  rounded*/}
                    {/*  transition*/}
                    {/*  ease-in-out*/}
                    {/*  m-0*/}
                    {/*  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none*/}
                    {/*" type="file" multiple/>*/}
                </div>
            </div>
        </div>
    );
}

export default Documents;