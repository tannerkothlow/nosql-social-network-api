const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const oneUser = await User.find({ _id: req.params.userId });
        res.json(oneUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        // Create new user with the structure of the sample data
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:userId', async (req, res) => {
    try {
        // Update a user based on req.params.id
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        // Delete a user based on req.params.userId
        // BONUS: Remove a user's associated thoughts when deleted
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        // Add req.params.friendId to req.params.userId's friend list
    } catch (err) {
        res.status(500).json(err);
    }
}); 

router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        // Removes req.params.friendId from req.params.userId's friend list
    } catch (err) {
        res.status(500).json(err);
    }
}); 


module.exports = router;