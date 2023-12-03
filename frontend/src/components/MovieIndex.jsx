import React from "react";
import axios from 'axios'
import { Link , useSearchParams } from "react-router-dom";


function MovieIndex()
{
    const [movies , setMovies] = React.useState([])
    const [searchParams , setSearchParams] = useSearchParams()

    React.useEffect(()=> {
        axios.get('http://localhost:7000/api/movies' )
        .then((res)=> 
        {console.log(res.data)
          setMovies(res.data)

        })
        .catch((e)=> console.log(e))
        

    }, [])
    async function handleDelete(id)
    {
        console.log('Delete button')
        console.log(id)
        await axios.delete(`http://localhost:7000/api/movies/${id}`)
        .then((res)=> {
            if(res.data === 'success')
            {
                alert('Movie Deleted Successfully')
            }
            else
            {
                alert('Unsuccessful')
            }

        })
        .catch(e=>console.log(e))
    }
    const movieElements = movies.map((movie)=> {
        return (
            <tr key = {movie._id}>
                <td>{movie.name}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.rating}</td>
                <td><button className="btn btn-danger" onClick={(e)=>handleDelete(movie._id)}>Delete</button></td>

            </tr>
        )
    })
    return(
        <div className="container">
            <h1>All Movies</h1>
        <table className="table">
            <thead>
            <tr>
                  <th>Name</th>
                  <th>Genre</th>
                  <th>Rating</th>
                  <th>Delete</th>


            </tr>
            </thead>
            <tbody>
            {movieElements}
            </tbody>
        </table>
        </div>
    )
}

export {MovieIndex}