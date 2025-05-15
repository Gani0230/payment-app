import React from "react"
import './App.css'

import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
const Signin = React.lazy(()=>import("./pages/signin"))
const Signup = React.lazy(()=>import("./pages/signup"))
const Dashboard = React.lazy(()=>import("./pages/dashboard"))
const Send = React.lazy(()=>import("./pages/send"))


function App() {
  return (
    <div>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading.....</div>}>
          <Routes>
            <Route path="/" element={<Buttons />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/send" element={<Send />} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  )
}

function Buttons(){
  const navigate = useNavigate()
  return(
    <div className="flex flex-col justify-center h-[70vh] items-center">
      <h1 className="m-5 sm:m-8 text-3xl sm:text-7xl">Welcome to QuickPay</h1>
      <p className="mb-8 sm:text-2xl text-gray-500 text-center px-3">An online payment app that allow cashless payments</p>
      <div>
        <button className="bg-blue-500 text-white p-2 px-6 rounded-lg mx-2 hover:bg-blue-800" onClick={()=>{
          navigate("/signup")
        }}>Sign up</button>

        <button className="bg-blue-500 text-white p-2 px-6 rounded-lg mx-2 hover:bg-blue-800" onClick={()=>{
          navigate("/signin")
        }}>Sign in</button>
      </div>
    </div>
  )
}

export default App
