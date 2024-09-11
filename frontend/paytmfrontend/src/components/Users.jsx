import axios from "axios";
import { useEffect, useState } from "react"
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export function Users(){
    const[users,setUsers]=useState([]);
    const[filter,setfilter]=useState("")
    useEffect(()=>{
        axios.get("http://localhost:3000/api/v1/user/bulk?filter="+filter).then(
            response=>{
                setUsers(response.data.user);
            }
        )
    },[filter])
    return(
        <div className="px-12">
            <div className="text-left">Users</div>
            <div className="flex h-11 rounded-md justify-between ">
                <input onChange={(e)=>{
                    setfilter(e.target.value)
                }} type="text" className="text-left px-2 pt-2 font-light w-full border-2" placeholder="Search User..."/>
            </div>
            <div>
                {users.map(user=><User user={user}/>)}
            </div>
        </div>
    )
}

function User({user}){
    const Navigate=useNavigate()
    return(
    <div className="pt-5 flex justify-between">
        <div className="flex justify-center">
        <div className="flex flex-col justify-center bg-slate-200 h-10 w-10 rounded-full">
                <div className="text-black font-medium flex justify-center">{user.firstName[0].toUpperCase()}</div>
        </div>
        <div className="flex flex-col justify-center font-bold px-2">{user.firstName}</div>
        </div>
        <div className="flex flex-col justify-center h-full w-40">
        <Button onClick={(e)=>{
            Navigate("/send?id="+user._id+"&name="+user.firstName)
        }} label={"Send Money"} color={"gray"} number={"500"}/>
      </div>
    </div>
    )
}