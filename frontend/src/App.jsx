import React from 'react'
import {BrowserRouter ,  Routes , Route} from 'react-router-dom'
import { Home } from './components/Home'
import { Login } from './components/Login'
import { Signup } from './components/Signup'
import { Addgenre } from './components/Addgenre'
import { GenreIndex } from './components/GenreIndex'
import { AddMovie } from './components/AddMovie'
import { MovieIndex } from './components/MovieIndex'


//import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path = '/' element = {<Login/>}/>
           <Route path = '/home' element = {<Home/>}/>
           <Route path = '/signup' element = {<Signup/>}/>
           <Route path = '/genre/new' element = {<Addgenre/>}/>
           <Route path = '/genres' element = {<GenreIndex/>}/>
           <Route path = '/movie/new' element = {<AddMovie/>}/>
           <Route path = '/movies' element = {<MovieIndex/>}/>


        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
