import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRouter from './router/auth.router.js';

dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
    res.send({message: 'Server is running'});
})

app.use('/api/auth', authRouter);

app.listen(PORT, () => {    
    console.log('Server is running at http://localhost:', PORT);
    connectDB();
})