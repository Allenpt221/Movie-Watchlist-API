import mongoose from 'mongoose';
import movies from '../model/movie.model.js';

export const AddMovie = async (req, res) => {
    const {title, genre, releaseYear, status} = req.body;
    
    try {
        if(!title || !genre || !releaseYear){
            return res.status(400).json({success: false, message: 'All fields are required'});
        }

        const existMovie = await movies.findOne({title});

        if(existMovie){
            return res.status(400).json({sucess: false, message: 'movies already in data'});
        }
        

        const newMovies = new movies({title, genre, releaseYear, status});

        await newMovies.save();

        return res.status(200).json({sucess: true, message: 'movie create succesfully'});
    } catch (error) {
        console.log("Error in Add Movie Controller", error.message);
        return res.status(500).json({success: false, message: 'Error Server'});
    }
};

export const showAllMovies = async (req, res) => {
    try {
        
        const data = await movies.find({});
        if(data.length === 0){
            return res.status(404).json({sucess: false, message: 'data store in database'});
        }

        return res.status(200).json({success: true, data : data, count: data.length});
    } catch (error) {
        console.log("Error in Show All Movie Controller", error.message);
        return res.status(500).json({success: false, message: 'Error Server'});
    }
};

export const DeleteMovie = async (req, res) => {
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: 'Id is not found'});
    }
    try {
        await movies.findByIdAndDelete(id);

        return res.status(200).json({success: true, message: 'successfully delete the movie'});
    } catch (error) {
        console.log("Error in Delete movie Controller", error.message);
        return res.status(500).json({success: false, message: 'Error Server'});
    }
};

export const updateMovie = async (req, res) => {
    const { id } = req.params;
    const {title, genre, releaseYear, status} = req.body;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({success: false, message: 'Id is not found'});
    }
    try {
        const findMovies = await movies.findById(id);
        if(!findMovies){
             return res.status(404).json({ success: false, message: 'Expense not found' });
        }


        const updatedMovie = await movies.findByIdAndUpdate(id, {title, genre, releaseYear, status}, {new: true});
        return res.status(200).json({success: true, data: updatedMovie});
        
    } catch (error) {
        console.log("Error in Update movie Controller", error.message);
        return res.status(500).json({success: false, message: 'Error Server'});
    }
};