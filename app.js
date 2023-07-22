const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const port = process.env.PORT || 8080;

// midlleware 
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: ['http://localhost:3000', 'https://ko-app-eljoker22.vercel.app', 'https://ko-app.vercel.app', 'https://ko-panel.vercel.app']
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
