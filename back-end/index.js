import express, { request, response } from 'express';
import mongoose from 'mongoose';
import { User } from './models/usermodel.js';
import userRoutes from './routes/userroutes.js';
import { Question } from './models/questionModel.js';
import questionRoutes from './routes/questionsroutes.js';
import cors from 'cors';

const app = express();
import { PORT , MONGODBURL} from './config.js';

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['content-type']
}));
app.use('/users', userRoutes);
app.use('/questions', questionRoutes);

app.get('/', (request,response) =>{
   console.log(request); 
});

//middleware for handling CORS POLICY


mongoose.connect(MONGODBURL)
.then(() =>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });
})
.catch((err) =>{
 console.log('is not Connected to MongoDB',err.message);
})