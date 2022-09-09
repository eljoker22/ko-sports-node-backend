const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const port = process.env.PORT || 5000;

// midlleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: 'http://localhost:3000'
}))

app.use('/api/v1/auth', authRoutes);

app.get('/', (req, res) => { 
    res.send('ko back-end i do it') 
})

const start = async () => {
    try{
        await connectDB() 
        app.listen(port, console.log('app work'))
    } catch(errorr) {
        console.log(errorr)
    }
}

start()
