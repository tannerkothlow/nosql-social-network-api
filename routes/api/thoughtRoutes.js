const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allThoughts = await Thought.find();
        res.json(allThoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:thoughtId', async (req, res) => {
    try {
        const oneThoughts =  await Thought.find({ _id: req.params.thoughtId });
        res.json(oneThoughts);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create({
            thoughtText: req.body.thoughtText,
            username: req.body.username,
            userId: req.body.userId
        });

        const addThoughtToUser = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: newThought._id }},
            { runValidators: true, new: true }
        );

        res.status(200).json(newThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        const updateThought = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        res.status(200).json(updateThought);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId', async (req, res) => {
    try {
        const deleteThought = await Thought.findOneAndRemove(
            { _id: req.params.thoughtId }
        );
        res.status(200).json({ message: `Thought ID ${req.params.thoughtId} deleted.`})
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:thoughtId/reactions', async (req, res) => {
    try {
        // Create a reaction stored in a thought's reaction array
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        // Remove a reaction from a thought's reaction array based on reactionId
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;