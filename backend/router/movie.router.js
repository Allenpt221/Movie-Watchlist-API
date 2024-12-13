import express from 'express';
import { AddMovie, DeleteMovie, showAllMovies, updateMovie } from '../controller/movie.controller.js';

const router = express.Router();

router.post("/", AddMovie);
router.get("/", showAllMovies);
router.delete("/:id", DeleteMovie);
router.put("/:id", updateMovie);


export default router;