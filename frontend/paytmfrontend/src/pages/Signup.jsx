import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Header"
import { InputBox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export const Signup=()=>{
    const navigate=useNavigate();
    const [firstName,setFirstName]=useState("");
    const [lastName,setLastName]=useState("");
    const [username,setUserName]=useState("");
    const [password,setPassword]=useState("");
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            navigate("/Dashboard");
        }
    },[])
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign up"}/>
                    <SubHeading label={"Enter your information to create your account"}/>
                    <InputBox OnChange={(e)=>{setFirstName(e.target.value)}} placeholder="Ashu" label={"First Name"}/>
                    <InputBox OnChange={(e)=>{setLastName(e.target.value)}} placeholder="Singh" label={"Last Name"}/>
                    <InputBox OnChange={(e)=>{setUserName(e.target.value)}} placeholder="ashu23@gmail.com" label={"Email"} />
                    <InputBox OnChange={(e)=>{setPassword(e.target.value)}} placeholder="123456" label={"Password"}/>
                    <div className="pt-4">
                       <Button onClick={async ()=>{
                            const response=await axios.post("http://localhost:3000/api/v1/user/signup",{
                                username,
                                firstName,
                                lastName,
                                password
                            }) ;
                            localStorage.setItem("token",response.data.token)
                            navigate("/Dashboard")
                       }} label={"Sign up"} color={"gray"} number={"500"}/> 
                    </div>
                    <BottomWarning label={"Already have an account?"} to={"/signin"} buttonText={"Sign in"}/>
                </div>
            </div>
        </div>
    )
}