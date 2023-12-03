import React from "react";
import { useLocation , useNavigate , Link } from "react-router-dom";
function Home()
{
    const location = useLocation()

    return( 
        <div className="container">
        <h1>Home Page</h1>
        <h6>Hello {location.state.id ? location.state.id : ''} and Welcome to Home</h6>
        <div className="container">
        <Link to = "/genre/new"><button className="btn btn-success">Add New Genre</button></Link>
        </div>
        <div className="container mt-3">
        <Link to = "/genres"><button className="btn btn-primary">View All Genres</button></Link>
        </div>
        <div className="container mt-3">
        <Link to = "/movie/new"><button className="btn btn-info">Add New Movie</button></Link>
        </div>
        <div className="container mt-3">
        <Link to = "/movies"><button className="btn btn-secondary">View All Movies</button></Link>
        </div>
          
        </div>
    )
}

export {Home}