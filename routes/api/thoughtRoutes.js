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
        const newReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: {
                reactionBody: req.body.reactionBody,
                username: req.body.username
            } } },
            { runValidators: true, new: true }
        );
        res.status(200).json(newReaction);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:thoughtId/reactions/:reactionId', async (req, res) => {
    try {
        const deleteReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId } } },
            { new: true }
        );
        if (deleteReaction) {
            res.status(200).json({ message: `Reaction ID ${req.params.reactionId} removed from Thought ID ${req.params.thoughtId}`})
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;