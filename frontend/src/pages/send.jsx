import { useState } from "react";
import { useRecoilValue } from "recoil";
import { userAtom } from "../atoms";
import axios from 'axios'

export default function Send(){
    const [amount, setAmount] = useState("");
    const current_user = useRecoilValue(userAtom)

    async function initiateTransaction(){
        const token = localStorage.getItem("authToken")

        if(amount<=0 || !amount){
            alert("enter the ammount")
            return
        }
        try{
            const res = await axios.post("http://localhost:3000/api/v1/account/transfer",{
                to:current_user.id,
                amount: Number(amount)
            },{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            alert(res.data.msg)
            setAmount("")
        }
        catch(e){
            alert(e.response.data.msg)
            console.log(e)
        }
    }
    return(
            <div className="flex h-screen justify-center items-center bg-gray-500">
                <div className="bg-white p-5 px-15 max-w-md">
                    <div className="text-center text-3xl font-bold my-4">Send money</div>
                    <div className="flex items-center gap-2 my-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-10">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg> 
                        <p className="text-[18px]">{current_user.firstname} {current_user.lastname}</p>
                    </div>
                    <div className="my-1">Amount (in Rs)</div>
                    <input className="border border-gray-400 p-1 w-full px-2 rounded-md" onChange={(e)=>setAmount(e.target.value)} type="text" placeholder="Enter Amount" /> <br />
                    <button className="my-3 bg-black text-white p-2 px-4 w-full" type="submit" onClick={initiateTransaction}>Initiate Transfer</button>
                </div>
            </div>
        )
}