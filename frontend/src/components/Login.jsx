import React from "react";
import axios from 'axios'
import { Link , useNavigate } from "react-router-dom";
function Login()
{
      const [user , setUser] = React.useState({email:'' ,
                                                password:''
                                              })
      const history = useNavigate()                                        
     console.log(user)
     function handleChange(event) 
     {
        setUser((prevUser)=> {
            return {...prevUser , 
            [event.target.name]: event.target.value }
        })

     } 
     async function handleSubmit(e)  
     {
        e.preventDefault()
        console.log(user)
        const email = user.email
        const password = user.password
        await axios.post('http://localhost:7000/api/users/login' , {email , password})
        .then((res)=> {
            if(res.data === 'exist')
            {
                history('/home' , {state:{id:email}})
            }
            else
            {
                alert('The user has not created an account')
            }

        })
        .catch((e)=> console.log(e))


     }                                    
    return(
        <div className="container">
            <h1>Login</h1>
            <form action = "POST" onSubmit={handleSubmit}>
                <label htmlFor="emailid" className="form-label">Email:</label>
                <input type="email" placeholder = "email"  name = 'email' value = {user.email}
                onChange={handleChange} id = "emailid" className="form-control"/>
                <label htmlFor="passwordid" className="form-label">Password:</label>
                <input type="password" placeholder = "password" name = 'password' value = {user.password}
                onChange={handleChange} id = "passwordid" className="form-control"/>
                <button type="submit" className="btn btn-primary mt-3">Login</button>


            </form>
            <p className="mt-3">If you haven't signed up then</p>
            <Link to = '/signup'><button className="btn btn-success">Signup</button></Link>

        </div>
    )
}

export {Login}