import React from "react";
import axios from 'axios'
import { Link , useNavigate } from "react-router-dom";
function Signup()
{
    
        const [user , setUser] = React.useState({email:'' ,
        password:''
      })
       console.log(user)
       const history = useNavigate()
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
     await axios.post('http://localhost:7000/api/users/signup' , {email , password})
      .then((res)=> {
          if(res.data === 'exists')
          {
            alert('The user already exists')
              
          }
          else
          {
            history('/home' , {state:{id:email}})
            
          }

      })
      .catch((e)=> console.log(e))


   }                                        
        return(
        <div className="container">
        <h1>Signup</h1>
        <form action = "POST" onSubmit={handleSubmit}>
        <label htmlFor="emailid" className="form-label">Email:</label>
        <input type="email" placeholder = "email"  name = 'email' value = {user.email}
        onChange={handleChange} id= "emailid" className="form-control" />
         <label htmlFor="passwordid" className="form-label">Password:</label>
        <input type="password" placeholder = "password" name = 'password' value = {user.password}
        onChange={handleChange} id = "passwordid" className="form-control" />
        <button type="submit" className="btn btn-primary mt-3">Signup</button>


        </form>
        <p className="mt-3">If you've signed up then</p>
        <Link to = '/'><button className="btn btn-success">Login</button></Link>

        </div>
        )
    
}

export {Signup}