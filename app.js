require('dotenv').config();


const Snoowrap = require('snoowrap');
const Snoostorm = require('snoostorm');

// Build Snoowrap and Snoostorm clients
const r = new Snoowrap({
    userAgent: 'reddit-bot-example-node',
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    username: process.env.REDDIT_USER,
    password: process.env.REDDIT_PASS
});

const client = new Snoostorm(r);

// Configure options for stream: subreddit & results per query
const streamOpts = {
    subreddit: 'testingground4bots',
    results: 5
};


// Create a Snoostorm CommentStream with the specified options
const comments = client.CommentStream(streamOpts); // eslint-disable-line

const INTRO_TEXT = 'Bleep Bloop - I am the **Luminaut Helper Bot** \n\n';
const CLOSING_TEXT = '\n\n**Join the [Lumenaut Community Pool](https://lumenaut.net/).**  \n\n';

const COMMON_QUESTIONS = '' +
    '\n\n Here are some answers to common questions I have heard recently: \n\n' +
    '\n\n * Do I need to rejoin the pool if I buy more Lumens? NO. You do not need to rejoin, once you join, you are in! ' +
    '* I was told never to give out my secret key, why do I need it? To sign any Stellar transaction, you need your secret key, you only need to do this once on the Stellar website. ' +
    '* How many free Lumens will I get a week? The amount of Lumens you get per week is determined by how many votes (or Lumens) you currently hold in your account. The more you have the more free Lumens you will receive.\n\n';

// On comment, perform whatever logic you want to do
comments.on('comment', (comment) => {
    console.log(comment);
    if (comment.body === 'What is an inflation pool?') {
        comment.reply(INTRO_TEXT + COMMON_QUESTIONS + 'Inflation is a nominal mechanism which distributes new Lumens, on a weekly basis and at a rate of 1% per year to the holders. The inflation is distributed using a voting system, if your address does not have the minimum requirements of 0.05% of the votes, then you can still achieve it by joining a pool. The pool is where the community can gather together and vote all their Lumens to reach the minimum requirement, so Stellar Development Foundation pays the inflation. Basically, it means that if you\'re a holder then you receive free Lumens.' + CLOSING_TEXT);
    } else if (comment.body === 'How do I set my inflation destination?') {
        comment.reply(':)');
    }
});

