import { useEffect, useState } from "react"
import { BottomWarning } from "../components/BottomWarning"
import { Button } from "../components/Button"
import { Heading } from "../components/Header"
import { InputBox } from "../components/Inputbox"
import { SubHeading } from "../components/SubHeading"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const Signin=()=>{
    const navigate=useNavigate();
    const [password,setPassword]=useState("");
    const [username,setUsername]=useState("");
    useEffect(()=>{
        const token=localStorage.getItem("token");
        if(token){
            navigate("/Dashboard")
        }
    },[])
    return(
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"}/>
                    <SubHeading label={"Enter your credentials to access your account here"}/>
                    <InputBox OnChange={
                        (e)=>{
                            setUsername(e.target.value)
                        }
                    } label={"Email"} placeholder={"ashutoshra41@gmail.com"}/>
                    <InputBox OnChange={
                        (e)=>{
                            setPassword(e.target.value)
                        }
                    } label={"Password"} placeholder={"123456"}/>
                    <div className="pt-4">
                    <Button onClick={async()=>{
                        const response=await axios.post("http://localhost:3000/api/v1/user/signin",{
                            username,
                            password
                        })
                        localStorage.setItem("token",response.data.token)
                        navigate("/Dashboard")
                    }} label={"Sign in"} color={"gray"} number={"500"}/>
                    </div>
                    <BottomWarning label={"Don't have an account?"} to={"/signup"} buttonText={"Sign up"}/>
                </div>
            </div>
        </div>
    )
}