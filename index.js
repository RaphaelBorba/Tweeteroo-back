import express from 'express'
import cors from 'cors'
import createTweetWithAvatar from './createTweetWithAvatar.js'

const app = express()

app.use(cors())
app.use(express.json())

const users = []
const tweets = []


app.post('/sign-up',(req,res)=>{

    const {username,avatar}= req.body

    if(!username || !avatar){
        res.sendStatus(401);
        return
    }

    users.push(req.body)
    console.log(users)
    res.status(200).send(req.body)
})


app.get('/tweets', (req, res)=>{
    
    const last10Tweets = tweets.filter((a,i)=>i<10)
    const tweetsWithAvatar = last10Tweets.map( e => createTweetWithAvatar(e,users)) 
    
    res.status(200).send(tweetsWithAvatar)
})


app.post('/tweets', (req, res)=>{

    const {tweet} = req.body

    if(!tweet){
        res.sendStatus(400)
    }
    console.log(req.body)
    tweets.unshift(req.body)
    res.status(201).send('Criado')
})


app.listen(5000, ()=>console.log('Server on 5000:'))