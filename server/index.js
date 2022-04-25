import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import postsRouter from './routes/posts.js'
import userRouter from './routes/user.js'

const app = express()

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors())
app.use('/posts', postsRouter)
app.use('/user', userRouter)

const CONNECTION_URL =
    'mongodb+srv://kobe:anhkp123@cluster0.hkknh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000

mongoose
    .connect(CONNECTION_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running port : ${PORT}`)
        })
    })
    .catch((err) => console.log(err))
