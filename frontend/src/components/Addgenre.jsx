import React from "react";
import axios from 'axios'
import { Link , useNavigate } from "react-router-dom";


function Addgenre()
{
    const [genre , setGenre] = React.useState('')
    console.log(genre)
    const history = useNavigate()
    function handleChange(event)
    {
        setGenre(event.target.value)

    }

    async function handleSubmit(event)
    {
        event.preventDefault()
        console.log(genre)
        const newGenre = genre
        await axios.post('http://localhost:7000/api/genres/addgenre' , {newGenre})
        .then(res=> {
            if (res.data === 'exists')
            {
                alert('That genre is already present')
            }
            else
            {
                alert('Genre has been created')
            }
        })
        .catch((e)=> console.log(e))
    }


    return (
        <div className="container">
            <h1>New Genre</h1>

        <form action = "POST" onSubmit={handleSubmit}>
            <label htmlFor="genreid" className="form-label" >Genre Name</label>
            <input type="text" placeholder = "Enter Genre" name = "genre"  
            onChange = {handleChange} value={genre} id = "genreid" className="form-control"/>
            <button type="submit" className="btn btn-success mt-3">Add Genre</button>


        </form>
        </div>
    )


}

export {Addgenre}