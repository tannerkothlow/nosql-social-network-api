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
        // Create a new thought based on the example data's format
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:thoughtId', async (req, res) => {
    try {
        // Update a thought by it's _id
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId', async (req, res) => {
    try {
        // Delete a thought by it's _id
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