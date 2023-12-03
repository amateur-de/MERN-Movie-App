const express = require('express')
const user = require('./mongo')
const genre = require('./models/genre')
const movie = require('./models/movie')
const cors = require('cors')
const Movie = require('./models/movie')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/' , cors() , (req,res)=>{

})
app.post('/api/users/login' , async (req , res)=>{
    console.log(req.body)
    const email = req.body.email
    const password = req.body.password
    try{
        const check = await user.findOne({email:email})
        if(check)
        {
            res.json('exist')
        }
        else
        {
            res.json('does not exist')
        }

    }
    catch(e){
        console.log(e)

    }
})

app.post('/api/users/signup' , async (req , res)=>{
    const {email , password} = req.body
    console.log(email)
    console.log(password)
    const data = {
        email:email ,
        password: password
    }
    try{
        const check = await user.findOne({email:email})
        if(check)
        {
            res.json('exists')
        }
        else
        {
            await user.insertMany([data])
            .then(data=>res.json('does not exist'))
        }

    }
    catch(e){
        console.log(e)

    }
})

app.post('/api/genres/addgenre' , async(req , res)=> {
    console.log(req.body)
    const name = req.body.newGenre
    try{
        const check = await genre.findOne({name:name})
        if(check)
        {
            res.json('exists')
        }
        else
        {
            await genre.create({name : name})
            .then(data=> res.json('created'))
            .catch(e=>console.log(e))
            
        }

    }
    catch(e){
        console.log(e)

    }
})

app.get('/api/genres' , async (req , res)=> {
    //res.send('Request reached')
    const genres = await genre.find()
    res.json(genres)
})

app.delete('/api/genres/:id' , async(req , res)=> {
    const {id} = req.params
    try{
    const result = await genre.findByIdAndDelete(id)
   
    if(result)
    {
        res.json('success')
    }
    else
    {
        res.json('not exist')
    }
}
catch(e){
    console.log(e)
}
})



app.post('/api/movies/addmovie' , async(req , res)=> {
    console.log(req.body)
    
    const name = req.body.name
    const moviegenre = req.body.genre
    const  rating = parseInt(req.body.rating)
    console.log(rating)
    
    try{
        const check = await movie.findOne({name:name})
        const genreCheck =  await genre.findOne({name:moviegenre})
        if(check)
        {
            res.json('movie exists')
        }
        else if(!genreCheck)
        {
            res.json('genre does not exist')
        }
        else
        {
           const newMovie = new movie({name , rating})
           genreCheck.movies.push(newMovie)
           newMovie.genre = genreCheck
           await genreCheck.save()
           await newMovie.save()
           res.json('created')
            
        }

    }
    catch(e){
        console.log(e)

    }
    
})
app.get('/api/movies' , async (req , res)=> {
    //res.send('Request reached')
    const movies = await movie.find().populate('genre' , 'name')
    res.json(movies)
})

app.delete('/api/movies/:id' , async(req , res)=> {
    const {id} = req.params
    try{
    const tempMovie = await movie.findById(id).populate('genre')
    const genreName = await genre.findOneAndUpdate({name: tempMovie.genre.name}, 
       {$pullAll : {movies:[id]}} , {new:true} )
    /*console.log(tempMovie)
    console.log(genreName)
    const test = genreName.movies[0] 
    console.log(typeof(test))*/

    
    const result = await movie.findByIdAndDelete(id)
   
    if(result)
    {
        res.json('success')
    }
    else
    {
        res.json('not exist')
    }
    
}
catch(e){
    console.log(e)
}
})




app.listen(7000 , ()=> {
    console.log('listening on port 7000')
})