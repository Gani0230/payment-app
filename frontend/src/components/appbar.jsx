import { useEffect, useState } from "react";
import axios from 'axios'

export default function Appbar(){
    const [username, setUsername] = useState("")
    useEffect(()=>{
        const token = localStorage.getItem("authToken")
        const fetcheUsername = async ()=>{
            try{
                const res = await axios.get("http://localhost:3000/api/v1/user",{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(res.data)
                setUsername(res.data.username)
            }
            catch(e){
                alert("Something went wrong")
            }
        }
        fetcheUsername()
    },[])

    return(
        <div className="flex justify-between items-center border-b border-b-gray-200 p-4">
            <div className="font-bold  text-2xl">QuickPay</div>
            <div className="flex items-center">
                <p className="px-3">Hello,  {username}</p> 
                <div className="hover:bg-gray-400 p-1 rounded-full">
                    <svg  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                </div>
            </div>
        </div>
    )
}