import mongoose from "mongoose";


const movieSchema = mongoose.Schema({
    title: {
        type: String,
        require: true,
        },
    genre: {
        type: String,
        require: true,
    },
    releaseYear: {
        type: String,
        require: true
    },
    status: {
        type: String,
        default: ""
    }
},{
    timestamp: true
});

const Movie = mongoose.model('Movie', movieSchema);

export default Movie;