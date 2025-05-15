import axios from 'axios'
import { useEffect, useState } from 'react'
import UserCard from './userCards'
import { useNavigate } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms'

export default function Users(){
    const [users,setUsers] = useState([])
    const [filter, setFilter] = useState("")
    const navigate = useNavigate()
    const [currentUser, setUser] = useRecoilState(userAtom)


    useEffect(()=>{
        const fetchUsers = async ()=>{
            const token = localStorage.getItem("authToken")
            try{
                const res = await axios.get("http://localhost:3000/api/v1/user/bulk",{
                    params: { filter },
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                setUsers(res.data.user)
            }
            catch(e){
                alert("Something went wrong")
            }
        }
        fetchUsers()
    },[filter])

    function sendmoneybutton(user){
        setUser(user)
        navigate("/send")
    }

    return(
        <div className='px-4'>
            <div className='font-bold'>Users</div>
            <input className='my-4 border border-gray-400 p-1 w-full rounded-md' onChange={(e)=>setFilter(e.target.value)} type="text" placeholder='search users..' />
            {users.map((u)=>{
                return <div key={u.id}>
                    <UserCard username={u.firstname} lastname={u.lastname} onClick={()=>sendmoneybutton(u)}/>
                </div>
            })}
        </div>
    )
}