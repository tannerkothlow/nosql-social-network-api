const router = require('express').Router();
const { User, Thought } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:userId', async (req, res) => {
    try {
        const oneUser = await User.find({ _id: req.params.userId });
        res.status(200).json(oneUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', async (req, res) => {
    try {
        // Create new user with the structure of the sample data
        const newUser = await User.create({
            username: req.body.username,
            email: req.body.email
        });
        res.status(200).json(newUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:userId', async (req, res) => {
    try {
        // Update a user based on req.params.id
        const updateUser = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        );
        if (updateUser) {
            res.status(200).json(updateUser);
        } else {
            res.status(404).json({ message: `No user found with an ID of ${req.params.userId}` })
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:userId', async (req, res) => {
    try {
        // Delete a user based on req.params.userId
        const deleteUser = await User.findOneAndRemove(
            { _id: req.params.userId}
        );
        if (deleteUser) {
            const deleteUserPost = await Thought.deleteMany(
                { userId: req.params.userId }
            );
            res.status(200).json({ message: `User with ID of ${req.params.userId} deleted.`})
        } else {
            res.status(404).json({ message: `No user found with an ID of ${req.params.userId}`})
        }
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