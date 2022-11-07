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
        res.status(401).send('Todos os campos são obrigatórios.');
        return
    }
    users.push(req.body)

    res.status(201).send(req.body)
})



app.post('/tweets', (req, res)=>{

    const {tweet} = req.body
    const user = req.headers.user
    const tweetFinal = {tweet, username:user}

    if(!tweet){
        res.status(401).send('Todos os campos são obrigatórios.');
    }

    tweets.unshift(tweetFinal)
    res.status(201).send('Criado')
})

app.get('/tweets', (req, res)=>{
    
    const last10Tweets = tweets.filter((a,i)=>i<10)
    const tweetsWithAvatar = last10Tweets.map( e => createTweetWithAvatar(e,users)) 
    
    res.status(200).send(tweetsWithAvatar)
})

app.get('/tweets/:username', (req, res)=>{

    const user = req.params.username 
    
    const arraysUserTweets = tweets.filter(e => e.username.toLowerCase() === user.toLowerCase())

    const arraysUserTweetsWithUrl = arraysUserTweets.map( e => createTweetWithAvatar(e,users))

    res.status(200).send(arraysUserTweetsWithUrl)
})


app.listen(5000, ()=>console.log('Server on 5000:'))