import React from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function GenreIndex()
{
    const history = useNavigate()
    const [genres , setGenres] = React.useState([])
    React.useEffect(()=> {
        axios.get('http://localhost:7000/api/genres' )
        .then((res)=> 
        {console.log(res.data)
          setGenres(res.data)

        })
        .catch((e)=> console.log(e))
        

    }, [])

    async function handleDelete(id)
    {
        console.log('Delete button')
        console.log(id)
        await axios.delete(`http://localhost:7000/api/genres/${id}`)
        .then((res)=> {
            if(res.data === 'success')
            {
                alert('Genre deleted successfully')
                
            }
            else
            {
                alert('Unsuccessful')
            }

        })
        .catch(e=>console.log(e))
    }
    const genreElements = genres.map((genre)=> {
        return (<tr key = {genre._id}>
        <td>{genre.name}</td>
    
        <td><button className= "btn btn-danger"onClick={(e)=>handleDelete(genre._id)}>Delete</button></td>

    </tr>)
    } )
    console.log(genreElements)


    
    return(
        <div className="container">
            <h1>All Genres</h1>
        <table className="table">
        <thead>
        <tr>
              <th>Name</th>
              <th>Delete</th>
              


        </tr>
        </thead>
        <tbody>
        {genreElements}
        </tbody>
    </table>
    </div>
    )


    


}
export{GenreIndex}