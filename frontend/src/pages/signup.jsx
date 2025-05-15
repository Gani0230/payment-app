import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from 'axios'

export default function Signup(){
    const navigate = useNavigate()
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = async (e)=>{
        e.preventDefault()

        if(!firstname || !lastname || !email || !password){
            alert("Fill information first")
            return
        }
        try{
                const res = await axios.post("http://localhost:3000/api/v1/user/signup",{
                    firstname,
                    lastname,
                    email,
                    password
                })
                alert("signup succesfully")
                navigate("/signin")
        }
        catch(e){
            alert(e.response.data.msg)           
        }
    }

    return(
        <div className="flex justify-center items-center h-screen bg-gray-500">
            <div className="bg-white p-5 mx-5  rounded-xl flex flex-col w-full max-w-md md:p-10">
                <h1 className="text-4xl font-bold mx-auto pb-4">Sign Up</h1>
                <p className="text-gray-500 mx-auto text-center px-15 pb-3">Enter your information to create an account</p>
                <form className="px-2 flex flex-col gap-3" onSubmit={handleSubmit}>
                    <label><p className="font-bold pb-1">First Name</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" onChange={(e)=>setFirstname(e.target.value)} type="text" placeholder="John" /> <br />
                    </label>
                    <label><p className="font-bold pb-1">Last Name</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" onChange={(e)=>setLastname(e.target.value)} type="text" placeholder="doe" /> <br />
                    </label>
                    <label><p className="font-bold pb-1">Email</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="johndoe@gmail.com" /> <br />
                    </label>
                    <label><p className="font-bold pb-1">Password</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" onChange={(e)=>setPassword(e.target.value)} type="password" autoComplete="current-password" placeholder="******" /> <br />
                    </label>
                    <button type="submit" className="bg-black text-white rounded-sm py-2 mt-2 hover:bg-gray-600">Sign Up</button>
                    <p>Already have an account? <button onClick={()=> navigate("/signin")} type="button" className="underline hover:text-gray-500 cursor-pointer">Login</button></p>
                </form>
            </div>
        </div>
    )
}