import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Signin(){
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault();

        if(!email || !password){
            alert("Fill inputs")
        }

        try{
            const res = await axios.post("http://localhost:3000/api/v1/user/signin", {
                email,
                password
            })
            navigate("/dashboard")
            alert("sign in succesfully")
            const token = res.data.token
            localStorage.setItem("authToken",token)
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        catch(e){
            alert(e.response.data.msg)
        }
    }

    return(
        <div className="flex justify-center items-center h-screen bg-gray-500">
            <div className="bg-white p-5 mx-5  rounded-xl flex flex-col w-full max-w-md md:p-10">
                <h1 className="text-4xl font-bold mx-auto pb-4">Sign In</h1>
                <p className="text-gray-500 mx-auto text-center px-15 pb-3">Enter your credentials to acces your account</p>
                <form className="px-2 flex flex-col gap-3" onSubmit={handleSubmit}>
                    <label><p className="font-bold pb-1">Email</p>
                        <input onChange={(e)=>setEmail(e.target.value)} className="border p-1 px-2 rounded-sm border-gray-400 w-full" type="email" placeholder="johndoe@gmail.com" autoComplete="username" /> <br />
                    </label>
                    <label><p className="font-bold pb-1">Password</p>
                        <input  onChange={(e)=>setPassword(e.target.value)} className="border p-1 px-2 rounded-sm border-gray-400 w-full" type="password" placeholder="******"  autoComplete="current-password"/> <br />
                    </label>
                    <button type="submit" className="bg-black text-white rounded-sm py-2 mt-2 hover:bg-gray-600">Login</button>
                    <p>Don't have an account? <button onClick={()=> navigate("/signup")} type="button" className="underline hover:text-gray-500 cursor-pointer">Sign up</button></p>
                </form>
            </div>
        </div>
    )
}