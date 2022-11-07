export default function createTweetWithAvatar(tweet, users){

    const infos = users.find(e => e.username === tweet.username)
    return {...tweet, avatar:infos.avatar}
}