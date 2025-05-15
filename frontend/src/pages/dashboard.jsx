import { useEffect, useState } from "react"
import axios from 'axios'
import Appbar from "../components/appbar"
import Users from "../components/users"

export default function Dashboard(){
    const [balance, setBalance] = useState(0)

    useEffect(()=>{
        async function fetching_balance(){
            const token = localStorage.getItem("authToken")
            console.log(token)
            try{
                const res = await axios.get("http://localhost:3000/api/v1/account/balance",{
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setBalance(res.data.balance)
                console.log(res.data)
            }
            catch(e){
                alert("something went wrong")
                console.log(e)
            }
        }
        fetching_balance()
    },[])
    
    return(
        <div>
            <Appbar />
            <div className="m-4 text-[20px]">
                <span className="font-bold">Your Balance: </span>
                <span>{balance}</span>
            </div>
            <Users />
        </div>
    )
}