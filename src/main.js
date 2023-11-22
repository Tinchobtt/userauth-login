import express from 'express';

const app = express();
const PORT = 3000;

//ROUTES
app.get('/', (req, res) => {
    res.send('hola')
})

const server = app.listen(PORT, ()=>{
    console.log(`Server running on PORT: ${PORT}\n${`http://localhost:${PORT}`}`);
})

//Middlewares
app.use(express.json())
app.use(express.urlencoded( {extended: true} ))