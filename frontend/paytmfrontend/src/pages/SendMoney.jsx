import axios from "axios";
import { Button } from "../components/Button";
import { Heading } from "../components/Header";
import { InputBox } from "../components/Inputbox";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function SendMoney(){
    const Navigate=useNavigate()
    const [searchParams]=useSearchParams();
    const id=searchParams.get("id");
    const name=searchParams.get("name")
    const[amount,setAmount]=useState(0);
    useEffect(()=>{
        const usertoken=localStorage.getItem("token");
        if(!usertoken){
            Navigate("/signin");
        }
    },[])
    return(
        <div className="bg-slate-200 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-8">
                <Heading label={"Send Money"}/>
                <div className="pt-20 flex ">
                <div className="flex flex-col justify-center bg-green-500 h-10 w-10 rounded-full">
                    <div className="text-white text-lg font-medium flex justify-center">{name[0].toUpperCase()}</div>
                </div>
                <div className="flex flex-col justify-center font-bold px-2 text-lg">{name}</div>
            </div>
                <InputBox OnChange={
                    (e)=>{
                        setAmount(e.target.value)
                    }
                } placeholder={"Enter amount"} label={"Amount (in Rs)"}/>
                <div className="py-4">
                <Button onClick={async ()=>{
                    const response=await axios.post("http://localhost:3000/api/v1/account/transfer",{
                        to:id,
                        amount:amount
                    },
                    {
                        headers:{
                            Authorization:"Bearer " +localStorage.getItem("token"),
                        }
                    }
                )
                Navigate("/paymentStatus?message="+response?.data.message)
                }} label={"Intiate Transfer"} color={"green"} number={"500"}/>
                <div className="pt-3">
                <button
                onClick={() => Navigate("/Dashboard")}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 w-full bg-red-500 text-white"
              >
                Cancel & Go Back
              </button></div>
                </div>
                </div>
            </div>
        </div>
    )
}