const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { userSeeds, thoughtSeeds } = require('./data');

connection.once('open', async () => {

    await User.deleteMany({});
    await Thought.deleteMany({});

    await User.collection.insertMany(userSeeds);

    await Thought.collection.insertMany(thoughtSeeds);

    console.log('Seeding Complete!')
    process.exit(0);
});