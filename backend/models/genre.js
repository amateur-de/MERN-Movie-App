const mongoose = require('mongoose')
const Movie = require('./movie')
const genreSchema = new mongoose.Schema(
    {
        name: {
            type: String ,
            required: [true , 'Genre must have a name']
        }
          ,

        movies: [
            {
                type: mongoose.Schema.Types.ObjectId ,
                ref: 'Movie'

            }
        ]
    }
)
genreSchema.pre('findOneAndDelete' , async function() {
    console.log('PRE MIDDLEWARE')
})

genreSchema.post('findOneAndDelete' , async function(genre) {
    console.log('POST MIDDLEWARE')
    const res = await Movie.deleteMany({_id: {$in: genre.movies}})
    console.log(res)
})

const Genre =  mongoose.model('Genre' , genreSchema)
module.exports = Genre
