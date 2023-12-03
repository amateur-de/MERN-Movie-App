const mongoose = require('mongoose')
const movieSchema = new mongoose.Schema(
    {
        name: {
            type: String ,
            required: [true , 'Movie must have a name']

        } ,
        rating: {
            type: Number ,
            required: true,
            min:0 ,
            max:5 ,
            default:0

        } ,
        genre: {
            type: mongoose.Schema.Types.ObjectId ,
            ref: 'Genre'

        }
    }
)

const Movie = mongoose.model('Movie' , movieSchema)
module.exports = Movie