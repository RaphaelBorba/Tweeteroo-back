

export default function createTweetWithAvatar(tweet, users){

    const avatar = users.find(e => e.username === tweet.username)
    return {...tweet, avatar:avatar.avatar}
}