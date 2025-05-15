import { useNavigate } from "react-router-dom"

export default function Signup(){
    const navigate = useNavigate()
    return(
        <div className="flex justify-center items-center h-screen bg-gray-500">
            <div className="bg-white p-5  rounded-xl flex flex-col w-full max-w-sm ">
                <h1 className="text-4xl font-bold mx-auto py-4">Sign Up</h1>
                <p className="text-gray-500 mx-auto text-center px-15 pb-3">Enter your information to <br /> create an account</p>
                <form className="px-2 flex flex-col gap-3">
                    <label><p className="font-bold pb-1">First Name</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" type="text" placeholder="John" /> <br />
                    </label>
                    <label><p className="font-bold pb-1">Last Name</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" type="text" placeholder="doe" /> <br />
                    </label>
                    <label><p className="font-bold pb-1">Email</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" type="email" placeholder="johndoe@gmail.com" /> <br />
                    </label>
                    <label><p className="font-bold pb-1">Password</p>
                        <input className="border p-1 px-2 rounded-sm border-gray-400 w-full" type="password" placeholder="******" /> <br />
                    </label>
                    <button className="bg-black text-white rounded-sm py-2 mt-2 hover:bg-gray-600">Sign Up</button>
                    <p>Already have an account? <button onClick={()=> navigate("/signin")} type="button" className="underline hover:text-gray-500 cursor-pointer">Login</button></p>
                </form>
            </div>
        </div>
    )
}