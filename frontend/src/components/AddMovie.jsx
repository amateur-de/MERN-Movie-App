import React from "react";
import axios from 'axios'
import { Link , useNavigate } from "react-router-dom";

function AddMovie()
{
    const [movie , setMovie] = React.useState({name:'' , 
                    genre:'' , rating: '0'})
    console.log(movie)
    function handleChange(e)
    {
       
        setMovie((prevMovie)=> {
            return {...prevMovie ,
            [e.target.name]: e.target.value}
        })

    }
    async function  handleSubmit(e)
    {
        e.preventDefault()
        console.log(movie)
        const name = movie.name
        const genre = movie.genre
        const rating = movie.rating
        
        await axios.post('http://localhost:7000/api/movies/addmovie' , {name , genre , rating})
        .then((res)=> {
            if(res.data === 'movie exists')
            {
                alert('Movie already exists in the database')
            }
            else if(res.data === 'genre does not exist')
            {
                alert('Invalid Genre')
            }
            else
            {
                alert('Movie has been created')
            }
        })
        .catch((e)=> console.log(e))

    }

    return (
        <div className="container">
            <h1>Add New Movie</h1>
         <form action = "POST" onSubmit={handleSubmit}>
            <label htmlFor="nameid" className="form-label">Movie Name</label>
            <input type="text" placeholder = "Enter Name" name = "name" 
            value = {movie.name} onChange={handleChange} id = "nameid" className="form-control"/>
            <label htmlFor="moviegenreid" className="form-label">Movie Genre</label>
            <input type="text" placeholder = "Enter Genre" name = "genre" 
            value = {movie.genre} onChange={handleChange} id = "moviegenreid" className="form-control"/>
            <label className="form-label" >  
                Rate the movie 
                 <select name="rating" id="" value = {movie.rating} onChange={handleChange} 
                 className="form-select">
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                 </select>
            </label>
            <br />
            <button type="submit" className="btn btn-success mt-3">Add Movie</button>
         </form>
         </div>
    )
}

export {AddMovie}