import React, { useContext, useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import axios from 'axios'
import {Context, server} from "../main"
import toast from 'react-hot-toast'

function Register() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {isAuthenticated, setIsAuthenticated} = useContext(Context)

    const submitHandler = async(e)=>{
        e.preventDefault();
        // console.log();
       try {
         const {data} =  await axios
        .post(`${server}/users/new`,
        {
            name, email, password
        },
        {
            headers:{
                "Content-Type": "Application/json"
            },
            withCredentials: true,
        }
        )
        toast.success(data.message)
        setIsAuthenticated(true)

       } catch (error) {
            toast.error(error.response.data.message);
            setIsAuthenticated(false)
            console.log(error);
       }
    }

    if(isAuthenticated) return <Navigate to="/" /> 


  return (
     <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="name"
            placeholder="Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button  type="submit">
            Sign Up
          </button>
          <h4>Or</h4>
          <Link to="/login">Log in </Link>
        </form>
      </section>
    </div>
  )
}

export default Register